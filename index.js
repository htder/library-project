const gridContainer = document.querySelector(".grid-container");
const modal = document.querySelector(".modal");
const openModel = document.querySelector(".empty");
const submit = document.querySelector(".submit");
const cancel = document.querySelector(".cancel");
const form = document.getElementById("form");
const body = document.querySelector("body");

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
  index++;
  event.preventDefault();
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
});

cancel.addEventListener("click", () => {
  clearForm();
  hideModal();
});

function Book(title, author, pages, read, id) {
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

function findBookIndex(book) {
  const index = myLibrary.findIndex((element) => book.title === element.title);
  return index === -1 ? myLibrary.length : index;
}
renderLibrary();

// const removeBtn = document.querySelectorAll(".remove");

// removeBtn.forEach((button) => {
//   button.addEventListener("click", () => {
//     const card = document.querySelector(`[data-index="${button.id}"`);
//     card.parentElement.removeChild(card);
//   });
// });

// // const readCheck = document.querySelectorAll(".readCheck");
// document.querySelectorAll(".readCheck").forEach((button) => {
//   button.addEventListener("click", () => {
//     const index = +button.id;
//     myLibrary[index].read = !myLibrary[index].read;
//     console.table(myLibrary);
//   });
// });
