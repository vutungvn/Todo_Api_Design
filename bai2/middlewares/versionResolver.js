export const versionResolver = (req, res, next) => {
  // Lấy giá trị header Api-Version (chữ thường do Express tự normalize headers)
  const apiVersion = req.headers["api-version"];

  // Nếu không truyền -> mặc định 'v1'
  req.apiVersion = apiVersion || "v1";
  next();
};
