import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// uploads 폴더가 없으면 생성
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // 사용 중인 리전으로 변경
});

// Multer 설정
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

router.post('/', (req, res) => {
  upload.single('image')(req, res, (err) => {
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
    const fileName = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // S3 버킷 이름
      Key: `uploads/${fileName}`, // S3에 저장될 파일 경로
      Body: req.file.buffer, // 메모리 내에 저장된 파일 버퍼
      ContentType: req.file.mimetype, // 파일 MIME 타입
      ACL: 'public-read', // 파일을 공개하려면 이 옵션 추가
    };

    // S3에 파일 업로드
    s3.upload(params, (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'S3에 파일 업로드 중 오류가 발생했습니다.', error: err.message });
      }

      const imageUrl = data.Location; // 업로드된 파일의 S3 URL
      res.status(200).json({ imageUrl });
    });
  });
});

export default router;
