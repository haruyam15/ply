import express from 'express';
import multer from 'multer';
import path from 'path';
import AWS from 'aws-sdk';

const router = express.Router();

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // AWS 리전 설정
});

// Multer 설정 (메모리 스토리지)
const storage = multer.memoryStorage(); // 파일을 메모리에서 처리

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
  },
});

// 이미지 업로드 및 MongoDB에 profileImage URL 업데이트 라우트
router.post('/:userId', (req, res) => {
  upload.single('image')(req, res, async (err) => {
    const { userId } = req.params;
    const database = req.database; // MongoDB 클라이언트의 데이터베이스 객체

    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: '파일 업로드 중 오류가 발생했습니다.', error: err.message });
    } else if (err) {
      return res.status(500).json({ message: '서버 오류가 발생했습니다.', error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: '이미지 파일이 없습니다.' });
    }

    // S3에 업로드할 파일 생성
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = `profile-images/${userId}-${uniqueSuffix}${path.extname(req.file.originalname)}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // S3 버킷 이름
      Key: fileName, // S3에 저장될 파일 경로
      Body: req.file.buffer, // 메모리 내에 저장된 파일 버퍼
      ContentType: req.file.mimetype, // 파일 MIME 타입
      ACL: 'public-read', // 파일을 공개하려면 이 옵션 추가
    };

    try {
      // S3에 파일 업로드
      const data = await s3.upload(params).promise();
      const imageUrl = data.Location; // 업로드된 파일의 S3 URL

      // MongoDB의 'users' 컬렉션에서 해당 사용자의 profileImage 필드 업데이트
      const updateResult = await database
        .collection('users')
        .updateOne({ userId: userId }, { $set: { profileImage: imageUrl } });

      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ success: false, message: '사용자 정보를 찾을 수 없습니다.' });
      }

      res
        .status(200)
        .json({
          success: true,
          message: '프로필 이미지가 성공적으로 업데이트되었습니다.',
          imageUrl,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: 'S3 또는 MongoDB와의 통신 중 오류가 발생했습니다.',
          error: error.message,
        });
    }
  });
});

export default router;
