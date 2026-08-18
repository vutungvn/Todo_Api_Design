// index.js
import express from "express";
import { generateOrderLinks } from "./utils/links.js";
import orders from "./data/order.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Route GET /api/v2/orders/:id
app.get("/api/v2/orders/:id", (req, res) => {
  // Lấy id của order trên params
  const orderId = parseInt(req.params.id, 10);

  //   Lấy order thông qua orderId
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Nhúng khối _links vào response
  const responseData = {
    ...order,
    _links: generateOrderLinks(order),
  };

  return res.status(200).json(responseData);
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
