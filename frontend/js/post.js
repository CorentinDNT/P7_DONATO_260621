const postId = new URLSearchParams(window.location.search).get("id");
console.log(postId);

const insertPostId = document.querySelector("#js-insertPostById");

fetch("http://localhost:3000/api/post/" + postId)
	.then((res) => {
		console.log(res);
		res.json().then((value) => {
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
			</div>
            `;

			insertPostId.insertAdjacentHTML("beforeend", selectedPost);
		});
	})
	.catch();

console.log("postId");
console.log(postId);
console.log("postId");
const insertComment = document.querySelector("#js-insertComment");

fetch("http://localhost:3000/api/post/" + postId + "/comment").then((res) => {
	console.log(res.status + " fetch numéro 2");
	res.json().then((value) => {
		if (value.message) {
			console.log(value.message);
			const noComment = value.message;
		}
		for (let i = 0; i < value.length; i++) {
			const comment = value[i];
			console.log(comment, "commentaire numéro ", +i);

			const commentItem = `
				<a href="#" class="link-id">
					<figure class="figure">
						<figcaption class="caption">
							<p>${comment.User.username}</p>
							<p>${comment.content} euros</p> 
						</figcaption>
					</figure>
				</a>
			`;

			insertComment.insertAdjacentHTML("beforeend", commentItem);
		}
	}).catch;
});
