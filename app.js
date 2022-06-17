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
const filter = document.querySelector("#filter");

//load all eventlisteners
function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task Event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear tasks event
  clearBtn.addEventListener("click", clearTask);
  //filter task event
  filter.addEventListener("keyup", filterTasks);
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

  //store in localStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear the input
  taskInput.value = "";

  // prevent default element behaviour
  e.preventDefault();
};

// Store in localStorage
const storeTaskInLocalStorage = (task) => {
  let tasks;
  //check LS is not empty
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //LS not empty get task
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  //append task to tasks
  tasks.push(task);

  //Set task in LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Get tasks from LS
const getTasks = () => {
  let tasks;
  //check tasks in LS not null
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //LS not empty get task
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  //Loop theu tasks
  tasks.forEach((task) => {
    //create li element
    const li = document.createElement("li");
    // Add a class
    li.className = "list-group-item";
    // create Text node & append to li
    const text = document.createTextNode(task);
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
  });
};

// Remove task
const removeTask = (e) => {
  //find the i element with delete-item
  if (e.target.parentElement.classList.contains("delete-item")) {
    //contain if want to remove the item
    if (confirm("Are you sure?"))
      // remove the li by targeting <i> then <a> then <li>
      e.target.parentElement.parentElement.remove();

    //Remove task from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
};

//Remove Task from LS
const removeTaskFromLocalStorage = (taskItem) => {
  let tasks;
  //check tasks in LS not null
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //LS not empty get task
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  //loo thru tasks
  tasks.forEach((task, index) => {
    //check text content matches the current
    //task in the iterarion you want to delete
    if (taskItem.textContent === task) {
      //delete 1 from index
      tasks.splice(index, 1);
    } else {
    }
  });

  //set LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
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

  //Clear from LS
  clearTasksFromLocalStorage();
};

//Clear Tasks from LS
const clearTasksFromLocalStorage = () => {
  localStorage.clear();
};

//Filter task
const filterTasks = (e) => {
  //get text being typed in
  const text = e.target.value.toLowerCase();
  //Take all list items in ul and filter
  const taskListItems = document.querySelectorAll(".list-group-item");

  //loop thru to filter
  for (const task of taskListItems) {
    //get text context being typed
    const item = task.firstChild.textContent;
    //check item includes text being typed in
    if (item.toLowerCase().includes(text)) {
      //if task found display it
      task.style.display = "block";
    } else {
      //nont found hide it
      task.style.display = "none";
    }
  }
};

// FUNCTION TO LOAD EVENTLISTENERS
loadEventListeners();
