//Imports
var jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "C_UN_SECRET_alors-faut-pas-le-dire";

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
