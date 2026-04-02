require('dotenv').config();

const express = require('express');
const multer = require('multer');
const { uploadToBlob } = require('./services/storage.service');

const app = express();

//Cấu hình multer để xử lý file upload
const upload = multer({ 
    // Dùng RAM để lưu file tạm, không ghi ra ổ cứng của Pod
    storage: multer.memoryStorage(),
    // Giới hạn kích thước file (5mb) để tránh bị spam làm tràn RAM (OOM)
    limits: { fileSize: 5 * 1024 * 1024 } 
});

// Tạo api endpoint
// Chữ 'document' ở đây là tên của cái field mà Frontend/Postman sẽ gửi lên
app.post('/api/upload', upload.single('document'), async (req, res) => {
    try {
        // Kiểm tra xem request có file đính kèm không
        if (!req.file) {
            return res.status(400).json({ error: "Vui lòng đính kèm file" });
        }

        console.log("Đã nhận file vào RAM:", req.file.originalname, `(${req.file.size} bytes)`);

        // Gọi service để đẩy file từ RAM (req.file.buffer) lên Azure Blob
        const result = await uploadToBlob(
            req.file.originalname, 
            req.file.buffer, 
            req.file.mimetype
        );

        // Trả kết quả về cho Client
        if (result.success) {
            res.status(200).json({ 
                success: true,
                message: "Upload lên Cloud thành công!", 
                fileName: req.file.originalname,
                fileUrl: result.url 
            });
        } else {
            // Nếu hàm uploadToBlob báo lỗi
            res.status(500).json({ 
                success: false,
                error: "Lỗi khi lưu file lên Cloud", 
                details: result.error 
            });
        }
    } catch (error) {
        // Bắt các lỗi không lường trước được (ví dụ lỗi mạng, lỗi multer...)
        console.error("Lỗi Server Exception:", error);
        res.status(500).json({ success: false, error: "Lỗi Server Internal", details: error.message });
    }
});

const port = 3000;

// // Giả sử dùng multer để nhận file từ client
// app.post('/upload', async (req, res) => {
//     // req.file là file được gửi lên từ form
//     const result = await uploadToBlob(
//         req.file.originalname, 
//         req.file.buffer, 
//         req.file.mimetype
//     );

//     if (result.success) {
//         res.status(200).json({ message: "Xong!", url: result.url });
//     } else {
//         res.status(500).json({ error: "Thất bại" });
//     }
// });

app.get('/', (req, res) => {
  res.send('Hello từ AKS, đang test Trivy!');
});

app.listen(port, () => {
  console.log(`Backend Server listening on port ${port}`);
});



// Ép Action chạy lần cuối để test trivy
// Thêm comment để test sonarcloud lần nữa
// Thêm comment để test sonarcloud voi fix project key
// Thêm comment để test harbor - fix syntax name cua harbor username
// Thêm comment để test acr thay harbor
// Thêm comment để test keyvault với sonarcloud token
// Thêm comment để test ci/cd với việc gắn tag image bằng short SHA của commit
// Thêm comment để test ci/cd với việc gắn tag image bằng short SHA của commit-fix loi lo hong high trong trivy