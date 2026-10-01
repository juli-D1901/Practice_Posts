const postContainer = document.querySelector("#root");
const prevPostBtn = document.querySelector(".left");
const nextPostBtn = document.querySelector(".right");
const BASE_URL = "https://jsonplaceholder.typicode.com";

// Задание 1 — localStorage
let postNumber = Number(localStorage.getItem("postNumber")) || 1;

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

  // Задание 3 — Валидация
  if (
    !postData ||
    typeof postData.id !== "number" ||
    typeof postData.title !== "string" ||
    typeof postData.body !== "string"
  ) {
    postContainer.innerHTML = "<p>Ошибка: данные поста некорректны.</p>";
    return;
  }

  renderPost(postData);
};

// Загружаем сохранённый пост при открытии страницы
loadPost();

// Задание 4 — Debounce (350 ms)
const debounce = (callback, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const handleNextPost = debounce(() => {
  postNumber++;

  localStorage.setItem("postNumber", postNumber);

  loadPost();
}, 350);

const handlePrevPost = debounce(() => {
  if (postNumber > 1) {
    postNumber--;

    localStorage.setItem("postNumber", postNumber);

    loadPost();
  }
}, 350);

nextPostBtn.addEventListener("click", handleNextPost);
prevPostBtn.addEventListener("click", handlePrevPost);
