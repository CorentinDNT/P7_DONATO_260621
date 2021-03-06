/*********/
/*IMPORTS*/
/*********/
const express = require("express");
const path = require("path");
const app = express();
const helmet = require("helmet");

/*********/
/*ROUTES*/
/*******/
const authRoutes = require("./routes/authRoute");
const postRoutes = require("./routes/postRoute");
const userRoutes = require("./routes/userRoute");
const commentRoutes = require("./routes/commentRoute");

require("dotenv").config();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
