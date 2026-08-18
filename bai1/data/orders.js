const orders = [
  { id: 1, userId: 1, status: "paid", total: 150000 },
  { id: 2, userId: 1, status: "pending", total: 200000 },
  { id: 3, userId: 2, status: "paid", total: 500000 },
  { id: 4, userId: 2, status: "paid", total: 120000 },
  { id: 5, userId: 2, status: "paid", total: 350000 },
  { id: 6, userId: 2, status: "pending", total: 90000 },
  { id: 7, userId: 2, status: "cancelled", total: 450000 },
  { id: 8, userId: 3, status: "pending", total: 300000 },
  { id: 9, userId: 3, status: "cancelled", total: 180000 },
  { id: 10, userId: 3, status: "paid", total: 600000 },
];

export default orders;
