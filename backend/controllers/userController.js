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
		const newPassword = req.body.password;

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
		const user = await db.User.findOne({ where: { id } });
		const newUsernameSended = req.body.username;
		const newEmailSended = req.body.email;

		const newUsername = newUsernameSended ? newUsernameSended : user.username;
		const newEmail = newEmailSended ? newEmailSended : user.email;
		const newPasswordSended = req.body.newPassword;
		const newPassword = newPasswordSended
			? await bcrypt.hash(newPasswordSended, 5)
			: user.password;

		if (!user) {
			throw new Error("Désolé, uttilisateur introuvale");
		}

		const userToUpdate = await db.User.update(
			{
				username: newUsername,
				email: newEmail,
				password: newPassword,
			},
			{
				where: { id },
			}
		);

		if (!userToUpdate) {
			throw new Error(
				"Désolé, quelques chose s'est mal passé veuillez rééssayer"
			);
		}
		res.status(200).json({
			user: userToUpdate.isAdmin,
			message: "Votre compte a été mis à jour",
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
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
