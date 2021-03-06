const gridContainer = document.querySelector(".grid-container");
const modal = document.querySelector(".modal");
const openModel = document.querySelector(".empty");
const submit = document.querySelector(".submit");
const cancel = document.querySelector(".cancel");
const form = document.getElementById("form");
const body = document.querySelector("body");
class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "read." : "not read yet."
      }`;
    };
  }
}

let myLibrary = [
  new Book("The Lion the Witch and the Wardrobe", "C.S. Lewis", 100, true, 0),
  new Book("The Spy and the Traitor", "Ben Macintrye", 289, true, 1),
  new Book("When Time Stopped", "Ariana Neumann", 436, false, 2),
];

let index = myLibrary.length - 1;

body.addEventListener("click", (event) => {
  if (event.target.matches(".remove")) {
    const [result] = /\d+/.exec(event.target.id);
    const card = document.getElementById(`card-${result}`);
    card.parentNode.removeChild(card);
    const index = myLibrary.findIndex((book) => book.id === +result);
    myLibrary.splice(index, 1);
  }
  if (event.target.matches(".readCheck")) {
    const [result] = /\d+/.exec(event.target.id);
    const checkbox = document.getElementById(`remove-${result}`);
    myLibrary.forEach((book) => {
      if (book.id === +result) {
        book.read = !book.read;
      }
    });
  }
});

openModel.addEventListener("click", () => {
  showModal();
});

submit.addEventListener("click", (event) => {
  const titleEl = document.querySelector("#form-title");
  const authorEl = document.querySelector("#form-author");
  const pagesEl = document.querySelector("#form-pages");
  index++;
  event.preventDefault();
  let titleValid = checkTitle(titleEl),
    authorValid = checkAuthor(authorEl),
    pagesValid = checkPages(pagesEl);

  let isFormValid = titleValid && authorValid && pagesValid;
  if (isFormValid) {
    const newBook = new Book(
      form["bookTitle"].value,
      form["bookAuthor"].value,
      form["bookPages"].value,
      form["bookRead"].checked ? true : false,
      index
    );
    clearForm();
    hideModal();
    renderBook(newBook, myLibrary.length);
    myLibrary.push(newBook);
  }
});

cancel.addEventListener("click", () => {
  clearForm();
  hideModal();
});

function renderBook(book) {
  const boundFunc = bookHTML.bind(book);
  gridContainer.insertAdjacentHTML("afterbegin", boundFunc());
}

function renderLibrary() {
  myLibrary.forEach((book) => {
    renderBook(book);
  });
}

function clearForm() {
  form["bookTitle"].value = "";
  form["bookAuthor"].value = "";
  form["bookPages"].value = "";
  form["bookRead"].checked = false;
}

function hideModal() {
  modal.style.display = "none";
}

function showModal() {
  modal.style.display = "block";
  document.querySelector(".focus").focus();
}

function bookHTML() {
  const dataAttribute = this.id;
  return `<div class="card" id=card-${dataAttribute}>
  <div class="card-content ">
    <p class="title">${this.title}</p>
    <div class="info">
      <p class="author">${this.author}</p>
      <p class="pages">Total Pages: ${this.pages}</p>
    </div>
    <label class="switch">
      <span class="slider round">Read</span>
      <input  class="readCheck" id="read-${dataAttribute}" type="checkbox" ${
    this.read ? "checked" : ""
  } />
    </label>
    <button type="button" class="remove" id="remove-${dataAttribute}">Remove</button>
  </div>
  </div>`;
}

function isRequired(value) {
  return value === "";
}

function isNumber(value) {
  return Number.isInteger(+value);
}

function showError(input, message) {
  const formField = input.parentElement;
  input.classList.remove("success");
  input.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
}

function showSuccess(input) {
  const formField = input.parentElement;
  input.classList.remove("error");
  input.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
}

function checkTitle(element) {
  let valid = false;
  const title = element.value.trim();
  if (isRequired(title)) {
    showError(element, "Title cannot be blank.");
  } else {
    showSuccess(element);
    valid = true;
  }
  return valid;
}

function checkAuthor(element) {
  let valid = false;
  const author = element.value.trim();
  if (isRequired(author)) {
    showError(element, "Author cannot be blank.");
  } else {
    showSuccess(element);
    valid = true;
  }
  return valid;
}

function checkPages(element) {
  let valid = false;
  const pages = element.value.trim();
  if (isRequired(pages)) {
    showError(element, "Pages cannot be blank.");
  } else if (!isNumber(pages)) {
    showError(element, "Pages should be a number");
  } else {
    showSuccess(element);
    valid = true;
  }
  return valid;
}

renderLibrary();
