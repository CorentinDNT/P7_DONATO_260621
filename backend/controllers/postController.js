// Imports

const fs = require("fs");
const db = require("../models");

exports.createPost = async (req, res) => {
	try {
		const UserId = req.body.UserId;
		const title = req.body.title;
		const content = req.body.content;
		const attachment = req.body.attachment;

		if (!UserId || !title || !content) {
			return res.status(400).json({ error: "Infos manquantes" });
		}

		const existUser = await db.User.findOne({ where: { id: UserId } });
		if (!existUser) {
			return res.status(404).json({ error: "uttilisateur inexistant" });
		}

		const existPost = await db.Post.findOne({ where: { title } });
		if (existPost) {
			return res.status(400).json({
				error:
					"ce titre est déjà uttilisé pour un autre post, merci d'en choisir un autre",
			});
		}

		const createPost = await db.Post.create({
			UserId,
			title,
			content,
		});
		await post.save();
		return res.status(201).json({ message: "post créer" });
	} catch (error) {
		res.status(400).json({ error });
	}
};
