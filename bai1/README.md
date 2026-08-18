# Bài thực hành: Nested Resource và Query String (ESM Standard)

## Hướng dẫn chạy ứng dụng

1. Cài đặt dependencies: `npm install`
2. Khởi chạy server: `node app.js`

---

## Kết quả Test API

### Test Case 1: Đủ tham số (`GET /api/v1/users/2/orders?status=paid&limit=3`)

- **URL:** `http://localhost:3000/api/v1/users/2/orders?status=paid&limit=3`
- **HTTP Status:** `200 OK`
- **Response Body:**

```json
{
  "success": true,
  "data": [
    { "id": 3, "userId": 2, "status": "paid", "total": 500000 },
    { "id": 4, "userId": 2, "status": "paid", "total": 120000 },
    { "id": 5, "userId": 2, "status": "paid", "total": 350000 }
  ],
  "meta": {
    "total": 3
  }
}
```

### Test Case 2: Không truyền query parameter (`GET /api/v1/users/2/orders`)

- **URL:** `http://localhost:3000/api/v1/users/2/orders`
- **HTTP Status:** `200 OK`
- **Response Body:**

```json
{
  "success": true,
  "data": [
    { "id": 3, "userId": 2, "status": "paid", "total": 500000 },
    { "id": 4, "userId": 2, "status": "paid", "total": 120000 },
    { "id": 5, "userId": 2, "status": "paid", "total": 350000 },
    { "id": 6, "userId": 2, "status": "pending", "total": 90000 },
    { "id": 7, "userId": 2, "status": "cancelled", "total": 450000 }
  ],
  "meta": {
    "total": 5
  }
}
```

### Test Case 3: UserId không tồn tại (`GET /api/v1/users/999/orders`)

- **URL:** `http://localhost:3000/api/v1/users/999/orders`
- **HTTP Status:** `404 Not Found`
- **Response Body:**

```json
{
  "success": false,
  "code": "USER_NOT_FOUND",
  "message": "User with ID 999 not found"
}
```
