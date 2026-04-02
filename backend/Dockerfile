FROM node:20-alpine

#Khai báo môi trường là Production
ENV NODE_ENV=production

RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./

#cài đặt các thư viện cần thiết để chạy (Bỏ qua nodemon)
RUN npm install --omit=dev

#Copy toàn bộ source code vào trong Image
#Ở môi trường Prod đóng gói code chết vào image
COPY . .

#Bảo mật , không chạy quyền Root
#Alpine Node image có sẵn 1 user tên là 'node' với quyền hạn thấp.
USER node

#Mở cổng giao tiếp
EXPOSE 3000

#Chạy thẳng bằng node
CMD ["node", "server.js"]