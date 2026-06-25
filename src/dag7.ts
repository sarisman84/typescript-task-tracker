

const title = document.querySelector("#title") as HTMLHeadingElement;
title.textContent = "Mina Tasks";

const app = document.querySelector("#app");


type Task = {
    name: string;
    status: "pending" | "completed";
    priority: "low" | "medium" | "high";
};

const tasks: Task[] = [
    {
        name: "Träna",
        status: "pending",
        priority: "high"
    },
    {
        name: "Handla",
        status: "completed",
        priority: "low"
    }
];

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
       
        const title = document.createElement("h3");
        title.textContent = task.name;

        const status = document.createElement("p");
        status.textContent = `Status: ${task.status}`

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${task.priority}`;

        const completeButton = document.createElement("button");
        completeButton.classList.add("btn");
        completeButton.textContent = "Complete";

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.textContent = "Delete";

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

