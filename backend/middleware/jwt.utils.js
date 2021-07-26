//Imports
var jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "tokensupersecret";

//Fonctions exports
exports.generateTokenForUser = (user) => {
	return jwt.sign(
		{
			userId: user.id,
			username: user.username,
			isAdmin: user.isAdmin,
		},
		JWT_SIGN_SECRET,
		{ expiresIn: "12h" }
	);
};

exports.getUserId = (req) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
	const userId = decodedToken.userId;
	return userId;
};

exports.loggedIn = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
		const userId = decodedToken.userId;

		if (req.body.userId && req.body.userId != userId) {
			throw "User Id non valable !";
		}

		next();
	} catch (error) {
		res.status(401).json({ error: "Requête non authentifiée !" });
	}
};

exports.isAdmin = (req) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
	const isAdmin = decodedToken.isAdmin;

	return isAdmin;
};
