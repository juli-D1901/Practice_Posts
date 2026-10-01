const postContainer = document.querySelector("#root");
const prevPostBtn = document.querySelector(".left");
const nextPostBtn = document.querySelector(".right");
const BASE_URL = "https://jsonplaceholder.typicode.com";
let postNumber = 1;
const getPostById = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postNumber}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const renderPost = (post) => {
  postContainer.innerHTML = "";
  const title = document.createElement("p");
  const body = document.createElement("p");
  const id = document.createElement("h3");
  const continer = document.createElement("div");
  title.textContent = post.title;
  body.textContent = post.body;
  id.textContent = post.id;
  continer.classList.add("post");
  title.classList.add("subheader");
  continer.append(id, title, body);
  postContainer.append(continer);
};

const loadPost = async () => {
  // Задание 2 — Loading
  postContainer.innerHTML = "<p>Loading...</p>";

  const postData = await getPostById();

  renderPost(postData);
};
loadPost();
nextPostBtn.addEventListener("click", () => {
  postNumber++;
  loadPost();
});
prevPostBtn.addEventListener("click", () => {});

// Задание 1 — сохраняем номер поста в localStorage
nextPostBtn.addEventListener("click", () => {
  postNumber++;

  localStorage.setItem("postNumber", postNumber);

  loadPost();
});

prevPostBtn.addEventListener("click", () => {
  if (postNumber > 1) {
    postNumber--;

    localStorage.setItem("postNumber", postNumber);

    loadPost();
  }
});