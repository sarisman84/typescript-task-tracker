

const title = document.querySelector("#title") as HTMLHeadingElement;
title.textContent = "Mina Tasks";

const app = document.querySelector("#app");

let nextId = 1;

// const testButton = document.querySelector("#test-button") as HTMLButtonElement;

// function handleClick(event: MouseEvent): void {
//     const button = event.target as HTMLButtonElement;

//     console.log(button.textContent);
// }

// testButton.addEventListener("click", handleClick);

const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const addButton = document.querySelector("#add-button") as HTMLButtonElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
// const completeButton = document.querySelector(".compButton") as HTMLButtonElement;


addButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        console.log("Task name is required.");
        return;
    }
    const priority = priorityInput.value as TaskPriority;

    addTask(taskName, priority);
})

// completeButton.addEventListener("click", () => {
//     // completeTask(task);
// })


function addTask(name: string, priority: TaskPriority): void {
    const newTask: Task = {
        id: nextId,
        name: name,
        status: "pending",
        priority
    };

    tasks.push(newTask);
    nextId++;
    renderTasks();
    console.log(tasks)
    taskInput.value = "";
}





function toggleTask(id: number): void {
    for (const task of tasks) {
        if (task.id === id) {
            task.status = task.status === "pending" ? "completed" : "pending";
        }
    }
    renderTasks();
}


function deleteTask(id: number): void {
    tasks = tasks.filter((task) => task.id !== id); 

    renderTasks();
}


type Task = {
    id: number;
    name: string;
    status: "pending" | "completed";
    priority: "low" | "medium" | "high";
};

type TaskPriority = "low" | "medium" | "high";

// let tasks: Task[] = [
//     {
//         name: "Träna",
//         status: "pending",
//         priority: "high"
//     },
//     {
//         name: "Handla",
//         status: "pending",
//         priority: "low"
//     }
// ];

let tasks: Task[] = [];

function renderTasks(): void {
    if (app) {
        app.innerHTML = "";
    }

    for (const task of tasks) {
        const card = document.createElement("div");
        card.classList.add("task");

        if (task.priority === "high") {
            card.classList.add("high-priority");
        }

        if (task.status === "completed") {
            card.classList.add("completed");
        }
       
        const title = document.createElement("h3");
        title.textContent = task.name;

        const status = document.createElement("p");
        status.textContent = `Status: ${task.status}`

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${task.priority}`;

        const completeButton = document.createElement("button");
        completeButton.classList.add("btn");
        completeButton.textContent = task.status === "pending" ? "Complete" : "Undo";
        completeButton.addEventListener("click", () => {
            // completeTask(task.name);
            toggleTask(task.id);
        })

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        })

        card.append(
            title,
            status,
            priority,
            completeButton,
            deleteButton
        );

        app?.append(card);
    }

    
    
}

renderTasks();

