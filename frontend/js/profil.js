const token = localStorage.getItem("token");
let splitedToken = token.split(".");
let atobToken = atob(splitedToken[1]);
let atobParse = JSON.parse(atobToken);
console.log(atobParse);

const userId = atobParse.userId;
console.log(userId);

fetch("http://localhost:3000/api/user/" + userId).then((res) =>
	res.json().then((value) => {
		const user = value.user;
		console.log(user);

		if (user.isAdmin) {
			isAdmin = user.username + " Est un Administrateur !";
		} else {
			isAdmin = " ";
		}
		console.log(isAdmin);

		const insertProfile = `
        <section class="profile">
            <h2 id="showUsername">${user.username}</h2>
            <div id="picsContainer">
                <img id="profilePics" src="${user.image}" />
            </div>
            <h3 id="showAdmin">${isAdmin}</h3>
        </section>
        `;

		document
			.querySelector("#JS-inserProfile")
			.insertAdjacentHTML("beforeend", insertProfile);
	})
);
