"use strict";

//creating variables for all HTML elements

const addBtn = document.getElementById("addbtn");
const searchBtn = document.getElementById("searchbtn");
const searchBar = document.getElementById("searchbar");

const taskList = document.getElementById("list");

const ddAction = document.getElementById("ddAction");
const ddSort = document.getElementById("ddSort");
// const selectAll = document.getElementById("select-all");
// const unSelectAll = document.getElementById("unselect-all");
// const deleteSelected = document.getElementById("delete-selected");

const ascending = document.getElementById("a-z");
const descending = document.getElementById("z-a");
const newest = document.getElementById("newest");
const oldest = document.getElementById("oldest");

const btnAll = document.getElementById("display-all");
const btnActive = document.getElementById("display-active");
const btnCompleted = document.getElementById("display-completed");

const toolTip = document.getElementById("tooltip");

//state variable for add & search
let searchState, currentTab;

let tasks = [
  {
    taskName: "asdc",
    status: "active",
    isChecked: false,
    id: "check0",
  },
  {
    taskName: "water",
    status: "active",
    isChecked: false,
    id: "check1",
  },
  {
    taskName: "book",
    status: "completed",
    isChecked: true,
    id: "check2",
  },
];

const showElements = function (ct) {
  if (ct === "active") {
    const activeTasks = tasks.filter((task) => {
      // console.log("active" + task.status);
      return task.status === "active";
    });
    displayTask(activeTasks);
  } else if (ct === "completed") {
    const completedTasks = tasks.filter((task) => {
      // console.log("active" + task.status);
      return task.status === "completed";
    });
    displayTask(completedTasks);
  } else {
    displayTask(tasks);
  }
};
//dislpay tasks
const displayTask = function (taskArrName) {
  taskList.innerHTML = "";
  let html = "";

  if (taskArrName.length === 0) {
    html = `<div class="list-item">
                      <label>No Data Found</label>
                 </div>`;
  } else {
    taskArrName.forEach((task, i) => {
      // console.log(task);
      html += `
      <div class="list-item">
        <input type="checkbox" id='check${i}' name="select" ${
        task.isChecked === true ? "checked " : ""
      } onclick='checkTask(this)'/>
        <label>${task.taskName}</label>

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
    const prevId = Number(tasks[tasks.length - 1].id.slice(-1));
    tasks.push({
      taskName: newTask,
      status: "active",
      isChecked: false,
      id: `check${prevId + 1}`,
    });
  }

  // console.log(tasks);
  //clear searchBar
  searchBar.value = "";

  //display task
  // displayTask(tasks);
};

const searchTask = function () {
  const str = searchBar.value;
  let searchElements;
  searchElements = tasks.filter((task) => {
    // console.log("task");
    if (task.taskName.includes(str)) {
      return task;
    }
  });
  displayTask(searchElements);
};

const init = function () {
  searchBar.value = "";
  currentTab = "all";
  searchState = false;
  btnAll.classList.add("active");
  btnActive.classList.remove("active");
  btnCompleted.classList.remove("active");
  showElements(currentTab);
  // displayTask(tasks);
  // console.log("hello");
};

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

btnActive.addEventListener("click", function () {
  // console.log("show Active");
  searchBar.value = "";
  currentTab = "active";
  btnAll.classList.remove("active");
  btnCompleted.classList.remove("active");
  btnActive.classList.add("active");

  showElements(currentTab);
  // ;
});

btnCompleted.addEventListener("click", function () {
  searchBar.value = "";
  currentTab = "completed";
  btnAll.classList.remove("active");
  btnCompleted.classList.add("active");
  btnActive.classList.remove("active");

  showElements(currentTab);
});

btnAll.addEventListener("click", init);

const selectUnselectAll = function (action) {
  if (action === "delete") {
    if (currentTab === "active") {
    } else {
      tasks = tasks.filter((task) => task.isChecked !== true);
    }
    // displayTask(tasks);
    ddAction.value = "action";
  } else {
    tasks.map((task) => {
      task.isChecked = action === "select" ? true : false;
      task.status = action === "select" ? "completed" : "active";
    });
    const checkboxes = document.getElementsByName("select");
    for (let checkbox of checkboxes) {
      // console.log(checkbox);
      checkbox.checked = action === "select" ? true : false;
      // checkbox.disabled = true;
    }
  }
};

const selectUnselectElement = function (element) {
  const [selectedTask] = tasks.filter((task) => {
    return task.id === element.id;
  });
  console.log(selectedTask);
  if (!selectedTask.isChecked) {
    selectedTask.isChecked = true;
    selectedTask.status = "completed";
  } else {
    selectedTask.isChecked = false;
    selectedTask.status = "active";
  }
};

const checkTask = function (element) {
  let action = ddAction.value;

  if (element === "all") {
    //action dropdown field is selected
    action = action.split("-")[0];
    selectUnselectAll(action);
    console.log(action);
  } else {
    //single element is selected
    selectUnselectElement(element);
  }
};

ddAction.addEventListener("change", checkTask.bind(null, "all"));

init();
