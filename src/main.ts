
// console.log("========================");
// console.log("TASK TRACKER!");
// console.log("========================");

// const tasks = [
//     "Lära oss TS",
//     "Träna",
//     "Handla",
//     "Tvätta",
//     "Plugga",
//     "Borsta tänderna"
// ];

// for (let i = 0; i < tasks.length; i++) {
//     console.log(`${i +1}: ${tasks[i]}`);
// }

// console.log(`Antal uppgifter: ${tasks.length} st`);



// function showTasks(): void {
//     tasks.forEach(task => {
//         console.log(task);
//     })
// }

// function showStatistics():void {
//     console.log(`Antal uppgifter: ${tasks.length}`);
// }

// function addTask(taskName: string):void {
//     tasks.push(taskName);
// }

// showHeader();
// showTasks();
// showStatistics();
// addTask("Gå ut med hunden");
// addTask("Gå och lägga oss");
// showTasks();
// showStatistics();


type Task = {
    name: string;
    completed: boolean;
    priority: number;
    description?: string;
}


const tasks: Task[] = [
    {
        name: "Diska",
        completed: false,
        priority: 2
    },
    {
        name: "Träna",
        completed: false,
        priority: 3,
        description: "Spring 5km"
    },
    {
        name: "Handla",
        completed: true,
        priority: 4,
        description: "3l mjölk"
    }
];


function showHeader(): void {
    console.log("========================");
    console.log("TASK TRACKER!");
    console.log("========================");
}


function addTask(task: Task) {
    tasks.push(task);
}

function showTasks() {
    // const taskNames = tasks.map(task => task.name);
    // console.log(taskNames);

    tasks.forEach(task => {
        console.log(task.name, task.completed);
    })
}

function showTask(task: Task | undefined) {
    console.log(task?.name);
}

function showPendingTasks() {
    for (const task of tasks) {
        if (!task.completed) {
            console.log(task.name);
        }
    }
}

function showCompletedTasks() {
    for (const task of tasks) {
        if (task.completed) {
            console.log(task.name);
        }
    }
}

function completeTask(taskName: string) {
    for (const task of tasks) {
        if (task.name === taskName) {
            task.completed = true;
        }
    }
}

function showStatistics() {
    let completed = 0;
    let pending = 0;
    for (const task of tasks) {
        if (task.completed) {
            completed++;
        } else {
            pending++;
        }
    }

    console.log(`Completed: ${completed}, Pending: ${pending}`);
}

showHeader();
addTask({
    name: "Gå ut med hunden",
    completed: false,
    priority: 5
});
showTasks();
showTask(tasks[0]);
console.log("Pending:");
showPendingTasks();
console.log("Completed:");
showCompletedTasks();
console.log("Completed task:");
completeTask("Diska");
showCompletedTasks();
showStatistics();
