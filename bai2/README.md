# Bài thực hành: Header Versioning và Deprecation

## Hướng dẫn chạy ứng dụng

1. Cài đặt dependencies: `npm install`
2. Khởi chạy server: `node app.js`

---

## Kết quả Test API

### Test Case 1: Header `Api-Version: v1` (hoặc không truyền Header)

- **Request Header:** `Api-Version: v1`
- **URL:** `GET http://localhost:3000/api/books`
- **HTTP Status:** `200 OK`
- **Response Headers:**
  ```http
  Deprecation: true
  Sunset: Wed, 31 Dec 2025 23:59:59 GMT
  Content-Type: application/json; charset=utf-8
  ```
- **Response Body:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin"
    },
    {
      "id": 2,
      "title": "Refactoring",
      "author": "Martin Fowler"
    }
  ]
}
```

### Test Case 2: Header `Api-Version: v2`

- **Request Header:** `Api-Version: v2`
- **URL:** `GET http://localhost:3000/api/books`
- **HTTP Status:** `200 OK`
- **Response Body:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": {
        "id": 101,
        "name": "Robert C. Martin"
      },
      "publishedYear": 2008
    },
    {
      "id": 2,
      "title": "Refactoring",
      "author": {
        "id": 102,
        "name": "Martin Fowler"
      },
      "publishedYear": 1999
    }
  ]
}
```

### Test Case 3: Header không hợp lệ `Api-Version: v9`

- **Request Header:** `Api-Version: v9`
- **URL:** `GET http://localhost:3000/api/books`
- **HTTP Status:** `400 Bad Request`
- **Response Body:**

```json
{
  "success": false,
  "code": "UNSUPPORTED_API_VERSION",
  "message": "API version 'v9' is not supported."
}
```
