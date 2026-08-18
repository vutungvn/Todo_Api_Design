import express from "express";
import users from "./data/users.js";
import orders from "./data/orders.js";

const app = express();
app.use(express.json());

app.get("/api/v1/users/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { status, limit } = req.query;

  // 1. Kiểm tra user có tồn tại hay không
  const userExists = users.some((u) => u.id === userId);
  if (!userExists) {
    return res.status(404).json({
      success: false,
      code: "USER_NOT_FOUND",
      message: `User with ID ${userId} not found`,
    });
  }

  // 2. Lọc danh sách đơn hàng theo userId
  let userOrders = orders.filter((o) => o.userId === userId);

  // 3. Lọc theo Query Parameter `status` (nếu có truyền)
  if (status) {
    userOrders = userOrders.filter((o) => o.status === status);
  }

  // 4. Áp dụng `limit` (Mặc định là 5)
  const limitNumber = limit ? parseInt(limit, 10) : 5;
  const resultData = userOrders.slice(0, limitNumber);

  // 5. Trả về Response theo đúng format yêu cầu
  return res.status(200).json({
    success: true,
    data: resultData,
    meta: {
      total: resultData.length,
    },
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
