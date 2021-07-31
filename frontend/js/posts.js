let insertPost = document.querySelector("#js-insertPost");
let id = [];

fetch("http://localhost:3000/api/post/")
	.then((res) => {
		console.log("res.200");
		console.log(res);
		res.json().then((value) => {
			const postsArray = value.posts;
			console.log("tableau posts");
			console.log(postsArray);
			console.log(postsArray[1]);
			console.log("postsArray[1].User");
			console.log(postsArray[1].User.image);
			for (let i = 0; i < postsArray.length; i++) {
				const message = postsArray[i];
				console.log(message, "id du post :", +i + 1);

				const messageItem = `
			    <a href="./pages/post.html?id=${message.id}" class="link-id">
			        <figure class="figure">
                    <img src="${message.User.image}" id="userPicture"/>
			            <figcaption class="caption">
			                <p>Titre : ${message.title}</p>
			                <p>Nom : ${message.content}</p>
			            </figcaption>
			        </figure>
			    </a>
			    `;

				insertPost.insertAdjacentHTML("beforeend", messageItem);
			}
		});
	})
	.catch();
