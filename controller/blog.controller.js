const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const result = await newBlog.save();
    res.status(200).json({
      success: true,
      message: "Blog Create Successful!",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Blog Create Failed!",
      error_message: error.message,
    });
  }
};

// get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortOrder = req.query.sortOrder || "desc";
    const searchQuery = req.query.searchQuery || "";
    const startIndex = (page - 1) * limit;

    const query = {
      $or: [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ],
    };

    const result = await Blog.find(query)
      .sort({ _id: sortOrder === "asc" ? 1 : -1 })
      .skip(startIndex)
      .limit(limit)
      .populate("author", "_id firstName lastName image role email isVerified");

    const totalBlogs = await Blog.countDocuments(query);
    res.status(200).json({
      success: true,
      message: "Blogs Retrieve Successful!",
      data: {
        blogs: result,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Blogs Retrieve Failed!",
      error_message: error.message,
    });
  }
};

// get single blog by blog id
const getBlogById = async (req, res) => {
  try {
    const result = await Blog.findById({ _id: req.params.id }).populate(
      "author",
      "_id firstName lastName image role email isVerified"
    );
    res.status(200).json({
      success: true,
      message: "Blog Retrieve Successful!",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Blog Retrieve Failed!",
      error_message: error.message,
    });
  }
};

// update blog by blog id
const updateBlog = async (req, res) => {
  try {
    const result = await Blog.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Blog Update Successful!",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Blog Update Failed!",
      error_message: error.message,
    });
  }
};

// delete blog by blog id
const deleteBlog = async (req, res) => {
  try {
    const result = await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Blog Delete Successful!",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Blog Delete Failed!",
      error_message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
