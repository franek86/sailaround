import Country from "../models/country.model.js";
import Base from "../models/base.model.js";

import { errorHandler } from "../utils/error.js";

// Method => POST
// Route => api/v1/country/create
// Role => Admin
export const createCountry = async (req, res, next) => {
  const reqNewCountry = req.body;
  const uploadIcon = req.file.path;
  reqNewCountry.iconFlag = uploadIcon;

  try {
    const existingCountry = await Country.findOne({ name: reqNewCountry.name });

    if (existingCountry) {
      return res.status(200).json({ message: "Country already exists" });
    }

    const newCountry = new Country(reqNewCountry);
    await newCountry.save();
    res.status(200).json({ data: newCountry, message: "New country added" });
  } catch (error) {
    next(errorHandler(500, "Country create error"));
  }
};

// Method => GET
// Route => api/v1/countries
// Role => Public

export const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.find();
    res.status(200).json({ data: countries, message: "Succesfull get countries" });
  } catch (error) {
    next(errorHandler(500, "Fetch countries error"));
  }
};

// Method => GET
// Route => api/v1/countriesBaseCount
// Role => Public

export const getCountriesWithBaseCount = async (req, res, next) => {
  try {
    const countBasesinCountries = await Country.aggregate([
      {
        $lookup: {
          from: "bases",
          localField: "_id",
          foreignField: "countryId",
          as: "baseCount",
        },
      },
      {
        $project: {
          name: 1,
          shortCountryCode: 1,
          longCountryCode: 1,
          iconFlag: 1,
          baseCount: { $size: "$baseCount" },
        },
      },
    ]);
    res.status(200).json({ data: countBasesinCountries, message: "Succesfull get countries count bases" });
  } catch (error) {
    next(errorHandler(500, "Fetch count bases in country error"));
  }
};
