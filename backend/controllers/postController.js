// Imports

const fs = require("fs");
const db = require("../models");
const jwt = require("../middleware/jwt.utils");
const bcrypt = require("bcrypt");

/*

     _'O
    / /\_
    _/\
      /
     
*/

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
		await createPost.save();
		return res.status(201).json({ message: "post créer" });
	} catch (error) {
		res.status(400).json({ error });
	}
};
exports.getPost = async (req, res) => {
	try {
		const id = req.params.id;
		const post = await db.Post.findOne({ where: { id }, include: [db.User] });

		if (!post) {
			return res.status(404).json({ error: "post inexistant " });
		}

		return res.status(200).json({ post });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.getAllPosts = async (req, res) => {
	try {
		let posts = await db.Post.findAll({
			include: [db.User],
		});

		if (!posts) {
			return res.status(404).json({ rerror: "pas de messages trouvé" });
		}
		return res.status(200).json({ posts });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.updatePost = async (req, res) => {
	try {
		const PostId = req.params.id;
		const isAdmin = jwt.isAdmin(req);

		const newTitle = req.body.newTitle;
		const newContent = req.body.newContent;

		const post = await db.Post.findOne({
			where: { id: PostId },
			include: [db.User],
		});

		if (!post) {
			return res.status(404).json({ error: "poste introuvable" });
		}

		const existantPost = await db.Post.findOne({ where: { title: newTitle } });
		if (existantPost) {
			return res
				.status(400)
				.json({ error: "Ce titre existe déjà, merci d'en choisir un autre" });
		}

		if (isAdmin) {
			post.title = newTitle;
			post.content = newContent;

			await post.save();

			return res
				.status(200)
				.json({ message: "changements éffectués par un administrateur" });
		}

		post.title = newTitle;
		post.content = newContent;

		await post.save();

		return res.status(200).json({ message: "changements éffectués" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.updatePostImage = async (req, res) => {
	try {
		const PostId = req.params.id;
		const password = req.body.password;
		const file = req.file;
		const isAdmin = jwt.isAdmin(req);

		const post = await db.Post.findOne({
			where: { id: PostId },
			include: [db.User],
		});
		if (!post) {
			return res.status(404).json({ message: "poste introuvable" });
		}

		if (isAdmin) {
			const filename = post.attachment.split("/postsPics")[1];
			fs.unlink(`images/postsPics${filename}`, () => {});
			post.attachment = `${req.protocol}://${req.get(
				"host"
			)}/images/postsPics/${file.filename}`;

			await post.save();

			return res
				.status(200)
				.json({ message: "changements éffectués par un Administrateur" });
		}

		const filename = post.attachment.split("/postsPics")[1];
		fs.unlink(`images/postsPics${filename}`, () => {});
		post.attachment = `${req.protocol}://${req.get("host")}/images/postsPics/${
			file.filename
		}`;

		await post.save();

		return res.status(200).json({ message: "changement d'image éffectué" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.deletePost = async (req, res) => {
	const PostId = req.params.id;
	const post = await db.Post.findOne({
		where: { id: PostId },
		include: [db.User],
	});
	if (post.attachment !== null) {
		const filename = post.attachment.split("/images/")[1];
		fs.unlink(`images/${filename}`, () => {
			post
				.deleteOne({ id: PostId })
				.then(() => res.status(200).json({ message: "post supprimé" }))
				.catch((e) => res.status(400).json({ e }));
		});
	}
	if (!post) {
		return res.status(404).json({ error: "post introuvable !" });
	}

	const deletingPost = await db.Post.destroy({
		where: { id: PostId },
	});

	if (!deletingPost) {
		throw new Error("veuillez réessayer plus tard, post introuvable");
	} else {
		res.status(200).json({ message: "post supprimé avec succèes !" });
	}
};
