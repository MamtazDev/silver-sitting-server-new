const express = require("express");
const {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getAllBlogs,
} = require("../controller/blog.controller");
const router = express.Router();

// create new blog
router.post("/", createBlog);

// update blog by blog id
router.patch("/:id", updateBlog);

// get all blogs
router.get("/all", getAllBlogs);

// get single blog by blog id
router.get("/:id", getBlogById);

// get all blogs
router.delete("/:id", deleteBlog);

module.exports = router;
