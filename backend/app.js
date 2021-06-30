/*********/
/*IMPORTS*/
/*********/
const express = require("express");
const app = express();

/*********/
/*ROUTES*/
/*******/
const userRoutes = require("./routes/userRoute");

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

app.use("/api/user", userRoutes);

module.exports = app;
