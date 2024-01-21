import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    shortCountryCode: {
      type: String,
      required: true,
    },
    longCountryCode: {
      type: String,
      required: true,
    },
    iconFlag: {
      type: String,
    },
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;
