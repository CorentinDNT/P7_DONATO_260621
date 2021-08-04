const token = localStorage.getItem("token");
let splitedToken = token.split(".");
let atobToken = atob(splitedToken[1]);
let atobParse = JSON.parse(atobToken);
console.log("atobParse");
console.log(atobParse);
console.log("atobParse");

const userId = atobParse.userId;
console.log(userId);

fetch("http://localhost:3000/api/user/" + userId).then((res) =>
	res.json().then((value) => {
		const user = value.user;

		localStorage.setItem("user", JSON.stringify(user));
	})
);

const userInStorage = localStorage.getItem("user");
const user = JSON.parse(userInStorage);
console.log(user);

/*
 * Appélations HTML
 */
const submitUser = document.querySelector("#submitUsername");
const submitMail = document.querySelector("#submitMail");
const submitPass = document.querySelector("#submitPassword");

submitUser.addEventListener("click", (e) => {
	e.preventDefault();

	const actualName = user.username;
	const actualMail = user.email;
	const password = document.querySelector("#inputOldPassword").value;

	const newUsername = document.querySelector("#inputUsername").value;
	const newEmail = document.querySelector("#inputMail").value;
	const newPassword = document.querySelector("#inputPassword").value;

	const changeUsername = { newUsername };
});
