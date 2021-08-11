const fs = require("fs");
const db = require("../models");
const jwt = require("../middleware/jwt.utils");
const bcrypt = require("bcrypt");

exports.createComment = async (req, res) => {
	try {
		const UserId = req.body.UserId;
		const PostId = req.params.id;
		const content = req.body.content;

		if (!PostId || !content || !UserId) {
			return res.status(400).json({ error: "Informations manquantes" });
		}
		const existantPost = await db.Post.findOne({ where: { id: PostId } });

		if (!existantPost) {
			return res.status(404).json({ error: "Poste innexistant ou supprimé" });
		}

		const existantUser = await db.User.findOne({ where: { id: UserId } });
		if (!existantUser) {
			return res.status(404).json({ error: "uttilisateur innexsitant" });
		}
		await db.Comment.create({ UserId, PostId, content });
		return res.status(201).json({ message: "Commentaire posté avec succès" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.getComments = async (req, res) => {
	try {
		const PostId = req.params.id;
		const comments = await db.Comment.findAll({
			where: { PostId },
			include: {
				model: db.User,
				attributes: ["username", "id", "image", "isAdmin"],
			},
		});
		if (comments.length == 0) {
			return res
				.status(200)
				.json({ message: "ce poste ne contient aucun commentaire" });
		}
		return res.status(200).json(comments);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.deleteComment = async (req, res) => {
	try {
		const id = req.params.id;
		const isAdmin = jwt.isAdmin(req);

		const comment = await db.Comment.findOne({
			where: { id },
			include: [db.User],
		});
		if (!comment) {
			return res.status(404).json({ message: "commentaire introuvable" });
		}

		//Est-ce un Administrateur
		if (isAdmin) {
			await comment.destroy();
			return res
				.status(200)
				.json({ message: "message supprimé par un Administrateur" });
		}

		await comment.destroy();
		return res
			.status(200)
			.json({ message: "commentaire supprimé avec succès" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

/* 
			include: {
				model: db.User,
				attributes: ["username","id","image","isAdmin"],
			},
*/
