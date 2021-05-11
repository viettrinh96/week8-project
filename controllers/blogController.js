const Blog = require("../model/blog");

const blogController = {};

blogController.getAllData = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = req.body;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalBlogs = await Blog.countDocuments({
      ...filter,
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalBlogs / limit);
    const offset = limit * (page - 1);
    const blogs = await Blog.find(filter)
      .skip(offset)
      .limit(limit)
      .populate("-author", "-_id")
      .sort({ ...sortBy, createdAt: -1 });

    console.log(blogs);
    res.status(200).json({
      status: "Success",
      data: { blogs, totalPages },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

blogController.getData = async (req, res, next) => {
  try {
    // How to get the data
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "-_id -__v"
    );
    console.log(blog);

    res.status(200).json({
      status: "Success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

blogController.getCurrentUserBlogs = async (req, res, next) => {
  try {
    const userId = req.userId;
    const blog = await Blog.find({ author: userId });
    // .populate("author", "-_id -__v")
    // .populate("genres", "-_id -__v")
    // .populate("owner");

    res.status(200).json({
      status: "Success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

blogController.createData = async (req, res, next) => {
  try {
    // How can we create book data
    const userId = req.userId;
    const { title, description, image } = req.body;
    const blog = new Blog({
      title: title,
      description: description,
      image: image,
      author: userId,
    });
    await blog.save();

    res.status(200).json({
      status: "Success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

blogController.updateData = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        description: description,
        image: image,
      },
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

blogController.deleteData = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

module.exports = blogController;
