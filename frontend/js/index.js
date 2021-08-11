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

			const sortArray = postsArray.sort(function (a, b) {
				if (a.createdAt > b.createdAt) {
					return -1;
				}
				if (a.createdAt < b.createdAt) {
					return 1;
				}
				return 0;
			});

			for (let i = 0; i < 5; i++) {
				const message = postsArray[i];
				console.log(message, "id du post :", +i + 1);

				const messageItem = `
			    <a href="./pages/post.html?id=${message.id}" class="link-id">
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
		});
	})
	.catch();
