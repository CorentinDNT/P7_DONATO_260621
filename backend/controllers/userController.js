const bcrypt = require("bcrypt");
const fs = require("fs");
const db = require("../models");
const bd = require("../models");

const emailRegEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegEX = /^(?=.*\d).{4,8}$/;

/*

     _'O
    / /\_
    _/\
      /
     
*/

//~create~
//read
//uptade
//delete

exports.getUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await db.User.findOne({
			attributes: ["username", "email", "image", "isAdmin"],
			where: { id },
		});
		if (!user) {
			return res.status(404).json({ message: "uttilisateur introuvable" });
		}
		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const usernameChanged = req.body.newUsername;
		const emailChanged = req.body.newEmail;
		const passwordChanged = req.body.newPassword;
		const password = req.body.password;

		const user = await db.User.findOne({ where: { id } });

		if (!user) {
			return res.status(404).json({ error: "uttilisateur introuvale" });
		}

		const isItTruePassword = await bcrypt.compare(password, user.password);
		if (!isItTruePassword) {
			return res.status(401).json({ error: "mot de passe incorrect" });
		}

		if (usernameChanged) {
			const userExist = await db.User.findOne({
				where: { username: usernameChanged },
			});
			if (userExist) {
				return res.status(400).json({
					error: "nom d'uttilisateur déjà existant merci d'en choisir un autre",
				});
			}
		}

		if (emailChanged) {
			if (!TESTER_LA_REGEX) {
				//TESTER LA REGEX DU MAIL ------------------------------------------------
				return res.status(400).json({ error: "email invalide " });
			} else {
				const userExist = await db.User.findOne({
					where: { email: emailChanged },
				});
				if (userExist) {
					return res.status(400).json({ error: "email déjà uttilisé" });
				}
			}
		}

		if (passwordChanged) {
			if (!TESTER_LE_MDP) {
				return res
					.status(400)
					.json({ error: "force du mot de passe insuffisante" });
			}
		}

		const theNewUsername = usernameChanged ? usernameChanged : user.username;
		const theNewEmail = emailChanged ? emailChanged : user.email;
		const theNewPassword = passwordChanged
			? await bcrypt.hash(passwordChanged, 10)
			: user.password;

		user.username = theNewUsername;
		user.email = theNewEmail;
		user.password = theNewPassword;

		await user.save();

		return res.status(200).json({ message: "informations mise à jour" });
	} catch (error) {
		return res.status(400).json({ error });
	}
};

exports.updateUserImage = async (req, res) => {
	try {
		let file = req.file;
		let id = req.params.id;
		const user = await db.User.findOne({ where: { id } });

		if (!user) {
			return res.status(404).json({ error: "uttilisateur introuvable" });
		}
		user.image = `${req.protocol}://${req.get("host")}/images/profilePics/${
			file.filename
		}`;
		await user.save();
		return res
			.status(200)
			.json({ message: "photo de profile mise à jour avec succès" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		const password = req.body.password;
		const user = await db.User.findOne({ where: { id } });

		if (!user) {
			return res.status(404).json({ message: "uttilisateur introuvale" });
		}

		const truePassword = await bcrypt.compare(password, user.password);

		if (!truePassword) {
			return res.status(401).json({ message: "mot de passe incorrect" });
		}

		await user.destroy();
		return res.status(200).json({ message: "user supprimé" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};
