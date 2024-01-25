import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./database/mongodb.js";
import cookieParser from "cookie-parser";

dotenv.config();

// Import routes
import authRouter from "./routes/auth.route.js";
import yachtsRouter from "./routes/yachts.route.js";
import profileRouter from "./routes/profile.route.js";
import usersRouter from "./routes/users.route.js";
import baseRouter from "./routes/base.route.js";
import countryRoute from "./routes/country.route.js";

//Import middleware
import { paginationMiddleware } from "./middleware/pagination.js";

const app = express();
const port = process.env.PORT;

const whitelist = ["http://localhost:3000", "http://example2.com"];

app.options("*", cors());

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Connect to mongoDB
connectMongoDB();

// Auth api routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/yachts", yachtsRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/bases", baseRouter);
app.use("/api/v1/countries", countryRoute);

// Middlewares
app.use(paginationMiddleware());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
