// SELECTING ITEMS FROM DOM

//get the form
const form = document.getElementById("task-form");
//get the task list ul
const taskList = document.querySelector(".list-group");
//get the clear button
const clearBtn = document.querySelector("#clear-tasks");
//get the task input
const taskInput = document.getElementById("task");
//get the filter input
const filterTask = document.querySelector("#task");

//load all eventlisteners
const loadEventListeners = () => {
  // Add task Event
  form.addEventListener("submit", addTask);
};

// Add Task
const addTask = (e) => {
  //No submit of empty value
  if (taskInput.value === "") {
    alert("Add a task");
  }

  //create li element
  const li = document.createElement("li");
  // Add a class
  li.className = "list-group-item";
  // create Text node & append to li
  const text = document.createTextNode(taskInput.value);
  // append text node to li
  li.appendChild(text);
  // create link element
  const link = document.createElement("a");
  // Add a class
  link.className = "float-end text-danger";
  // add html icon
  link.innerHTML = '<i class="fas fa-times-circle"></i>';
  //append link to li
  li.appendChild(link);

  // Append li to Ul
  taskList.appendChild(li);

  // clear the input
  taskInput.value = "";

  // prevent default element behaviour
  e.preventDefault();
};

// FUNCTION TO LOAD EVENTLISTENERS
loadEventListeners();
