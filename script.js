const todoHolderElem = document.querySelector(".js-todo-holder");
const inputElem = document.querySelector(".js-input-field");
const addBtnElem = document.querySelector(".js-add-btn");

const todoArray = [];

function renderTodoList() {
  if (inputElem.value) {
    const todo = inputElem.value;
    todoArray.push(todo);
  }
  renderTodo();

  inputElem.value = "";
  deleteTodo();
}

addBtnElem.addEventListener("click", () => {
  renderTodoList();
});

inputElem.addEventListener("keypress", (Event) => {
  if (Event.key === "Enter") {
    renderTodoList();
  }
});
function renderTodo() {
  let todoHTML = "";

  for (let i = 0; i <= todoArray.length - 1; i++) {
    todoHTML += `
     <li class="todo" data-todo= '${i}'>
            <div class="checkbox-n-item">
              <label for="checkbox-${i}"></label>
              <input type="checkbox" name="checkbox" class='checkbox' id="checkbox-${i}">
              <p class="todo-name">${todoArray[i]}</p>
            </div>

            <div class="svg-holder">
              <svg class="delete-btn js-delete-btn" data-number= '${i}' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24"
                height="24" viewBox="0 0 24 24">
                <path fill="currentcolor"
                  d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z">
                </path>
              </svg>
            </div>
          </li>
    `;
  }

  todoHolderElem.innerHTML = todoHTML;
}

/* DELETE LOGIC */
function deleteTodo() {
  document.querySelectorAll(".js-delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("hello");

      document.querySelectorAll(".todo").forEach((todo) => {
        if (button.dataset.number === todo.dataset.todo) {
          const number = button.dataset.number;
          console.log(number);
          todoArray.splice(number, 1);
        }
        renderTodoList();
      });
    });
  });
}

/* COMLETED LOGIC */
