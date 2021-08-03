if (!localStorage.token) {
	const login = document.querySelector("#loginSubmit");

	login.addEventListener("click", (e) => {
		e.preventDefault();
		const userLogs = {
			username: document.querySelector("#usernameLogin").value,
			password: document.querySelector("#passwordLogin").value,
		};

		fetch("http://localhost:3000/api/auth/login/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userLogs),
		})
			.then((res) => res.json())
			.then((value) => {
				const tokenSplited = value.message.split(" ");
				console.log("token splited by space");
				console.log(tokenSplited);

				const token = tokenSplited[2];
				console.log(token);

				localStorage.setItem("token", JSON.stringify(token));

				window.location.reload();
			})
			.catch((e) => console.log(e));
	});

	const register = document.querySelector("#registerSubmit");

	register.addEventListener("click", (e) => {
		e.preventDefault();
		const userRegisterLogs = {
			username: document.querySelector("#usernameRegister").value,
			password: document.querySelector("#passwordRegister").value,
			email: document.querySelector("#mailRegister").value,
		};

		fetch("http://localhost:3000/api/auth/register/", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(userRegisterLogs),
		})
			.then((res) => res.json())
			.then((value) => {
				const token = value.message;
				console.log(token);

				localStorage.setItem("token", JSON.stringify(token));

				window.location.reload();
			})
			.catch((e) => window.alert("connexion a échouée"));
	});
}
