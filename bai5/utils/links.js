// utils/links.js

/**
 * Hàm sinh các liên kết HATEOAS cho tài nguyên Order
 * @param {Object} order - Đối tượng đơn hàng (chứa id, userId, status)
 * @returns {Object} Khối _links
 */
export const generateOrderLinks = (order) => {
  const { id, userId, status } = order;

  // Khối link cơ bản luôn có (Mặc định status = cancel)
  const links = {
    self: {
      href: `/api/v2/orders/${id}`,
      method: "GET",
    },
    customer: {
      href: `/api/v2/users/${userId}`,
      method: "GET",
    },
  };

  // Điều kiện thay đổi liên kết theo trạng thái (status = pending)
  if (status === "pending") {
    links.cancel = {
      href: `/api/v2/orders/${id}/cancellation`,
      method: "POST",
    };
  }

  return links;
};
