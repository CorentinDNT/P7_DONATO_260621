const token = localStorage.getItem("token");
let splitedToken = token.split(".");
let atobToken = atob(splitedToken[1]);
let atobParse = JSON.parse(atobToken);
console.log(atobParse);

const userId = atobParse.userId;
console.log(userId);

const submit = document.querySelector("#submitUpdate");

fetch("http://localhost:3000/api/user/" + userId).then((res) =>
	res.json().then((value) => {
		const user = value.user;

		localStorage.setItem("user", JSON.stringify(user));
	})
);
const userInStorage = localStorage.getItem("user");
const user = JSON.parse(userInStorage);
console.log(user);

submit.addEventListener("click", (e) => {
	e.preventDefault();

	const actualName = user.username;
	const actualMail = user.email;

	const newUsername = document.querySelector("#inputUsername").value;
	const newEmail = document.querySelector("#inputMail").value;
	const newPassword = document.querySelector("#inputPassword").value;

	const sendModification = { newUsername, newEmail, newPassword };
	console.log("sendModification");
	console.log(sendModification);

	// fetch("http://localhost:3000/api/user/" + userId, {
	// 	method: "PUT",
	// 	headers: { "Content-Type": "application/json" },
	// 	body: JSON.stringify(sendModification),
	// }).then((res) =>
	// 	res.json().then((value) => {
	// 		console.log("value");
	// 		console.log(value.user);
	// 	})
	// );
});
