// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load EventListeners
loadEventListeners();

function loadEventListeners() {
	// DOM load event
	document.addEventListener("DOMContentLoaded", getTasks);
	// Add Task
	form.addEventListener("submit", addTask);
	// Remove task event
	taskList.addEventListener("click", removeTask);
	// Clear task event
	clearBtn.addEventListener("click", clearTasks);
	// Filter task event
	filter.addEventListener("keyup", filterTasks);
}

// check if task exists else create it
function checkIfTaskExists() {
	let tasks;

	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	return tasks;
}

// Get tasks from local storage
function getTasks() {
	let tasks = checkIfTaskExists();

	tasks.forEach(function (task) {
		// create li element
		const li = document.createElement("li");
		// add class to li
		li.className = "collection-item";
		// create text node and append to li
		li.appendChild(document.createTextNode(task));
		// create new link element
		const link = document.createElement("a");
		// add class to link
		link.className = "delete-item secondary-content";
		// add icon to link
		link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
		// append the link to li
		li.appendChild(link);

		// append li to ul
		taskList.appendChild(li);
	});
}

// Add task
function addTask(e) {
	if (taskInput.value === "") {
		alert("Add a task");
	}

	// create li element
	const li = document.createElement("li");
	// add class to li
	li.className = "collection-item";
	// create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// create new link element
	const link = document.createElement("a");
	// add class to link
	link.className = "delete-item secondary-content";
	// add icon to link
	link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
	// append the link to li
	li.appendChild(link);

	// append li to ul
	taskList.appendChild(li);

	// local storage
	addToLocalStorage(taskInput.value);

	// clear input
	taskInput.value = "";

	e.preventDefault();
}

function addToLocalStorage(task) {
	let tasks = checkIfTaskExists();

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are You Sure?")) {
			e.target.parentElement.parentElement.remove();

			// remove from local storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
	let tasks = checkIfTaskExists();

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
}

// Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
