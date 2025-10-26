// content area
const homePage = document.querySelector("#home-page");

// access of all buttons
const sidebarButtons = document.querySelectorAll("#sidebar button");

// tabs
const focusMode = document.querySelector(".focus-mode");
const pomodoro = document.querySelector(".pomodoro");
const brainstorm = document.querySelector(".brainstorm");
const todo = document.querySelector(".todo");
const qoutes = document.querySelector(".apps");

// qoutes that go for the non tanned home page
fetch("https://api.quotable.io/quotes/random")
  .then((res) => res.json())
  .then((res) => {
    const data = res[0].content;
    homePage.innerHTML = `${data}`;
  })
  .catch((err) => console.error("Error fetching quote:", err));

// flags for keeping track of "ON" tabs
let onFocusMode = false;
let onApps = false;
let onPomodoro = false;
let onToDo = false;
let onBrainstorm = false;

function handleViewChange(clickedButton) {
  sidebarButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  clickedButton.classList.add("active");

  while (homePage.firstChild) {
    homePage.removeChild(homePage.firstChild);
  }

  homePage.style.padding = "50px ";
  homePage.style.display = "flex";
  homePage.style.flexDirection = "column";
  homePage.style.alignItems = "center";
  homePage.style.justifyContent = "center";
  homePage.style.gap = "50px";

  onFocusMode = false;
  onApps = false;
  onPomodoro = false;
  onToDo = false;
  onBrainstorm = false;
}

/**
 *==================== Focus Mode ===========================
 */

let hour = 0;
let minute = 0;
let second = 0;

let IsRunning = false;

