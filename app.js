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
function loadEventListeners() {
  // Add task Event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear tasks event
  clearBtn.addEventListener("click", clearTask);
}

// Add Task
const addTask = (e) => {
  //No submit of empty value
  if (taskInput.value === "") {
    return alert("Add a task");
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
  link.className = "delete-item float-end text-danger";
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

// Remove task
const removeTask = (e) => {
  //find the i element with delete-item
  if (e.target.parentElement.classList.contains("delete-item")) {
    //contain if want to remove the item
    if (confirm("Are you sure?"))
      // remove the li by targeting <i> then <a> then <li>
      e.target.parentElement.parentElement.remove();
  }
};

//Clear Task
const clearTask = () => {
  //one way of doing it
  // taskList.innerHTML = "";

  //second way of doing it & Faster

  //loop thru
  while (taskList.firstChild) {
    //get ul then remove the first LI recursive
    taskList.removeChild(taskList.firstChild);
  }
};
// FUNCTION TO LOAD EVENTLISTENERS
loadEventListeners();
