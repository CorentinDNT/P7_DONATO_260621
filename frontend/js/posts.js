let insertPost = document.querySelector(".js-insertPost");
let id = [];

/*
 * @Get UserId
 */
const token = localStorage.getItem("token");
let splitedToken = token.split(".");
let atobToken = atob(splitedToken[1]);
let atobParse = JSON.parse(atobToken);

const userId = atobParse.userId;
console.log(userId);

const btnSendPost = document.querySelector("#btnPostPost");

fetch("http://localhost:3000/api/post/")
	.then((res) => {
		console.log("res.200");
		console.log(res);
		res.json().then((value) => {
			const postsArray = value.posts;
			console.log("tableau posts");
			console.log(postsArray);
			console.log(postsArray[0]);
			console.log("postsArray[0].User");
			console.log(postsArray[0].User.image);
			for (let i = 0; i < postsArray.length; i++) {
				const message = postsArray[i];
				console.log(message, "id du post :", +i + 1);

				const messageItem = `
			    <a href="../pages/post.html?id=${message.id}" class="link-id">
			        <figure class="figure">
                    <img src="${message.User.image}" id="userPicture"/>
			            <figcaption class="caption">
			                <p class='titleCaption'>Titre : ${message.title}</p>
			                <p class='textCaption'>${message.content}</p>
			            </figcaption>
			        </figure>
			    </a>
			    `;

				insertPost.insertAdjacentHTML("beforeend", messageItem);
			}
			btnSendPost.addEventListener("click", (e) => {
				e.preventDefault();

				const psotBody = {
					UserId: userId,
					title: document.querySelector("#contentTitle").value,
					content: document.querySelector("#contentText").value,
				};

				console.log("psotBody");
				console.log(psotBody);

				fetch("http://localhost:3000/api/post/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(psotBody),
				})
					.then((res) => res.json())
					.then((value) => {
						window.location.reload();
					});
			});
		});
	})
	.catch();