focusMode.addEventListener("click", () => {
  if (!onFocusMode) {
    handleViewChange(focusMode);

    onFocusMode = true;

    const stopWatchDiv = document.createElement("div");
    stopWatchDiv.style.backgroundColor = "beige";
    stopWatchDiv.style.borderRadius = "20px";
    stopWatchDiv.style.border = "1px solid blue";
    stopWatchDiv.style.width = "380px";

    // if id is the same then the latest element created is comsidered

    const hours = document.createElement("span");
    hours.id = "hours";
    hours.style.fontSize = "70px";
    hours.style.color = "black";
    hours.textContent = `${hour}:`;

    const minutes = document.createElement("span");
    minutes.id = "minutes";
    minutes.style.fontSize = "70px";
    minutes.style.color = "black";
    minutes.textContent = `${minute}:`;

    const seconds = document.createElement("span");
    seconds.id = "seconds";
    seconds.style.fontSize = "70px";
    seconds.style.color = "black";
    seconds.textContent = `${second}`;

    stopWatchDiv.appendChild(hours);
    stopWatchDiv.appendChild(minutes);
    stopWatchDiv.appendChild(seconds);

    const play = document.createElement("button");
    play.id = "play-btn";
    play.style.backgroundColor = "#dcff7dff";
    play.style.border = "1px dotted black";
    play.style.padding = "5px";
    play.style.margin = "5px";
    play.style.borderRadius = "6px";
    play.style.cursor = "pointer";
    play.textContent = "Play";

    const pause = document.createElement("button");
    pause.id = "pause-btn";
    pause.style.backgroundColor = "#dcff7dff";
    pause.style.border = "1px dotted black";
    pause.style.padding = "5px";
    pause.style.margin = "5px";
    pause.style.borderRadius = "6px";
    pause.style.cursor = "pointer";
    pause.textContent = "Pause";

    const reset = document.createElement("button");
    reset.id = "reset-btn";
    reset.style.backgroundColor = "#dcff7dff";
    reset.style.border = "1px dotted black";
    reset.style.padding = "5px";
    reset.style.margin = "5px";
    reset.style.cursor = "pointer";
    reset.style.borderRadius = "6px";
    reset.textContent = "Reset";

    const btnDiv = document.createElement("div");

    btnDiv.appendChild(play);
    btnDiv.appendChild(pause);
    btnDiv.appendChild(reset);

    stopWatchDiv.appendChild(btnDiv);

    play.addEventListener("mouseover", () => {
      play.style.background = "#e7ffa4ff";
    });

    play.addEventListener("mouseleave", () => {
      play.style.background = "#dcff7dff";
    });

    pause.addEventListener("mouseover", () => {
      pause.style.background = "#e7ffa4ff";
    });

    pause.addEventListener("mouseleave", () => {
      pause.style.background = "#dcff7dff";
    });

    reset.addEventListener("mouseover", () => {
      reset.style.background = "#e7ffa4ff";
    });

    reset.addEventListener("mouseleave", () => {
      reset.style.background = "#dcff7dff";
    });

    let playStopWatch = null;
    play.addEventListener("click", () => {
      if (!IsRunning) {
        IsRunning = true;
        playStopWatch = setInterval(() => {
          console.log("Clock is ticking", Date.now());
          second++;
          seconds.textContent = second;
          if (second >= 60) {
            minute++;
            minutes.textContent = `${minute}:`;
            second = 0;
            seconds.textContent = second;
          }
          if (minute >= 60) {
            hour++;
            hours.textContent = `${hour}:`;
            minute = 0;
            minutes.textContent = `${minute}:`;
          }
        }, 1000);
      } else {
        return null;
      }
    });

    pause.addEventListener("click", () => {
      clearInterval(playStopWatch);
      IsRunning = false;
    });

    reset.addEventListener("click", () => {
      minute = 0;
      hour = 0;
      second = 0;
      hours.textContent = `${hour}:`;
      minutes.textContent = `${minute}:`;
      seconds.textContent = second;
      clearInterval(playStopWatch);
      IsRunning = false;
    });

    // homePage.innerHTML = ""
    homePage.appendChild(stopWatchDiv);

    midDiv = document.createElement("div"); // contains textarea and weather api
    midDiv.style.height = "600px";
    midDiv.style.maxWidth = "800px";
    midDiv.style.display = "flex";
    midDiv.style.gap = "0px";

    const noteDiv = document.createElement("div");
    noteDiv.style.display = "flex";

    const textArea = document.createElement("textarea");
    textArea.style.minWidth = "400px";
    textArea.style.maxWidth = "500px";
    textArea.id = "my-textarea";
    textArea.style.maxHeight = "350px";
    textArea.style.minHeight = "350px";
    textArea.style.lineHeight = "15px";
    textArea.style.padding = "10px";
    textArea.style.backgroundColor = "rgba(255, 205, 237, 1)";
    textArea.style.borderTopRightRadius = "20px";
    textArea.style.borderBottomRightRadius = "20px";
    textArea.style.overflow = "auto";
    textArea.placeholder = "Enter your notes here";

    const savedNotes = localStorage.getItem("focusModeNotes");
    if (savedNotes) {
      textArea.value = savedNotes;
    }

    const lineText = document.createElement("div");

    noteDiv.appendChild(lineText);
    noteDiv.appendChild(textArea);
    midDiv.appendChild(noteDiv);
    homePage.appendChild(midDiv);

    const textAreaStyles = window.getComputedStyle(textArea);

    lineText.style.fontFamily = textAreaStyles.fontFamily;
    lineText.style.fontSize = textAreaStyles.fontSize;
    lineText.style.lineHeight = textAreaStyles.lineHeight;
    lineText.style.paddingBottom = textAreaStyles.paddingBottom;
    lineText.style.backgroundColor = textAreaStyles.backgroundColor;
    lineText.style.width = "23px";
    lineText.style.height = textAreaStyles.height;
    lineText.style.textAlign = "center";
    lineText.style.overflow = "hidden";
    lineText.style.margin = "0px";
    lineText.style.borderTopLeftRadius = textAreaStyles.borderTopRightRadius;
    lineText.style.borderBottomLeftRadius = textAreaStyles.borderTopRightRadius;
    lineText.style.paddingTop = textAreaStyles.padding;
    lineText.style.paddingLeft = "3px";
    lineText.style.paddingBottom = "3px";

    textArea.addEventListener("input", () => {
      const text = textArea.value;
      const lines = text.split("\n");
      let numberString = "";
      for (let i = 1; i <= lines.length; i++) {
        numberString += i + "\n";
      }
      lineText.innerHTML = `${numberString}`;
      localStorage.setItem("focusModeNotes", text);
    });

    textArea.addEventListener("scroll", () => {
      lineText.scrollTop = textArea.scrollTop;
    });

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newHeight = entry.contentRect.height;

        lineText.style.height = `${newHeight + 21}px`;
      }
    });

    resizeObserver.observe(textArea);

    const endDiv = document.createElement("div");

    const audioControl = document.createElement("button");
    audioControl.style.backgroundColor = "lightblue";
    audioControl.style.color = "black";
    audioControl.style.padding = "7px";
    audioControl.style.borderRadius = "7px";
    audioControl.style.marginTop = "0px";

    const audio = document.createElement("audio");

    let audioRunning = false;

    audio.src = "./white_noise.mp3";
    audioControl.innerText = "Play Audio";
    audio.loop = true;

    endDiv.appendChild(audioControl);
    homePage.appendChild(endDiv);

    audioControl.addEventListener("click", () => {
      if (!audioRunning) {
        audio.play();
        audioRunning = true;
        audioControl.innerHTML = "Pause Audio";
      } else {
        audio.pause();
        audioRunning = false;
        audioControl.innerText = "Play Audio";
      }
    });
  }
});

