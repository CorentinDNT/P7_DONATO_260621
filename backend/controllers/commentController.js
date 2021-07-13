const fs = require("fs");
const db = require("../models");

exports.createComment = async (req, res) => {
	try {
		const UserId = req.body.UserId;
		const PostId = req.body.PostId;
		const content = req.body.content;

		if (!UserId || !PostId || !content) {
			return res.status(400).json({ error: "infos manquantes" });
		}

		const existPost = await db.User;
	} catch (error) {}
};
