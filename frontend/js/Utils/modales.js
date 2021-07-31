if (!localStorage.token) {
	const insertModale = document.querySelector("#js-insertLogModale");

	const authModale = `
<aside id="modale-auth" class="modal js-modal" aria-hidden="true" role="dialog">
			<div class="modal__wrapper">
				<div class="container">
					<div class="logo">
						<i class="fas fa-user"></i>
					</div>

					<div class="tab-body" data-id="connexion">
						<form>
							<div class="row">
								<i class="far fa-user"></i>
								<input type="text" class="input" id="usernameLogin" placeholder="Nom d'uttilisateur" required/>
							</div>
							<div class="row">
								<i class="fas fa-lock"></i>
								<input placeholder="Mot de Passe" type="password" class="input" id="passwordLogin" required/>
							</div>
							<button class="btn" id="loginSubmit" type="submit">Connexion</button>
						</form>
					</div>

					<div class="tab-body" data-id="inscription">
						<form>
							<div class="row">
								<i class="fas fa-lock"></i>
								<input type="text" class="input" id="usernameRegister" placeholder="Nom d'uttilisateur" required/>
							</div>
							<div class="row">
								<i class="far fa-user"></i>
								<input type="email" class="input" id="mailRegister" placeholder="Adresse Mail" required/>
							</div>
							<div class="row">
								<i class="fas fa-lock"></i>
								<input type="password" class="input" id="passwordRegister" placeholder="Mot de Passe" required/>
							</div>
							<button class="btn" id="registerSubmit" type="submit">Inscription</button>
						</form>
					</div>

					<div class="tab-footer">
						<a class="tab-link active" data-ref="connexion" href="javascript:void(0)">Connexion</a>
						<a class="tab-link" data-ref="inscription" href="javascript:void(0)">Inscription</a>
					</div>
				</div>
			</div>
		</aside>
`;

	insertModale.innerHTML = authModale;

	let tabs = document.querySelectorAll(".tab-link:not(.desactive)");

	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			unSelectAll();
			tab.classList.add("active");
			let ref = tab.getAttribute("data-ref");
			document
				.querySelector(`.tab-body[data-id="${ref}"]`)
				.classList.add("active");
		});
	});

	function unSelectAll() {
		tabs.forEach((tab) => {
			tab.classList.remove("active");
		});
		let tabbodies = document.querySelectorAll(".tab-body");
		tabbodies.forEach((tab) => {
			tab.classList.remove("active");
		});
	}

	document.querySelector(".tab-link.active").click();
}
