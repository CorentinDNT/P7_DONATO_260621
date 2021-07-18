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

		const existPost = await db.Post.findOne({ where: { id: PostId } });
		if (!existPost) {
			return res.status(404).json({ error: "le message est introuvable" });
		}

		const createComment = await db.Comment.create({ UserId, PostId, content });
		await createComment.save();
		return res.status(201).json({ message: "commentaire ajouté avec succès" });
	} catch (error) {
		res.status(400).json({ error });
	}
};
