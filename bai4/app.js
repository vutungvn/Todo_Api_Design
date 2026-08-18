import express from "express";
import users from "./data/users.js";
import orders from "./data/orders.js";

const app = express();

// Middleware parse JSON + Middleware xử lý khi Client gửi JSON sai cú pháp
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      code: "INVALID_JSON",
      message: "Malformed JSON payload provided.",
    });
  }
  next();
});

// Endpoint GET /api/v1/users/:userId/orders
app.get("/api/v1/users/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { status, limit } = req.query;

  // 1. Kiểm tra user tồn tại
  const userExists = users.some((u) => u.id === userId);
  if (!userExists) {
    return res.status(404).json({
      success: false,
      code: "USER_NOT_FOUND",
      message: `User with ID ${userId} not found`,
    });
  }

  // 2. Kiểm tra biên: limit không hợp lệ (limit <= 0)
  if (
    limit !== undefined &&
    (isNaN(parseInt(limit, 10)) || parseInt(limit, 10) <= 0)
  ) {
    return res.status(400).json({
      success: false,
      code: "INVALID_LIMIT",
      message: "Limit must be a positive integer.",
    });
  }

  let userOrders = orders.filter((o) => o.userId === userId);

  // 3. Lọc theo status (nếu có)
  if (status) {
    userOrders = userOrders.filter((o) => o.status === status);
  }

  // 4. Áp dụng limit (Mặc định là 5, nếu vượt quá số lượng sẽ slice hết mảng)
  const limitNumber = limit ? parseInt(limit, 10) : 5;
  const resultData = userOrders.slice(0, limitNumber);

  return res.status(200).json({
    success: true,
    data: resultData,
    meta: {
      total: resultData.length,
    },
  });
});

// Endpoint POST /api/v1/users/:userId/orders (Test trường hợp Body rỗng)
app.post("/api/v1/users/:userId/orders", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      code: "EMPTY_BODY",
      message: "Request body cannot be empty.",
    });
  }

  return res.status(201).json({
    success: true,
    data: req.body,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
