import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      page = 1,
      limit = 10,
    } = req.query;

   

    const filter = {};

    // Search by product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }
    
    // PAGINATION

    const currentPage = Number(page);
    const productsPerPage = Number(limit);

    const skip = (currentPage - 1) * productsPerPage;

    const products = await Product.find(filter)
      .skip(skip)
      .limit(productsPerPage);

    // Count products AFTER filters
    const totalProducts = await Product.countDocuments(filter);

    const totalPages = Math.ceil(
      totalProducts / productsPerPage
    );

    res.status(200).json({
      products,

      pagination: {
        currentPage,
        productsPerPage,
        totalProducts,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};