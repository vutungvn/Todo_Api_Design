# Bài Thực Hành: Kiểm Thử API Bằng Postman Collection (ESM Standard)

Dự án thực hiện xây dựng **Nested Resource API (User Orders)** kết hợp với **Postman Collection** và **Test Scripts** để tự động kiểm thử API.

---

## 🛠️ Cài Đặt Và Chạy Server

### 1. Cài đặt dependencies

Sau khi clone hoặc tải project về, mở terminal tại thư mục project và chạy:

```bash
npm install
```

### 2. Khởi chạy server

Chạy lệnh:

```bash
node app.js
```

Server mặc định sẽ chạy tại:

```text
http://localhost:3000
```

Có thể kiểm tra server bằng cách truy cập:

```text
http://localhost:3000
```

---

### Chạy Test Suite Trên Postman

### 1. Import Postman Collection

Mở **Postman** và import hai file trong thư mục `/postman`:

```text
postman/
├── Nested Resource API Tests.postman_collection.json
└── Express-Env.postman_environment.json
```

Trong Postman:

**Import → Files → chọn các file JSON**

---

### 2. Chọn Environment

Sau khi import, chọn environment:

```text
Express-Env
```

Environment này chứa biến:

| Variable   | Value                   |
| ---------- | ----------------------- |
| `base_url` | `http://localhost:3000` |

Biến `base_url` được sử dụng trong các request của Collection.

Ví dụ:

```text
{{base_url}}/api/v1/users/2/orders
```

Khi chạy, Postman sẽ thay:

```text
{{base_url}}
```

bằng:

```text
http://localhost:3000
```

---

### 3. Chạy Collection

Trong Postman:

1. Chọn Collection **Nested Resource API Tests**.
2. Nhấn chuột phải vào Collection.
3. Chọn **Run collection**.
4. Kiểm tra danh sách các request.
5. Nhấn **Run** để bắt đầu chạy toàn bộ test.

Collection bao gồm **5 request** và các request đều có Test Scripts để kiểm tra kết quả trả về.

---

## 🧪 Test Cases

Collection thực hiện kiểm thử các trường hợp sau:

| STT | Request Name                      | Method | Path                                         | Expected Status |  Result  |
| --: | --------------------------------- | :----: | -------------------------------------------- | :-------------: | :------: |
|   1 | Get User 2 Orders (Default)       | `GET`  | `/api/v1/users/2/orders`                     |    `200 OK`     | **PASS** |
|   2 | Get User 2 Orders (Filtered)      | `GET`  | `/api/v1/users/2/orders?status=paid&limit=3` |    `200 OK`     | **PASS** |
|   3 | Get User 1 Orders                 | `GET`  | `/api/v1/users/1/orders`                     |    `200 OK`     | **PASS** |
|   4 | Get User 2 Pending Orders         | `GET`  | `/api/v1/users/2/orders?status=pending`      |    `200 OK`     | **PASS** |
|   5 | Get Non-existing User (Error 404) | `GET`  | `/api/v1/users/999/orders`                   | `404 Not Found` | **PASS** |

---
