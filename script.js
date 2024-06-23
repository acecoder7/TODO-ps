const todoButton = document.querySelector(".todo-btn");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");


const init = () => {
    let todoListArr;
  
    if (localStorage.getItem("todoList")) {
      todoListArr = JSON.parse(localStorage.getItem("todoList"));
    } else {
      todoListArr = [];
    }
  
    todoListArr.forEach((todo) => {
      const newTodo = document.createElement("div");
      newTodo.classList.add("todo");
  
      const newTodoListItem = document.createElement("li");
      newTodoListItem.innerText = todo.text;
  
      const newTodoBtnContainer = document.createElement("div");
      newTodoBtnContainer.classList.add("todo-btn-container");
  
      const completeBtn = document.createElement("button");
      completeBtn.classList.add("complete-btn");
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("trash-btn");
  
      completeBtn.innerHTML = '<i class="fas fa-check"></i>';
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  
      newTodoBtnContainer.appendChild(completeBtn);
      newTodoBtnContainer.appendChild(deleteBtn);
  
      newTodo.appendChild(newTodoListItem);
      newTodo.appendChild(newTodoBtnContainer);
  
      todoList.appendChild(newTodo);
    });
};
  


document.addEventListener("DOMContentLoaded", init);


todoButton.addEventListener("click", (e) => {
  // Prevent form from submitting (default behaviour of btn)
  e.preventDefault();

  //Extract the value from the input
  const todoText = todoInput.value;

  // Check if the input is empty
  if (!todoText) return;

  // Save the todo list to local storage
  saveTodoListToLocalStrorage(todoText);

  // Create a new todo item
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo");

  const newTodoListItem = document.createElement("li");
  newTodoListItem.innerText = todoText;

  const newTodoBtnContainer = document.createElement("div");
  newTodoBtnContainer.classList.add("todo-btn-container");

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("trash-btn");

  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

  newTodoBtnContainer.appendChild(completeBtn);
  newTodoBtnContainer.appendChild(deleteBtn);

  newTodo.appendChild(newTodoListItem);
  newTodo.appendChild(newTodoBtnContainer);

  todoList.appendChild(newTodo);

  todoInput.value = "";
});



const saveTodoListToLocalStrorage = (todo) => {
  let todoListArr;

  if (localStorage.getItem("todoList")) {
    todoListArr = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoListArr = [];
  }

  todoListArr.push({text: todo, isCompleted: false});

  localStorage.setItem("todoList", JSON.stringify(todoListArr));
};

