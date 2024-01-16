import Base from "../models/base.model.js";
import { errorHandler } from "../utils/error.js";

// Method => POST
// Route => api/v1/bases/create
// Role => Admin
export const createBase = async (req, res, next) => {
  const reqNewBase = req.body;
  try {
    const existingBase = await Base.findOne({ baseName: reqNewBase.baseName });
    if (existingBase) {
      return res.status(200).json({ message: "Base already exists" });
    }

    const newBase = new Base(reqNewBase);
    await newBase.save();

    res.status(200).json({ data: newBase, message: "New base added" });
  } catch (error) {
    next(errorHandler(500, "Base create error"));
  }
};

// Method => GET
// Route => api/v1/bases
// Role => Public

export const getAllBases = async (req, res, next) => {
  try {
    const bases = await Base.find();
    res.status(200).json({ bases, message: "Succesfull get all bases" });
  } catch (error) {
    next(errorHandler(500, "Bases get error"));
  }
};
