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
const submitModifications = document.querySelector("#submitChanges");
const usernameDiv = document.querySelector("#username");
const mailDiv = document.querySelector("#email");

submitModifications.addEventListener("click", (e) => {
	e.preventDefault();

	const bodyUpdate = {
		username: document.querySelector("#inputUsername").value,
		email: document.querySelector("#inputMail").value,
		newPassword: document.querySelector("#inputPassword").value,
	};
	console.log("bodyUpdate");
	console.log(bodyUpdate);

	fetch("http://localhost:3000/api/user/" + userId, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(bodyUpdate),
	})
		.then((res) => res.json())
		.then((value) => {
			console.log(value);
		});
});

/*
 *    "username": "fabien",
 *   "email": "fabien@gmail.com",
 *   "newPassword": "fabien"
 */
