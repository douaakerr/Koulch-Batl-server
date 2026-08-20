import Product from "../models/products.js";
import { getPagination } from "../utils/pagination.js";

export const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      condition,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    // FILTER

    const filter = {};

    // Search by product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category
    if (category) {
      filter.category = category;
    }

    // Condition
    if (condition) {
      filter.condition = condition;
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // PAGINATION

    const { currentPage, productsPerPage, skip } = getPagination(page, limit);

    // SORT

    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    if (sort === "priceAsc") {
      sortOption = { price: 1 };
    }

    if (sort === "priceDesc") {
      sortOption = { price: -1 };
    }

    // GET PRODUCTS

    const produits = await Product.find(filter)
      .populate("seller", "name email role")
      .sort(sortOption)
      .skip(skip)
      .limit(productsPerPage);
    // COUNT
    const totalProducts = await Product.countDocuments(filter);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // RESPONSE

    return res.status(200).json({
      success: true,

      produits,

      pagination: {
        currentPage,
        productsPerPage,
        totalProducts,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await products
      .findById(id)
      .populate("seller", "name email role");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get product",
      error: error.message,
    });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const produits = await products
      .find({
        seller: req.user.id,
      })
      .populate("seller", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: produits.length,
      produits,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get your products",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, condition } =
      req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, description, price and category are required",
      });
    }

    const images = req.files?.map((file) => file.filename) || [];

    const product = await Product.create({
      name,
      description,
      price,
      category,
      quantity: quantity || 1,
      condition: condition || "new",
      images,
      seller: req.user.id,
    });

    const populatedProduct = await Product.findById(product._id).populate(
      "seller",
      "name email role",
    );

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await products.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    //Seller can update only his own product.
    // Admin can update any product.

    const isOwner = product.seller.toString() === req.user.id;

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this product",
      });
    }

    const { name, description, price, category, quantity, condition } =
      req.body;

    if (name !== undefined) {
      product.name = name;
    }

    if (description !== undefined) {
      product.description = description;
    }

    if (price !== undefined) {
      product.price = price;
    }

    if (category !== undefined) {
      product.category = category;
    }

    if (quantity !== undefined) {
      product.quantity = quantity;
    }

    if (condition !== undefined) {
      product.condition = condition;
    }

    //Add new images

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.filename);

      product.images.push(...newImages);
    }

    await product.save();

    const updatedProduct = await Product.findById(id).populate(
      "seller",
      "name email role",
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};
