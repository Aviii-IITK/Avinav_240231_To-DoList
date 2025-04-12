let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", e => e.key === "Enter" && addTask());
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
    const text = todoInput.value.trim();
    if (!text) return;
    todo.push({ text, disabled: false });
    todoInput.value = "";
    saveAndRender();
  }
  
function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "todo-container";
    div.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${item.disabled ? "checked" : ""}>
      <p id="todo-${i}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${i})">${item.text}</p>
    `;
    div.querySelector("input").addEventListener("change", () => toggleTask(i));
    todoList.appendChild(div);
  });
  todoCount.textContent = todo.length;
}

function editTask(i) {
  const p = document.getElementById(`todo-${i}`);
  const input = document.createElement("input");
  input.value = todo[i].text;
  p.replaceWith(input);
  input.focus();
  input.addEventListener("blur", () => {
    const updated = input.value.trim();
    if (updated) todo[i].text = updated;
    saveAndRender();
  });
}

function toggleTask(i) {
  todo[i].disabled = !todo[i].disabled;
  saveAndRender();
}

function deleteAllTasks() {
  todo = [];
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todo", JSON.stringify(todo));
  displayTasks();
}
