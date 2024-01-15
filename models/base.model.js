import mongoose from "mongoose";

const baseSchema = new mongoose.Schema(
  {
    baseName: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },

    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    /* 
    sailingAreas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SailingArea',
    }],
     */
  },
  { timestamps: true }
);

const Base = mongoose.model("Base", baseSchema);

export default Base;
