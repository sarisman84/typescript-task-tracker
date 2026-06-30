

const title = document.querySelector("#title") as HTMLHeadingElement;
title.textContent = "Mina Tasks";

const app = document.querySelector("#app");

let nextId = 1;


const taskInput = document.querySelector("#task-input") as HTMLInputElement;

const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;

const form = document.querySelector("#task-form") as HTMLFormElement;

const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;


form.addEventListener("submit", handleSubmit);


function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const taskName = taskInput.value.trim();
    const priority = priorityInput.value as TaskPriority;

    const error = validateTaskName(taskName);

    if (error !== "") {
        errorMessage.textContent = error;
        return;
    }

    errorMessage.textContent = "";

    addTask(taskName, priority);
    renderTasks();
}


function validateTaskName(name: string): string {
    if (name === "") return "Task name is required"

    if (name.length < 3) {
        return "Task name must be at least 3 characters."
    }

    if (name.length > 40) {
        return "Task name cannot be longer than 40 characters."   
    }

    if (taskExists(name)) {
        return "Task name with that name already exists."
    }

    return "";
}


function taskExists(name: string): boolean {
    for (const task of tasks) {
        if (task.name.toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }

    return false;
}


function clearForm(): void {
    taskInput.value = "";
    priorityInput.value = "medium";
}


function addTask(name: string, priority: TaskPriority): void {
    const newTask: Task = {
        id: nextId,
        name,
        status: "pending",
        priority
    };

    tasks.push(newTask);
    nextId++;
    
    clearForm();
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

