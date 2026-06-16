
type Task = {
    name: string;
    priority: number;
    completed: boolean;
}

const tasks : Task[] = [
    {
        name: "Learn TypeScript",
        priority: 1,
        completed: false
    },
    {
        name: "Walk the dog",
        priority: 1,
        completed: true
    },
    {
        name: "Cook dinner",
        priority: 2,
        completed: false
    }
];


function printTasks(tasks: Task[]): void {
    console.log("Task List:");
    tasks.forEach(task => {
        console.log(`
            Task: ${task.name}
            - Priority: ${task.priority}
            - Completed: ${task.completed}
            `
        );
    });
}

function countCompletedTasks(tasks: Task[]): number {
    return tasks.filter(task => task.completed).length;
}

console.log(`Completed Tasks: ${countCompletedTasks(tasks)}`);
printTasks(tasks);