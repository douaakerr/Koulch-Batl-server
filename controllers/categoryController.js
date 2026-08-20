import Category from "../models/category.js";

// CREATE
export const createcategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// READ ALL
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// READ ONE
export const getCategory = async (req, res) => {
  try {
    const { id }= req.params;
    console.log(req.params.id);
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        
      });
      
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
     const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};