/**
 *==================== todo ===========================
 */

todo.addEventListener("click", () => {
  if (!onToDo) {
    handleViewChange(todo);

    onToDo = true;

    const addTaskBtn = document.createElement("button");
    addTaskBtn.innerHTML = "ADD TASK";
    addTaskBtn.style.width = "100px";
    addTaskBtn.style.height = "30px";
    addTaskBtn.style.borderRadius = "10px";
    addTaskBtn.style.padding = "8px";
    addTaskBtn.style.border = "1px solid black";
    addTaskBtn.style.cursor = "pointer";
    addTaskBtn.style.backgroundColor = "#a9e5ffff";

    addTaskBtn.addEventListener("mouseover", () => {
      addTaskBtn.style.backgroundColor = "#daf4ffff";
    });

    addTaskBtn.addEventListener("mouseleave", () => {
      addTaskBtn.style.backgroundColor = "#a9e5ffff";
    });

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    addTaskBtn.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.zIndex = "100";
      overlay.style.display = "flex";
      overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";

      const modal = document.createElement("div");
      modal.style.backgroundColor = "#fff";
      modal.style.zIndex = "101";
      modal.style.padding = "20px";
      modal.style.display = "flex";
      modal.style.fontSize = "15px";
      modal.style.flexDirection = "column";
      modal.style.justifyContent = "center";
      modal.style.borderRadius = "15px";
      modal.style.boxShadow = "0px 5px 15px rgba(0,0,0,0.5)";

      const cancelBtn = document.createElement("button");
      cancelBtn.style.borderRadius = "10px";
      cancelBtn.style.cursor = "pointer";
      cancelBtn.style.padding = "5px";
      cancelBtn.style.border = "1px solid grey";
      cancelBtn.innerHTML = "Cancel";
      cancelBtn.addEventListener("click", () => {
        document.body.removeChild(overlay);
      });

      const addBtn = document.createElement("button");
      addBtn.innerHTML = "Add";
      addBtn.style.cursor = "pointer";
      addBtn.style.borderRadius = "10px";
      addBtn.style.padding = "5px";
      addBtn.style.border = "1px solid grey";

      addBtn.addEventListener("click", () => {
        if (titleInput.value != "" && dueDateInput != "") {
          const tasks = {
            title: titleInput.value,
            desc: descriptionInput.value,
            date: dueDateInput.value,
            priority: priorityOption.value,
            id: Date.now(),
          };

          todos = [tasks, ...todos];

          localStorage.setItem("todos", JSON.stringify(todos));
          document.body.removeChild(overlay);
        }
      });

      const titleLabel = document.createElement("label");
      titleLabel.innerHTML = "Title";
      titleLabel.htmlFor = "title-input";

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.style.borderRadius = "10px";
      titleInput.style.padding = "5px";
      titleInput.style.border = "1px solid black";
      titleInput.id = "title-input";
      titleInput.placeholder = "your task here...";

      const descriptionLabel = document.createElement("label");
      descriptionLabel.innerHTML = "Description";

      const descriptionInput = document.createElement("textarea");
      descriptionInput.placeholder = "your desc goes here...";
      descriptionInput.style.width = "200px";
      descriptionInput.style.maxWidth = "800px";
      descriptionInput.style.height = "100px";
      descriptionInput.style.maxHeight = "400px";
      descriptionInput.style.borderRadius = "10px";
      descriptionInput.style.border = "1px solid grey";
      descriptionInput.style.padding = "5px";

      const dueDateLabel = document.createElement("label");
      dueDateLabel.innerHTML = "Due Date";

      const dueDateInput = document.createElement("input");
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      dueDateInput.type = "date";
      dueDateInput.value = `${formattedDate}`;
      dueDateInput.min = `${formattedDate}`;
      dueDateInput.max = "2125-10-16";
      dueDateInput.style.borderRadius = "10px";
      dueDateInput.style.border = "1px solid grey";
      dueDateInput.style.padding = "3px";

      const priorityLabel = document.createElement("label");
      priorityLabel.innerText = "Priority";

      const priorityOption = document.createElement("select");
      priorityOption.style.borderRadius = "10px";
      priorityOption.style.border = "1px solid grey";
      priorityOption.style.padding = "3px";

      const urgentOption = document.createElement("option");
      urgentOption.value = "Urgent";
      urgentOption.innerHTML = "Urgent";
      priorityOption.appendChild(urgentOption);

      const highPriorityOption = document.createElement("option");
      highPriorityOption.value = "High";
      highPriorityOption.innerHTML = "High";
      priorityOption.appendChild(highPriorityOption);

      const lowPriorityOption = document.createElement("option");
      lowPriorityOption.value = "Low";
      lowPriorityOption.innerHTML = "Low";
      priorityOption.appendChild(lowPriorityOption);

      const veryLowPriorityOption = document.createElement("option");
      veryLowPriorityOption.value = "Lowest";
      veryLowPriorityOption.innerHTML = "Lowest";
      priorityOption.appendChild(veryLowPriorityOption);

      modal.append(
        titleLabel,
        titleInput,
        descriptionLabel,
        descriptionInput,
        dueDateLabel,
        dueDateInput,
        priorityLabel,
        priorityOption,
        addBtn,
        cancelBtn
      );

      overlay.append(modal);

      document.body.appendChild(overlay);
    });

    const typeDivs = document.createElement("div");
    typeDivs.style.display = "flex";
    typeDivs.style.flexDirection = "row";
    typeDivs.style.justifyContent = "center";
    typeDivs.style.gap = "70px";

    const yourTodo = document.createElement("div");
    yourTodo.style.margin = "0px";
    yourTodo.style.padding = "0px";
    yourTodo.style.borderRadius = "20px";

    yourTodo.addEventListener("mouseenter", () => {
      yourTodo.style.boxShadow = "2px 2px 5px rgba(0, 0, 0,0.4)";
    });
    yourTodo.addEventListener("mouseleave", () => {
      yourTodo.style.boxShadow = "";
    });

    yourTodo.addEventListener("click", () => {
      while (homePage.firstChild) {
        homePage.removeChild(homePage.firstChild);
      }

      const newtasks = JSON.parse(localStorage.getItem("todos"));

      const headerDiv = document.createElement("div");

      const header = document.createElement("h1");
      if (todos && todos.length) {
        header.textContent = "Your Tasks";
      } else {
        header.textContent = "No Tasks Here";
      }
      header.style.textDecoration = "underline";
      header.style.margin = "0 0 20px 0";

      homePage.appendChild(headerDiv);

      headerDiv.appendChild(header);

      const taskContainer = document.createElement("div");

      newtasks.forEach((todo) => {
        const taskDiv = document.createElement("div");
        taskDiv.style.borderRadius = "14px";
        taskDiv.style.height = "fit-content";
        taskDiv.style.textAlign = "left";
        taskDiv.style.padding = "5px";
        taskDiv.style.paddingLeft = "10px";
        taskDiv.style.paddingRight = "10px";
        taskDiv.style.margin = "5px";
        taskDiv.style.width = "800px";

        const mainTaskContent = document.createElement("div");
        mainTaskContent.style.display = "flex";
        mainTaskContent.style.flexDirection = "row";
        mainTaskContent.style.justifyContent = "space-between";
        mainTaskContent.style.alignItems = "center";
        // mainTaskContent.style.padding = "5px";
        // mainTaskContent.style.paddingLeft = "10px";
        // mainTaskContent.style.paddingRight = "10px";
        // mainTaskContent.style.margin = "5px";
        // mainTaskContent.style.width = "800px";

        taskDiv.appendChild(mainTaskContent);
        let showsDesc = false;

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.style.cursor = "pointer";
        checkBox.addEventListener("click", () => {
          if (checkBox.checked) {
            taskTitle.style.textDecoration = "line-through";
          } else if (!checkBox.checked) {
            taskTitle.style.textDecoration = "none";
          }
        });

        const taskTitle = document.createElement("div");
        taskTitle.style.fontSize = "16px";
        taskTitle.textContent = `${todo.title}`;
        taskTitle.style.cursor = "pointer";

        const rightInfoDiv = document.createElement("div");
        rightInfoDiv.style.display = "flex";
        rightInfoDiv.style.width = "280px";
        rightInfoDiv.style.justifyContent = "flex-start";
        rightInfoDiv.style.gap = "40px";

        const dueDateTitle = document.createElement("div");
        dueDateTitle.style.fontSize = "16px";
        dueDateTitle.textContent = `By: ${todo.date}`;

        const prorityTitle = document.createElement("div");
        prorityTitle.style.width = "30px";
        prorityTitle.style.fontSize = "16px";
        prorityTitle.textContent = `${todo.priority}`;

        const deleteTodoBtn = document.createElement("button");
        // deleteTodoBtn.innerHTML = "🗑️"
        deleteTodoBtn.style.cursor = "pointer";
        deleteTodoBtn.style.border = "0px";
        deleteTodoBtn.style.backgroundColor = "transparent";

        const deleteTodoIcon = document.createElement("img");
        deleteTodoIcon.src = "./delete-button-svgrepo-com.svg";
        deleteTodoIcon.style.width = "15px";
        deleteTodoIcon.style.height = "20px";
        deleteTodoIcon.style.verticalAlign = "middle";

        deleteTodoBtn.appendChild(deleteTodoIcon);

        deleteTodoBtn.addEventListener("click", (e) => {
          const updatedTasks = todos.filter((td) => td.id != todo.id);
          localStorage.setItem("todos", JSON.stringify(updatedTasks));
          taskContainer.removeChild(taskDiv);
          todos = updatedTasks;
        });

        rightInfoDiv.append(dueDateTitle, prorityTitle, deleteTodoBtn);

        taskTitle.addEventListener("click", () => {
          const description = document.createElement("div");
          description.innerHTML = `<b>Description</b> :  ${todo.desc}`;
          description.style.fontSize = "14px";
          if (!showsDesc) {
            showsDesc = true;
            taskDiv.appendChild(description);
          } else {
            taskDiv.removeChild(taskDiv.children[1]);
            showsDesc = false;
          }
        });
        if (prorityTitle.textContent == "Urgent") {
          taskDiv.style.backgroundColor = "#ff9e59ff";
          // deleteTodoBtn.style.backgroundColor = "#ff9e59ff"
        } else if (prorityTitle.textContent == "High") {
          taskDiv.style.backgroundColor = "#ffbe8fff";
          // deleteTodoBtn.style.backgroundColor = "#ffbe8fff"
        } else if (prorityTitle.textContent == "Low") {
          taskDiv.style.backgroundColor = "#ffd0aeff";
          // deleteTodoBtn.style.backgroundColor = "#ffd0aeff"
        } else {
          taskDiv.style.backgroundColor = "#ffddc5ff";
          // deleteTodoBtn.style.backgroundColor ="#ffddc5ff"
        }

        mainTaskContent.append(checkBox, taskTitle, rightInfoDiv);

        taskContainer.appendChild(taskDiv);

        homePage.style.padding = "0px";
        homePage.style.justifyContent = "flex-start";

        homePage.appendChild(taskContainer);
      });
    });

    const yourTodoIMG = document.createElement("div");
    yourTodoIMG.style.backgroundImage = "url('./clipboard.jpeg')";
    yourTodoIMG.style.backgroundSize = "cover";
    yourTodoIMG.style.backgroundRepeat = "no-repeat";
    yourTodoIMG.style.backgroundPosition = "center";
    yourTodoIMG.style.border = "1px solid blue";
    yourTodoIMG.style.borderTopLeftRadius = "20px";
    yourTodoIMG.style.borderTopRightRadius = "20px";
    yourTodoIMG.style.width = "250px";
    yourTodoIMG.style.height = "150px";
    yourTodoIMG.style.margin = "0px";

    const yourTodoText = document.createElement("div");
    yourTodoText.style.padding = "10px";
    yourTodoText.innerHTML = "Your TODO";
    yourTodoText.style.backgroundColor = "#bb9dffff";
    yourTodoText.style.margin = "0px";
    yourTodoText.style.borderBottomLeftRadius = "10px";
    yourTodoText.style.borderBottomRightRadius = "10px";
    yourTodoText.addEventListener("mouseenter", () => {
      yourTodoText.style.backgroundColor = "#c5acffff";
    });
    yourTodoText.addEventListener("mouseleave", () => {
      yourTodoText.style.backgroundColor = "#bb9dffff";
    });
    yourTodoText.addEventListener("click", () => {
      yourTodoText.style.backgroundColor = "#d7c5ffff";
    });

    yourTodo.append(yourTodoIMG, yourTodoText);

    typeDivs.appendChild(yourTodo);

    homePage.appendChild(addTaskBtn);
    homePage.appendChild(typeDivs);
  }
});

