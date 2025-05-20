require("dotenv").config(); // Load the .env file before anything else
const express = require("express");
const cors = require("cors");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const serachRoutes = require("./routes/searchRoutes");
const registerRouter = require("./routes/register");
const authRouter = require("./routes/authRoutes");
const refreshRouter = require("./routes/refresh");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/cartRoutes");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

const allowedOrigins = [
  "https://www.foodmart.dipikaepili.in",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  credentials: true, // Allow sending credentials (cookies, Authorization header)
};

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/", userRoutes);
app.use("/api", serachRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
 
//below are secured routes
app.use("/cart", verifyJWT, cartRoutes); //middleware is applied
app.use("/api", verifyJWT, userRoutes); //middleware is applied


app.post("/logout", (req, res) => {
  console.error("logged out");
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.sendStatus(200);
});

app.use("/", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", verifyJWT, refreshRouter);

// app.use(verifyJWT);
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
