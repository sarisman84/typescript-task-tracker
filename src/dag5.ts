
// const tasks = [
//     "Lära mig TypeScript",
//     "Träna",
//     "Handla"
// ];

// const task = "Lära mig TypeScript";
// const completed = false;
// const priority = 1;


// const task = {
//     name: "Lära mig TS",
//     completed: false,
//     priority: 1
// };

// console.log(task.name);
// console.log(task.completed);
// console.log(`Task: ${task.name}`);

// console.log(task);

// task.completed = true;

// console.log(task);

// const tasks = [
//     {
//         name: "Lära mig TS",
//         completed: false,
//         priority: 3
//     },
//     {
//         name: "Träna",
//         completed: true,
//         priority: 1
//     },
//     {
//         name: "Handla",
//         completed: false,
//         priority: 2
//     }
// ];

// for (const task of tasks) {
//     console.log(task.name, task.completed);
// }

// for (const task of tasks) {
//     if (!task.completed) {
//         console.log(task.name);
//     }
// }

// Typning av objekt

// type Task = {
//     name: string;
//     completed: boolean;
//     priority: number;
// }

// const task: Task = {
//     name: "Lära mig TS",
//     completed: false,
//     priority: 2
// };

// const tasks: Task[] = [
//     {
//         name: "Lära mig TS",
//         completed: false,
//         priority: 2
//     },
//     {
//         name: "Handla",
//         completed: true,
//         priority: 2
//     }
// ];

// function addTask(taskName: string, priority = 1): void {
//     tasks.push({
//         name: taskName,
//         completed: false,
//         priority: priority
//     });
// }

// console.log(tasks);
// addTask("Gå ut med hunden", 3);
// addTask("Diska");
// console.log(tasks);


// // .map()

// for (const task of tasks) {
//     console.log(task.name);
// }

// const taskNames = tasks.map(task => task.name);

// console.log(taskNames);


// tasks.forEach(task => {
//     console.log(task.name);
// })


// Optional Properties
// type Task = {
//     name: string;
//     completed: boolean;
//     description?: string;
// }

// const task: Task = {
//     name: "Träna",
//     completed: false,
//     description: "Spring 5km"
// };

// const task2: Task = {
//     name: "Diska",
//     completed: false
// }

// console.log(task.description);
// console.log(task2.description);


type Task = {
    name: string;
    completed: boolean;
    priority: number;
}

const tasks: Task[] = [
    {
        name: "Lära mig TS",
        completed: false,
        priority: 2
    },
    {
        name: "Handla",
        completed: true,
        priority: 2
    },
    {
        name: "Diska",
        completed: true,
        priority: 2
    }
];

function showTask(task: Task | undefined) {
    console.log(task?.name);
}

showTask(tasks[1]);