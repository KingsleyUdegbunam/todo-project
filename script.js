const todoHolderElem = document.querySelector(".js-todo-holder");
const inputElem = document.querySelector(".js-input-field");
const addBtnElem = document.querySelector(".js-add-btn");

/* Get from localStorage on load or empty when there is nothing in storage */
const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
let completedTodoArray = JSON.parse(localStorage.getItem("completedCheck"));

/* Render on load */
renderTodoList();

function saveToDoToStorage() {
  localStorage.setItem("todo", JSON.stringify(todoArray));
}

function saveCompletedToStorage() {
  localStorage.setItem("completedCheck", JSON.stringify(completedTodoArray));
}

function renderTodoList() {
  if (inputElem.value) {
    const todo = inputElem.value;
    todoArray.push(todo);
  }

  saveToDoToStorage();
  renderTodo();
  completeTask();

  inputElem.value = "";
}

addBtnElem.addEventListener("click", () => {
  renderTodoList();
});

inputElem.addEventListener("keypress", (Event) => {
  if (Event.key === "Enter") {
    renderTodoList();
  }
});

/* HOW DO WE SAVE THE PAGE START SO AS TO KEEP THE COMPLETED TASK EVEN AFTER RE-RENDERING/REFRESH? */
function renderTodo() {
  let todoHTML = "";

  for (let i = 0; i <= todoArray.length - 1; i++) {
    todoHTML += `
     <li class="todo js-todo" data-todo='${i}'>
            <div class="checkbox-n-item">
              <label for="checkbox-${i}"></label>
              <input type="checkbox" name="checkbox" class='checkbox js-checkbox checkbox-${i}' id="checkbox-${i}" data-check-id='${i}'>
              <p class="todo-name js-todo-item" data-pointer='${i}'>${todoArray[i]}</p>
            </div>

            <div class="svg-holder js-delete-svg-holder">
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

  document.querySelectorAll(".js-todo-item").forEach((todo) => {
    const itemContent = todo.innerHTML;

    if (completedTodoArray) {
      completedTodoArray.forEach((item) => {
        if (item.content !== itemContent) {
          return;
        }

        if (item.state === "checked") {
          todo.classList.add("completed-task");

          const parent = todo.closest(".js-todo");
          const checkbox = parent.querySelector(".js-checkbox");
          checkbox.click();
        }
      });
    }
  });
}

/* DELETE LOGIC */
todoHolderElem.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("delete-btn") ||
    event.target.classList.contains("js-delete-svg-holder")
  ) {
    const itemNumber = event.target.closest(".todo").dataset.todo;
    const todoParent = event.target.closest(".todo");
    const todo = todoParent.querySelector(".js-todo-item");
    const content = todo.innerHTML;

    todoArray.splice(itemNumber, 1);

    let newCArray = [];
    completedTodoArray.forEach((item) => {
      if (item.content === content) return;
      newCArray.push(item);
    });

    completedTodoArray = newCArray;

    saveCompletedToStorage();
    saveToDoToStorage();
    renderTodoList();
  }
});

/* COMPLETE TASK ON CLICK LOGIC */
function completeTask() {
  const completedIdArray = completedTodoArray || [];

  document.querySelectorAll(".js-checkbox").forEach((check) => {
    check.addEventListener("click", () => {
      const checkId = check.dataset.checkId;

      document.querySelectorAll(".js-todo-item").forEach((todo) => {
        const itemId = todo.dataset.pointer;

        if (itemId !== checkId) return;

        todo.classList.toggle("completed-task");

        const content = todo.innerHTML;

        if (todo.classList.contains("completed-task")) {
          if (completedIdArray.length !== 0) {
            let matchingId;

            completedIdArray.forEach((item) => {
              if (item.content === content) {
                matchingId = item;
              }
            });

            if (matchingId) {
              matchingId.state = "checked";
            } else {
              completedIdArray.push({ id: itemId, state: "checked", content });
            }
          } else {
            completedIdArray.push({ id: itemId, state: "checked", content });
          }
        } else {
          let matchingId;

          completedIdArray.forEach((item) => {
            if (item.content === content) {
              matchingId = item;
            }
          });
          if (matchingId) {
            matchingId.state = "unchecked";
          }
        }

        completedTodoArray = completedIdArray;

        saveCompletedToStorage();
      });
    });
  });
}
