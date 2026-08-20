import Product from "../models/products.js";

export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      const isOwner =
        product.seller.toString() === req.user.id;
  
      const isAdmin = req.user.role === "admin";
  
      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          success: false,
          message:
            "You are not allowed to delete this product",
        });
      }
  
      /*
      Delete product images from server
      */
  
      for (const image of product.images) {
        const imagePath = path.join(
          "uploads/products",
          image
        );
  
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
  
      await Product.findByIdAndDelete(id);
  
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: error.message,
      });
    }
  };