brainstorm.addEventListener("click", () => {
  handleViewChange(brainstorm);

  onBrainstorm = true;

  const yourProjectDiv = document.createElement("div");
  yourProjectDiv.style.margin = "0px";
  yourProjectDiv.style.padding = "0px";
  yourProjectDiv.addEventListener("mouseenter", () => {
    yourProjectDiv.style.boxShadow = "2px 2px 5px rgba(0, 0, 0,0.4)";
  });
  yourProjectDiv.addEventListener("mouseleave", () => {
    yourProjectDiv.style.boxShadow = "";
  });

  const yourProjectIMG = document.createElement("button");
  yourProjectIMG.style.backgroundImage = "url('./project.jpg')";
  yourProjectIMG.style.backgroundSize = "cover";
  yourProjectIMG.style.backgroundRepeat = "no-repeat";
  yourProjectIMG.style.backgroundPosition = "center";
  yourProjectIMG.style.width = "250px";
  yourProjectIMG.style.height = "150px";
  yourProjectIMG.style.margin = "0px";

  const yourProjectText = document.createElement("div");
  yourProjectText.style.padding = "10px";
  yourProjectText.innerHTML = "Your Projects";
  yourProjectText.style.backgroundColor = "#bb9dffff";
  yourProjectText.addEventListener("mouseenter", () => {
    yourProjectText.style.backgroundColor = "#c5acffff";
  });
  yourProjectText.addEventListener("mouseleave", () => {
    yourProjectText.style.backgroundColor = "#bb9dffff";
  });
  yourProjectText.addEventListener("click", () => {
    yourProjectText.style.backgroundColor = "#d7c5ffff";
  });

  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  const addProjectBtn = document.createElement("button");
  addProjectBtn.innerHTML = "ADD TOPIC";
  addProjectBtn.style.width = "100px";
  addProjectBtn.style.height = "30px";
  addProjectBtn.style.borderRadius = "10px";
  addProjectBtn.style.padding = "8px";
  addProjectBtn.style.border = "1px solid black";
  addProjectBtn.style.cursor = "pointer";
  addProjectBtn.style.backgroundColor = "#a9e5ffff";

  addProjectBtn.addEventListener("mouseover", () => {
    addTaskBtn.style.backgroundColor = "#daf4ffff";
  });

  addProjectBtn.addEventListener("mouseleave", () => {
    addTaskBtn.style.backgroundColor = "#a9e5ffff";
  });

  addProjectBtn.addEventListener("click", () => {
    const addProjectModalDiv = document.createElement("div");
    addProjectModalDiv.style.position = "fixed";
    addProjectModalDiv.style.top = "0";
    addProjectModalDiv.style.left = "0";
    addProjectModalDiv.style.width = "100%";
    addProjectModalDiv.style.height = "100%";
    addProjectModalDiv.style.zIndex = "100";
    addProjectModalDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
    addProjectModalDiv.style.display = "flex";
    addProjectModalDiv.style.justifyContent = "center";
    addProjectModalDiv.style.alignItems = "center";

    const addProjectModal = document.createElement("div");
    addProjectModal.style.display = "flex";
    addProjectModal.style.padding = "15px";
    addProjectModal.style.borderRadius = "20px";
    addProjectModal.style.flexDirection = "column";
    addProjectModal.style.backgroundColor = "white";
    addProjectModal.style.zIndex = "101";

    const projectTitleText = document.createElement("lable");
    projectTitleText.innerHTML = "Project Title";

    const projectTitleInput = document.createElement("input");
    projectTitleInput.placeholder = "title goes here...";

    const addBtn = document.createElement("button");
    addBtn.innerHTML = "Add";

    const cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "Cancel";

    addBtn.addEventListener("click", () => {
      const projectDetails = {
        title: projectTitleInput.value,
        id: Date.now(),
        notes: "",
      };

      projects = [projectDetails, ...projects];

      localStorage.setItem("projects", JSON.stringify(projects));

      document.body.removeChild(addProjectModalDiv);
    });

    cancelBtn.addEventListener("click", () => {
      document.body.removeChild(addProjectModalDiv);
    });

    addProjectModal.append(
      projectTitleText,
      projectTitleInput,
      addBtn,
      cancelBtn
    );

    addProjectModalDiv.append(addProjectModal);

    document.body.appendChild(addProjectModalDiv);
  });

  yourProjectDiv.append(yourProjectIMG, yourProjectText);

  yourProjectIMG.addEventListener("click", () => {
    while (homePage.firstChild) {
      homePage.removeChild(homePage.firstChild);
    }

    const ProjectDivContainer = document.createElement("div");
    ProjectDivContainer.style.width = "100%";
    ProjectDivContainer.style.display = "flex";
    ProjectDivContainer.style.flexDirection = "column";
    ProjectDivContainer.style.justifyContent = "center";
    ProjectDivContainer.style.alignContent = "center";
    ProjectDivContainer.style.gap = "10px";

    let headerOn = false;

    const header = document.createElement("h1");
    header.innerHTML = "<strong>No Topics</strong>";
    header.style.marginBottom = "30px";
    homePage.style.display = "block";
    homePage.appendChild(header);

    projects.map((project) => {
      const ProjectDiv = document.createElement("div");
      ProjectDiv.style.display = "flex";
      ProjectDiv.style.padding = "10px";
      ProjectDiv.style.fontSize = "16px";
      ProjectDiv.style.textAlign = "center";
      ProjectDiv.style.borderRadius = "20px";
      ProjectDiv.style.backgroundColor = "#85d8ffff";

      const ProjectDivTitle = document.createElement("div");
      ProjectDivTitle.innerHTML = `${project.title}`;
      ProjectDivTitle.style.cursor = "poiner";
      ProjectDivTitle.style.width = "90%";

      const deleteTodoBtn = document.createElement("button");
      // deleteTodoBtn.innerHTML = "🗑️"
      deleteTodoBtn.style.cursor = "pointer";
      deleteTodoBtn.style.border = "0px";
      deleteTodoBtn.style.backgroundColor = "transparent";

      const deleteTodoIcon = document.createElement("img");
      deleteTodoIcon.src = "./delete-button-svgrepo-com.svg";
      deleteTodoIcon.style.width = "15px";
      deleteTodoIcon.style.height = "20px";
      deleteTodoIcon.style.verticalAlign = "middle";

      deleteTodoBtn.appendChild(deleteTodoIcon);

      ProjectDiv.append(ProjectDivTitle, deleteTodoBtn);

      ProjectDivContainer.appendChild(ProjectDiv);


      if (projects.length && projects && !headerOn) {
        const header = document.createElement("h1");
        header.innerHTML = "<strong>Topics</strong>";
        header.style.marginBottom = "30px";
        homePage.style.display = "block";
        homePage.appendChild(header);
        headerOn = true
      }

      deleteTodoBtn.addEventListener("click", (e) => {
        projects = projects.filter((p) => p.id != project.id);
        ProjectDivContainer.removeChild(ProjectDiv);
        localStorage.setItem("projects", JSON.stringify(projects));
      });

      ProjectDivTitle.addEventListener("click", () => {
        const projectNotesDiv = document.createElement("div");
        projectNotesDiv.style.padding = "50px";
        projectNotesDiv.style.top = "0";
        projectNotesDiv.style.left = "0";
        projectNotesDiv.style.width = "100%";
        projectNotesDiv.style.height = "100%";
        projectNotesDiv.style.flexDirection = "column";
        projectNotesDiv.style.alignItems = "center";
        projectNotesDiv.style.position = "fixed";
        projectNotesDiv.style.float = "right";
        projectNotesDiv.style.backgroundColor = "#fafff0d2";
        projectNotesDiv.style.zIndex = "101";
        projectNotesDiv.style.display = "flex";
        projectNotesDiv.style.gap = "30px";

        const projectNotes = document.createElement("textarea");
        projectNotes.style.maxWidth = "500px";
        projectNotes.style.maxHeight = "400px";
        projectNotes.style.minWidth = "360px";
        projectNotes.style.minWidth = "100px";
        projectNotes.value = `${project.notes}`;
        projectNotes.style.borderRadius = "20px";
        projectNotes.style.padding = "10px";
        projectNotes.style.backgroundColor = "#ff7b7bff";
        projectNotes.style.overflow = "auto";

        projectNotes.addEventListener("input", () => {
          let text = projectNotes.value;
          project.notes = text;
          localStorage.setItem("projects", JSON.stringify(projects));
        });

        const backBtn = document.createElement("button");
        backBtn.innerHTML = "<strong>back";
        backBtn.style.width = "100px";
        backBtn.style.height = "30px";
        backBtn.style.borderRadius = "10px";
        backBtn.style.padding = "8px";
        backBtn.style.border = "1px solid black";
        backBtn.style.cursor = "pointer";
        backBtn.style.backgroundColor = "#ccff00ff";

        backBtn.addEventListener("click", () => {
          document.body.removeChild(projectNotesDiv);
        });

        const header = document.createElement("h1");
        header.innerHTML = "<strong>Your thoughts</strong>";

        projectNotesDiv.append(header, backBtn, projectNotes);
        document.body.appendChild(projectNotesDiv);
      });

      homePage.appendChild(ProjectDivContainer);
    });
  });
  
  homePage.append(addProjectBtn, yourProjectDiv);
});

qoutes.addEventListener("click", () => {
  handleViewChange(qoutes);
  onApps = true;

  homePage.innerHTML = "Fetching...";

  fetch("https://api.quotable.io/quotes/random")
    .then((res) => res.json())
    .then((res) => {
      const data = res[0].content;
      homePage.innerHTML = `${data}`;
    })
    .catch((err) => console.error("Error fetching quote:", err));
});
