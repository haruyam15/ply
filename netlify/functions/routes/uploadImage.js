const express = require('express');
const multer = require('multer');
const { S3 } = require('aws-sdk');
const path = require('path');
const util = require('util');

// AWS S3 설정
const s3 = new S3({
  region: 'your-region', // 예: 'us-east-1'
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: 'Asia Pacific (Seoul) ap-northeast-2',
});

// Multer 메모리 저장소 설정
const storage = multer.memoryStorage();
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

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '이미지 파일이 없습니다.' });
  }

  try {
    const params = {
      Bucket: 'ply-img', // S3 버킷 이름
      Key: `${Date.now()}-${req.file.originalname}`, // 파일 키
      Body: req.file.buffer, // 파일 데이터
      ContentType: req.file.mimetype, // 파일 타입
    };

    const data = await s3.upload(params).promise();
    const imageUrl = data.Location;

    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error('파일 업로드 중 오류 발생:', err);
    res.status(500).json({ message: '파일 업로드 중 오류가 발생했습니다.', error: err.message });
  }
});

module.exports = router;
