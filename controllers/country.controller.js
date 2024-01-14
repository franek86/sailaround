import Country from "../models/country.model.js";
import { errorHandler } from "../utils/error.js";

// Method => POST
// Route => api/v1/country/create
// Role => Admin
export const createCountry = async (req, res, next) => {
  const reqNewCountry = req.body;

  console.log(reqNewCountry);
  try {
    const existingCountry = await Country.findOne({ name: reqNewCountry.name });

    if (existingCountry) {
      return res.status(200).json({ message: "Country already exists" });
    }

    const newBase = new Country(reqNewCountry);
    await newBase.save();
    res.status(200).json({ data: newBase, message: "New base added" });
  } catch (error) {
    next(errorHandler(500, "Country create error"));
  }
};

// Method => GET
// Route => api/v1/countries
// Role => Public

export const getCountires = async (req, res, next) => {
  const countires = await Country.find();

  try {
    res.status(200).json({ data: countires, message: "Succesfull get countries" });
  } catch (error) {
    next(errorHandler(500, "Fetch countries error"));
  }

  console.log(countires);
};
