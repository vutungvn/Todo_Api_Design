import express from "express";
import books from "./data/books.js";
import { versionResolver } from "./middlewares/versionResolver.js";
import { formatBook } from "./formatters/bookFormatter.js";

const app = express();
app.use(express.json());

// Áp dụng middleware giải quyết API Version
app.use(versionResolver);

app.get("/api/books", (req, res) => {
  const version = req.apiVersion;

  // 1. Kiểm tra Version có được hỗ trợ hay không
  if (version !== "v1" && version !== "v2") {
    return res.status(400).json({
      success: false,
      code: "UNSUPPORTED_API_VERSION",
      message: `API version '${version}' is not supported.`,
    });
  }

  // 2. Thêm Deprecation Headers nếu là version v1
  if (version === "v1") {
    res.setHeader("Deprecation", "true");
    res.setHeader("Sunset", "Wed, 31 Dec 2025 23:59:59 GMT");
  }

  // 3. Định dạng lại dữ liệu trả về theo version
  const formattedBooks = books.map((book) => formatBook(book, version));

  return res.status(200).json({
    success: true,
    data: formattedBooks,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
