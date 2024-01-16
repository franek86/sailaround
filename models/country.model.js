import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    shortFlag: {
      type: String,
      required: true,
    },
    longFlag: {
      type: String,
      required: true,
    },
    iconFlag: {
      type: String,
      required: true,
    },
    basesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Base",
      },
    ],
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;
