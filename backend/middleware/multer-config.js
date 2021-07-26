const multer = require("multer");

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

const storageProfiles = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images/profilePics");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const finalName = name.split(".")[0];
		const extension = MIME_TYPES[file.mimetype];
		callback(null, finalName + Date.now() + "." + extension);
	},
});

const storagePosts = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images/postsPics");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const finalName = name.split(".")[0];
		const extension = MIME_TYPES[file.mimetype];
		callback(null, finalName + Date.now() + "." + extension);
	},
});

exports.profileRoad = multer({ storage: storageProfiles }).single("image");
exports.postsRoad = multer({ storage: storagePosts }).single("image");
