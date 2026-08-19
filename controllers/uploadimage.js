export const uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image",
        });
      }
  
      const imageName = req.file.filename;
  
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${imageName}`;
  
      return res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        image: imageName,
        url: imageUrl,
      });
    } catch (error) {
      console.error(error);
      
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
        error: error.message,
      });
    }
  };