const postId = new URLSearchParams(window.location.search).get("id");
console.log(postId);

const insertCommentBody = document.querySelector("#js-addComment");
const insertPostId = document.querySelector("#js-insertPostById");
const btnSendForm = document.querySelector("#btn");
// const contentCommentText = document.querySelector("#contentText").value;

// console.log("contentCommentText");
// console.log(contentCommentText);

const token = localStorage.getItem("token");
let splitedToken = token.split(".");
console.log(splitedToken);

let atobToken = atob(splitedToken[1]);
console.log(atobToken);

let atobParse = JSON.parse(atobToken);
console.log("atobParse");
console.log(atobParse);
console.log("atobParse");

const userId = atobParse.userId;
console.log(userId);

fetch("http://localhost:3000/api/post/" + postId)
	.then((res) => {
		console.log(res);
		res.json().then((value) => {
			const constPost = value.post;
			console.log(value.post);
			console.log(" ");
			console.log("                                              post.User");
			console.log(" ");

			console.log(value.post.User);

			console.log(" ");
			console.log("                                              Fetch 2");
			console.log(" ");
			const post = value.post;

			const selectedPost = `
			<div class='postBody'>
			<div id='usernamePost'>${post.User.username}</div>
                <figure class="figure">
                <img src="${post.User.image}" id="userPicture"/>
                    <figcaption class="caption">
                        <p id='postTitle'>${post.title}</p>
                        <p id='postContent'>${post.content}</p>
                    </figcaption> 
                </figure>
				<button class='deletePost' id='js-deletePost'>Supprimer le post</button>
			</div>
            `;

			insertPostId.insertAdjacentHTML("beforeend", selectedPost);

			console.log("constPost");
			console.log(constPost.User.id);
			console.log("constPost");

			btnSendForm.addEventListener("click", (e) => {
				e.preventDefault();

				const commentBody = {
					UserId: userId,
					content: document.querySelector("#contentText").value,
				};

				console.log("commentBody");
				console.log(commentBody);

				fetch("http://localhost:3000/api/post/" + postId + "/comment", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(commentBody),
				})
					.then((res) => res.json())
					.then((value) => {
						window.location.reload();
					});
			});

			const deleteButton = document.querySelector("#js-deletePost");

			deleteButton.addEventListener("click", (e) => {
				if (atobParse.isAdmin == true || constPost.User.id == userId) {
					fetch("http://localhost:3000/api/post/" + postId, {
						method: "DELETE",
					}).then((res) =>
						res.json().then((value) => {
							console.log(value);

							window.location.reload();
						})
					);
				}
			});
		});
	})
	.catch();

console.log("postId");
console.log(postId);
console.log("postId");

fetch("");
const insertComment = document.querySelector("#js-insertComment");

const bodyDelete = {
	UserId: userId,
};

const parsedToken = JSON.parse(token);

console.log("bodyDelete");
console.log(bodyDelete);
console.log("bodyDelete");
console.log("parsedToken");
console.log(parsedToken);
console.log("parsedToken");

fetch("http://localhost:3000/api/post/" + postId + "/comment").then((res) => {
	console.log(res.status + " fetch numéro 2");
	res.json().then((value) => {
		console.log("value");
		console.log(value);
		console.log("value");
		if (value.message) {
			console.log(value.message);
			const noComment = value.message;
		}
		for (let i = 0; i < value.length; i++) {
			const comment = value[i];
			console.log(comment, "commentaire numéro ", i);

			const commentItem = `
			<div class="commentContainer">
				<div class="username">
					<p>${comment.User.username}</p>
				</div>

				<div class="content">
					<p>${comment.content}</p>
				</div>

				<button class='deleteComment' id='js-deleteSelf${comment.id}'>Supprimer le commentaire</button>
				</div>
			`;

			insertComment.insertAdjacentHTML("beforeend", commentItem);

			console.log(atobParse.isAdmin);
			console.log(atobParse.isAdmin);
			console.log(atobParse.isAdmin);
			console.log(atobParse.isAdmin);
			const deleteBtn = document.getElementById("js-deleteSelf" + comment.id);
			deleteBtn.addEventListener("click", (e) => {
				if (atobParse.isAdmin || comment.User.id == userId) {
					fetch("http://localhost:3000/api/comment/" + comment.id, {
						method: "DELETE",
						headers: {
							Authorization: "Bearer " + parsedToken,
						},
						body: JSON.stringify(bodyDelete),
					})
						.then((res) => res.json())
						.then((value) => {
							console.log(value);
							window.location.reload();
						});
				}
			});
		}
	}).catch;
});
