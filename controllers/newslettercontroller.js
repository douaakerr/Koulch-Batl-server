import Newsletter from "../models/newsletter.js";

//newsLetter CRUD

export const createNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.create(req.body);

    res.status(201).json({
      message: "Successfully subscribed to newsletter",
      newsletter,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email is already subscribed",
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
};


export const getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find();

    res.status(200).json(newsletters);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// READ ONE
export const getNewsletter = async (req, res) => {
  try {
    const { id } = req.params;

    const newsletter = await Newsletter.findById(id);

    if (!newsletter) {
      return res.status(404).json({
        message: "Newsletter not found",
      });
    }

    res.status(200).json(newsletter);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE
export const updateNewsletter = async (req, res) => {
  try {
    const { id } = req.params;

    const newsletter = await Newsletter.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newsletter) {
      return res.status(404).json({
        message: "Newsletter not found",
      });
    }

    res.status(200).json(newsletter);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email is already subscribed",
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE
export const deleteNewsletter = async (req, res) => {
  try {
    const { id } = req.params;

    const newsletter = await Newsletter.findByIdAndDelete(id);

    if (!newsletter) {
      return res.status(404).json({
        message: "Newsletter not found",
      });
    }

    res.status(200).json({
      message: "Newsletter deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};