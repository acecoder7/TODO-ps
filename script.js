const todoButton = document.querySelector(".todo-btn");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const completedFilterBtn = document.querySelector(".completed-filter");
const allFilterBtn = document.querySelector(".all-filter");
const remainingFilterBtn = document.querySelector(".remaining-filter");


const init = () => {
  let todoListArr;
  if (localStorage.getItem("todoList")) {
    todoListArr = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoListArr = [];
  }

  todoList.innerHTML = ``;

  todoListArr.forEach((todo) => {
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo");

    const newTodoListItem = document.createElement("li");
    newTodoListItem.innerText = todo.text;
    if (todo.isCompleted) {
      newTodoListItem.classList.add("mark-complete");
    }

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



const updateList = (todoListArr) => {
  todoList.innerHTML = ``;
  todoListArr.forEach((todo) => {
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo");

    const newTodoListItem = document.createElement("li");
    newTodoListItem.innerText = todo.text;
    if (todo.isCompleted) newTodoListItem.classList.add("mark-complete");

    const newTodoBtnContainer = document.createElement("div");
    newTodoBtnContainer.classList.add("todo-btn-container");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("trash-btn");

    completeBtn.innerHTML = `<i class="fa fa-check"></i>`;
    deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;

    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);

    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);

    todoList.appendChild(newTodo);
  });
};



const saveTodoListToLocalStrorage = (todo) => {
  let todoListArr;

  if (localStorage.getItem("todoList")) {
    todoListArr = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoListArr = [];
  }

  todoListArr.push({ text: todo, isCompleted: false });

  localStorage.setItem("todoList", JSON.stringify(todoListArr));
};




todoList.addEventListener("click", (e) => {
  //console.log(e.target);

  const item = e.target;
  if (
    item.classList.contains("trash-btn") ||
    item.classList.contains("fa-trash")
  ) {
    const eletype = item.classList.contains("fa-trash") ? 1 : 2;
    const btnConatiner =
      eletype === 1 ? item.parentElement.parentElement : item.parentElement;

    const todoListItem = btnConatiner.previousElementSibling;
    const todoText = todoListItem.textContent.trim();

    deleteTodo(todoText);
  } else if (
    item.classList.contains("complete-btn") ||
    item.classList.contains("fa-check")
  ) {
    const eletype = item.classList.contains("fa-check") ? 1 : 2;
    const btnConatiner =
      eletype === 1 ? item.parentElement.parentElement : item.parentElement;

    const todoListItem = btnConatiner.previousElementSibling;
    const todoText = todoListItem.textContent.trim();

    markComplete(todoText);
  }
});




const markComplete = (todoText) => {
  let todoListArr;

  if (localStorage.getItem("todoList")) {
    todoListArr = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoListArr = [];
  }

  const updatedTodoListArr = todoListArr.map((todo) => {
    if (todo.text === todoText) {
      todo.isCompleted = !todo.isCompleted;
    }

    return todo;
  });

  localStorage.setItem("todoList", JSON.stringify(updatedTodoListArr));

  init();
};




const deleteTodo = (todoText) => {
  let todoListArr;

  if (localStorage.getItem("todoList")) {
    todoListArr = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoListArr = [];
  }

  const updatedTodoListArr = todoListArr.filter(
    (todo) => todo.text !== todoText
  );

  localStorage.setItem("todoList", JSON.stringify(updatedTodoListArr));

  init();
};




completedFilterBtn.addEventListener("click", (e) => {
  let todoListArr;

  if (localStorage.getItem("todoList")) {
    todoListArr = JSON.parse(localStorage.getItem("todoList"));
  } else {
    todoListArr = [];
  }

  const updatedTodoListArr = todoListArr.filter((todo) => {
    return todo.isCompleted === true;
  });

  updateList(updatedTodoListArr);
});


allFilterBtn.addEventListener("click", (e) => {
    let todoListArr;
    
    if (localStorage.getItem("todoList")) {
        todoListArr = JSON.parse(localStorage.getItem("todoList"));
    } else {
        todoListArr = [];
    }
    
    updateList(todoListArr);
});


remainingFilterBtn.addEventListener("click", (e) => {
    let todoListArr;
    
    if (localStorage.getItem("todoList")) {
        todoListArr = JSON.parse(localStorage.getItem("todoList"));
    } else {
        todoListArr = [];
    }
    
    const updatedTodoListArr = todoListArr.filter((todo) => {
        return todo.isCompleted === false;
    });
    
    updateList(updatedTodoListArr);
});