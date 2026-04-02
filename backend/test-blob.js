// Nạp biến môi trường từ file .env vào process.env
require('dotenv').config(); 

// Import service upload đã viết
const { uploadToBlob } = require('./services/storage.service');

async function runTest() {
    console.log(" Bắt đầu test kết nối đến Azure Blob Storage...");

    // Tạo một nội dung file giả lập thay vì phải đọc file thật từ ổ cứng
    const fileContent = "Đây là file test được tạo từ máy cá nhân lúc " + new Date().toLocaleString();
    
    // Chuyển string thành Buffer (định dạng hàm upload yêu cầu)
    const fileBuffer = Buffer.from(fileContent, 'utf8');
    
    // Đặt tên file ngẫu nhiên để không bị trùng lặp khi test nhiều lần
    const fileName = `test-file-${Date.now()}.txt`;
    const mimeType = 'text/plain';

    console.log(`Đang chuẩn bị upload file: ${fileName}`);

    // Thực thi hàm upload
    const result = await uploadToBlob(fileName, fileBuffer, mimeType);

    // In kết quả
    if (result.success) {
        console.log("\nUPLOAD THÀNH CÔNG!");
        console.log("URL của file (Private):", result.url);
        console.log("Hãy lên Azure Portal -> Storage Account -> Container 'uploads' để kiểm tra!");
    } else {
        console.log("\n UPLOAD THẤT BẠI:");
        console.error("Lỗi chi tiết:", result.error);
        console.log("Hãy kiểm tra lại BLOB_CONNECTION_STRING trong file .env xem đã copy chính xác chưa.");
    }
}

// Khởi chạy test
runTest();