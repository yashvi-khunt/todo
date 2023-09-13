"use strict";

//creating variables for all HTML elements

const addBtn = document.getElementById("addbtn");
const searchBtn = document.getElementById("searchbtn");
const searchBar = document.getElementById("searchbar");

const taskList = document.getElementById("list");

const ddAction = document.getElementById("ddAction");
const ddSort = document.getElementById("ddSort");

const btnAll = document.getElementById("display-all");
const btnActive = document.getElementById("display-active");
const btnCompleted = document.getElementById("display-completed");

const toolTip = document.getElementById("tooltip");
const status = ["active", "completed", "deleted"];
//state variable for add & search
let searchState, currentTab, currentSort;

let tasks = [
  {
    taskName: "asdc",
    status: "active",

    isChecked: false,
    createdAt: 1692874082141,
    modifiedAt: 1692874082141,
  },
  {
    taskName: "water",
    status: "active",
    isChecked: false,
    createdAt: 1692874156533,
    modifiedAt: 1692874156533,
  },
  {
    taskName: "book",
    status: "completed",
    isChecked: true,
    createdAt: 1692875357689,
    modifiedAt: 1692875357689,
  },
];

const showElements = function (ct, array = tasks) {
  console.log(array);

  if (ct === "active") {
    const activeTasks = array.filter((task) => {
      // console.log("active" + task.status);
      return task.status === "active";
    });

    displayTask(activeTasks);
  } else if (ct === "completed") {
    const completedTasks = array.filter((task) => {
      // console.log("active" + task.status);
      return task.status === "completed";
    });
    displayTask(completedTasks);
  } else {
    displayTask(array);
  }
};
//dislpay tasks
const displayTask = function (taskArrName) {
  taskList.innerHTML = "";
  let html = "";

  if (taskArrName.length === 0) {
    html = `<div class="list-item">
    <span></span>
    <span></span>
                      <label>No Data Found</label>
                 </div>`;
  } else {
    taskArrName.forEach((task) => {
      // console.log(task);
      html += `
      <div class="list-item">
        <input type="checkbox" class='cb'  name="${task.taskName}" ${
        task.isChecked === true ? "checked " : ""
      } onclick='checkTask(this)'/>
        <label name="${task.taskName}">${task.taskName}</label>
        <span><input type="text" placeholder="Edit task" class="edit" name="${
          task.taskName
        }"/></span>

        <!-- edit button -->
         <img src="./images/edit.svg" name="${
           task.taskName
         }" onclick='editTask(this)''/>

        <!-- delete button -->
        <img src="./images/delete.svg" name="${
          task.taskName
        }" onclick='deleteTask(this)' />
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
    tasks.push({
      taskName: newTask,
      status: "active",
      isChecked: false,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    });
  }

  // console.log(tasks);
  //clear searchBar
  searchBar.value = "";

  //display task
  // showElements(currentTab);
  sortTasks();
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
  // displayTask(searchElements);
  showElements(currentTab, searchElements);
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
      console.log(
        tasks.filter((task) => {
          return task.status === "active";
        })
      );
    } else {
      tasks = tasks.filter((task) => task.isChecked !== true);
    }
    // showElements(currentTab);
    displayTask(tasks);
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
  console.log(element);
  const [selectedTask] = tasks.filter((task) => {
    return task.taskName === element.name;
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

  showElements(currentTab);
};

const deleteTask = function (taskElement) {
  console.log(taskElement.name);

  tasks = tasks.filter((task) => {
    return task.taskName !== taskElement.name;
  });

  showElements(currentTab);
};

ddAction.addEventListener("change", checkTask.bind(null, "all"));

init();

const sortTasks = function () {
  const sortArray = tasks;
  console.log(sortArray);
  let sortDierction = ddSort.value;
  console.log(sortDierction);

  if (sortDierction === "ascending") {
    sortArray.sort((a, b) => {
      return a.taskName.localeCompare(b.taskName);
    });
  } else if (sortDierction === "descending") {
    sortArray.sort((a, b) => {
      return b.taskName.localeCompare(a.taskName);
    });
  } else if (sortDierction === "newest") {
    // console.log("hel");
    sortArray.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    sortArray.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  // console.log(sortArray);
  showElements(currentTab, sortArray);
};

ddSort.addEventListener("change", sortTasks);

const editTask = function (element) {
  // console.log(element.name);
  const getParent = document.getElementsByName(element.name);
  console.log(getParent);
  const inpElement = getParent[2];
  inpElement.style.display = "inline";
  const [editTask] = tasks.filter((task) => {
    return task.taskName === element.name;
  });

  inpElement.value = element.name;
  inpElement.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      editTask.taskName = inpElement.value;
      editTask.modifiedAt = Date.now();
      console.log(editTask);
      inpElement.style.display = "none";
      getParent[1].innerText = editTask.taskName;
    }
  });
};
