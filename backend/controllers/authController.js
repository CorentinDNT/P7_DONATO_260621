const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");

//--- insérer des REGEX ici ---
const emailRegEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegEX = /^(?=.*\d).{4,8}$/;

exports.userCreate = async (req, res, next) => {
	try {
		// Params
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;

		console.log(email);
		console.log(username);
		console.log(password);
		if (!username || !password || !email) {
			return res.status(400).json({
				error: "informations manquantes. (email, pseudo ou mot de passe)",
			});
		}
		let emailAdress = await db.User.findOne({ where: { email } });
		let user = await db.User.findOne({ where: { username } });

		if (emailAdress && user) {
			return res.status(400).json({ error: "ce compte existe déjà" });
		}

		if (emailAdress) {
			return res.status(400).json({ error: "adresse email déjà uttilisé" });
		}

		if (user) {
			return res
				.status(400)
				.json({ error: "nom d'uttilisateur déjà uttilisé" });
		}
		const securePassword = await bcrypt.hash(password, 10);
		const hashMail = await bcrypt.hash(email, 10);
		const newUser = await db.User.create({
			username,
			password: securePassword,
			email: hashMail,
		});
		await newUser.save();
		return res
			.status(201)
			.json({ message: "uttilisateur créer avec succès !" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.userLogin = async (req, res, next) => {
	const username = req.body.username;
	let password = req.body.password;

	if (!username || !password) {
		return res.status(400).json({ error: "pseudo ou mot de passe manquant" });
	}
	const user = await db.User.findOne({ where: { username } });
	if (!user) {
		return res
			.status(400)
			.json({ error: "Aucun uttilisateur ne correspond à" + username });
	}
	const correctPassword = await bcrypt.compare(password, user.password);
	if (!correctPassword) {
		return res.status(400).json({ error: "mot de passe invalide" });
	}
	return res.status(200).json({ message: "connexion reussie" });
};
