/**
 * Represents the status of a task.
 */
type Status = "pending" | "in-progress" | "completed";

/**
 * Represents a single task.
 */
type Task = {
  listId: number;
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
};

/**
 * Represents a task list.
 */
type TaskList = {
  id: number;
  name: string;
  createdAt: Date;
};

/**
 * Type for HTML elements that may be null.
 */
type HTMLElementOrNull = HTMLLIElement | HTMLDivElement | null;

/**
 * Array to store all tasks.
 */
const tasks: Task[] = [];

/**
 * Array to store all task lists.
 */
const taskLists: TaskList[] = [];

/**
 * The main application container element.
 */
const app: HTMLDivElement = document.getElementById("app") as HTMLDivElement;

/**
 * Tracks the next available task ID.
 */
let incrementedTaskId: number = 0;

/**
 * Tracks the next available list ID.
 */
let incrementedListId: number = 0;

/**
 * Creates a new task list with the specified name.
 * @param name - The name of the task list to create.
 */
function createTaskList(name: string): void {
  const taskList: TaskList = {
    id: ++incrementedListId,
    name,
    createdAt: new Date(),
  };
  taskLists.push(taskList);
  console.log(`Task list "${taskList.name}" created with ID: ${taskList.id}`);

  renderTasks();
}

/**
 * Creates a new task with the specified details.
 * @param title - The title of the task.
 * @param description - The description of the task.
 * @param listId - The ID of the list this task belongs to (default is 0).
 * @param status - The status of the task (default is "pending").
 */
function createTask(
  title: string,
  description: string,
  listId = 0,
  status = "pending" as Status,
): void {
  const task: Task = {
    listId,
    id: ++incrementedTaskId,
    title,
    description,
    status,
    createdAt: new Date(),
  };

  tasks.push(task);
  console.log(
    `Task "${task.title}" created with ID: ${task.id} in list ID: ${task.listId}`,
  );

  renderTasks();
}

function updateTaskStatus(taskId: number, newStatus: Status): void {
  const task: Task | undefined = tasks.find((t) => t.id === taskId);
  if (task === undefined) {
    console.error(`Task with ID ${taskId} not found`);
    return;
  }
  task.status = newStatus;
  renderTasks();
}

/**
 * Renders all tasks and task lists into the application container.
 */
function renderTasks(): void {
  app.innerHTML = ""; // Clear the app container before rendering
  taskLists.forEach((taskList: TaskList) => {
    const taskListElement: HTMLUListElement = renderList(taskList);
    const relatedTasks: Task[] = tasks.filter(
      (task) => task.listId === taskList.id,
    );

    relatedTasks.forEach((task: Task) => {
      renderRelatedTask(task, taskListElement);
    });

    app.appendChild(taskListElement);
  });
}

/**
 * Renders a single task list into an HTML element.
 * @param taskList - The task list to render.
 * @returns An HTMLUListElement representing the rendered task list.
 */
function renderList(taskList: TaskList): HTMLUListElement {
  const taskListElement: HTMLUListElement = document.createElement("ul");
  taskListElement.setAttribute("data-list-id", taskList.id.toString());
  taskListElement.classList.add("task-list"); // Add class for styling

  const listHeader: HTMLHeadingElement = document.createElement("h2");
  listHeader.textContent = taskList.name;
  taskListElement.appendChild(listHeader);

  console.log(`Rendering task list "${taskList.name}" with ID: ${taskList.id}`);
  return taskListElement;
}

/**
 * Renders a single task within a task list.
 * @param relatedTask - The task to render.
 * @param taskListElement - The HTML element representing the parent task list.
 */
function renderRelatedTask(
  relatedTask: Task,
  taskListElement: HTMLUListElement,
): void {
  const entryElement: HTMLLIElement = document.createElement("li");
  entryElement.classList.add("task"); // Add class for styling

  const titleElement: HTMLHeadingElement = document.createElement("h3");
  titleElement.textContent = relatedTask.title;
  titleElement.classList.add("task-title"); // Add class for styling

  const descriptionElement: HTMLParagraphElement = document.createElement("p");
  descriptionElement.textContent = relatedTask.description;
  descriptionElement.classList.add("task-description"); // Add class for styling

  const statusElement: HTMLSpanElement = document.createElement("span");
  statusElement.textContent = relatedTask.status;
  statusElement.classList.add("task-status");
  statusElement.setAttribute("data-type", relatedTask.status); // Add class for styling

  entryElement.append(titleElement, descriptionElement, statusElement);

  taskListElement.append(entryElement);
  console.log(
    `Task "${relatedTask.title}" added to list "${taskListElement.getAttribute("data-list-id")}"`,
  );
}

// Example usage
// Generate a large set of tasks and task lists

// Create multiple task lists
const listNames = ["Backlog", "To-Do", "Doing", "Done"];

listNames.forEach((name) => createTaskList(name));

// Generate tasks for each list
const taskTitles = [
  "Research topic",
  "Write report",
  "Schedule meeting",
  "Buy groceries",
  "Prepare presentation",
  "Call client",
  "Update portfolio",
  "Plan vacation",
  "Learn new skill",
  "Organize files",
];

const taskDescriptions = [
  "Gather information from reliable sources",
  "Complete the final draft of the report",
  "Set up a meeting with team members",
  "Purchase necessary items for the week",
  "Create slides for the presentation",
  "Follow up on project requirements",
  "Update resume and LinkedIn profile",
  "Research destinations and book accommodations",
  "Enroll in online course or tutorial",
  "Sort through old documents and files",
];

const taskAmount = 15; // Number of tasks to create

// Create a number of tasks
for (let i = 0; i < taskAmount; i++) {
  const listId = Math.floor(Math.random() * taskLists.length) + 1;
  const title = `${taskTitles[Math.floor(Math.random() * taskTitles.length)]} ${i + 1}`;
  const description = `${taskDescriptions[Math.floor(Math.random() * taskDescriptions.length)]} ${i + 1}.`;

  // Determine status based on list name
  let status: Status = "pending";
  switch (listId) {
    case 4: // Done list
      status = "completed";
      break;
    case 3: // Doing list
      status = "in-progress";
      break;
    case 1:
    case 2: // Backlog or To-Do list
      status = "pending";
      break;
    default:
      status = "pending";
  }

  createTask(title, description, listId, status);
}
