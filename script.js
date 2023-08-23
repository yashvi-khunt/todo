"use strict";

//creating variables for all HTML elements

const addBtn = document.getElementById("addbtn");
const searchBtn = document.getElementById("searchbtn");
const searchBar = document.getElementById("searchbar");

const taskList = document.getElementById("list");

const selectAll = document.getElementById("select-all");
const unSelectAll = document.getElementById("unselect-all");
const deleteSelected = document.getElementById("delete-selected");

const ascending = document.getElementById("a-z");
const descending = document.getElementById("z-a");
const newest = document.getElementById("newest");
const oldest = document.getElementById("oldest");

const btnAll = document.getElementById("diaplay-all");
const btnActive = document.getElementById("diaplay-active");
const btnCompleted = document.getElementById("diaplay-completed");

const toolTip = document.getElementById("tooltip");

//state variable for add & search
let searchState = false;

/*let allTasks = ["dfg", "foseu", "slkdvu"];
let activeTasks = [];
let completedTasks = [];*/

const tasks = [
  {
    taskName: "asdc",
    status: "active",
    isChecked: false,
    // id: 1,
  },
  {
    taskName: "water",
    status: "active",
    isChecked: false,
    // id: 2,
  },
  {
    taskName: "book",
    status: "active",
    isChecked: false,
    // id: 3,
  },
];

/////////////////////////////////////
//        Event Listeners
/////////////////////////////////////

//Add Button - on click(add task)
addBtn.addEventListener("click", function () {
  //searchbar state = add new task
  addBtn.style.fill = "pink";
  searchBtn.style.fill = "none";

  searchBar.placeholder = "Add new task";

  //when switching from search to add, don't display empty string message
  if (searchState) {
    searchBar.value = "";
    searchState = false;
  } else {
    addTask();
  }
});

//on enter - add(task)
searchBar.addEventListener("keyup", function (event) {
  if (!searchState) {
    if (event.key === "Enter") {
      addTask();
    }
  } else {
    searchTask();
  }
});

searchBtn.addEventListener("click", function () {
  //set state to search
  searchState = true;

  // clear search bar
  searchBar.value = "";
  searchBar.placeholder = "Search a task";

  //change btn
  addBtn.style.fill = "none";
  searchBtn.style.fill = "pink";
});

//select all button
selectAll.addEventListener("click", function () {
  tasks.map((task) => {
    console.log(task);
    task.isChecked = true;
  });
  console.log(tasks);
});

/////////////////////////////////////
//        Functions
/////////////////////////////////////

//dislpay tasks
const displayTask = function (tasksArr) {
  //   console.log(taskList);
  const taskArrName = tasksArr.map(
    ({ taskName: n, status: s, isChecked: check, id }) => n
  );
  console.log(`display: [${taskArrName}]`);
  taskList.innerHTML = "";
  let html = "";
  if (taskArrName.length === 0) {
    html = `<div class="list-item">
                      <label>No Data Found</label>
                 </div>`;
  } else {
    taskArrName.forEach((task, i) => {
      html += `
      <div class="list-item">
        <input type="checkbox" id='check${i}' name="select" />
        <label>${task}</label>

        <!-- edit button -->
         <img src="./images/edit.svg" id='edit${i}'/>

        <!-- delete button -->
        <img src="./images/delete.svg" id='delete${i}' />
     </div>`;
    });
  }

  taskList.insertAdjacentHTML("beforeend", html);
  // console.log(tasks);
};

const validate = function (str) {
  const pattern = "^[A-Za-z0-9_-]+$";

  const regex = new RegExp(pattern);

  if (regex.test(str)) {
    return true;
  } else {
    alert("enter valid task");
    return false;
  }
};

const addTask = function () {
  const newTask = searchBar.value;
  const valid = validate(newTask);

  //add task to array
  if (valid) {
    tasks.push({ taskName: newTask, status: "active", isChecked: false });
  }

  console.log(tasks);
  //clear searchBar
  searchBar.value = "";

  //display task
  displayTask(tasks);
};

const searchTask = function () {
  const str = searchBar.value;
  // const allTasks = tasks.map(
  //   ({ taskName: n, status: s, isChecked: check, id }) => n
  // );
  const searchElements = tasks.filter((task) => {
    // console.log(task);
    if (task.taskName.includes(str)) {
      // console.log(task);
      return task;
    }
  });
  displayTask(searchElements);
};

/////////////////////////////////////
//        Function call
/////////////////////////////////////

const init = function () {
  btnAll.classList.add("active");
  displayTask(tasks);
};

init();
