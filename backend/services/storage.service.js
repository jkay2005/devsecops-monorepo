const { BlobServiceClient } = require('@azure/storage-blob');

// Khởi tạo Client từ biến môi trường
// Biến này sẽ được lấy từ Key Vault thông qua K8s Deployment sau này
const connectionString = process.env.BLOB_CONNECTION_STRING;

if (!connectionString) {
    console.warn("Cảnh báo: BLOB_CONNECTION_STRING chưa được cấu hình!");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerName = "uploads"; // Tên container bạn đã tạo trên Portal

/**
 * Hàm upload file lên Azure Blob Storage
 * @param {string} fileName - Tên file muốn lưu trên Cloud
 * @param {Buffer} fileBuffer - Nội dung file dưới dạng Buffer
 * @param {string} mimeType - Loại file (image/png, application/pdf...)
 */
const uploadToBlob = async (fileName, fileBuffer, mimeType) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        const options = { blobHTTPHeaders: { blobContentType: mimeType } };
        
        console.log(`>>> Đang tải file lên Azure: ${fileName}`);
        const uploadResponse = await blockBlobClient.upload(fileBuffer, fileBuffer.length, options);
        
        return {
            success: true,
            requestId: uploadResponse.requestId,
            url: blockBlobClient.url // Trả về link trực tiếp của file
        };
    } catch (error) {
        console.error("Lỗi khi upload lên Azure Blob:", error.message);
        return { success: false, error: error.message };
    }
};

module.exports = {
    uploadToBlob
};