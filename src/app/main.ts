import {
  type Task,
  type TaskList,
  type Status,
  app,
  taskLists,
  tasks,
} from "./data.js";
import { renderDefaultState, renderTasks } from "./render.js";
import {
  createTaskList,
  createTask,
  type CreateTaskListDesc,
  type CreateTaskDesc,
} from "./tasktracker.js";

renderDefaultState(true);

// Example usage
// Generate a large set of tasks and task lists

// Create multiple task lists
// const listNames = ["Backlog", "To-Do", "Doing", "Done"];

// listNames.forEach((name) => {
//   const desc: CreateTaskListDesc = {
//     app,
//     taskLists,
//     tasks,
//     name,
//   };

//   createTaskList(desc);
// });

// const taskDescriptions = [
//   "Gather information from reliable sources",
//   "Complete the final draft of the report",
//   "Set up a meeting with team members",
//   "Purchase necessary items for the week",
//   "Create slides for the presentation",
//   "Follow up on project requirements",
//   "Update resume and LinkedIn profile",
//   "Research destinations and book accommodations",
//   "Enroll in online course or tutorial",
//   "Sort through old documents and files",
// ];

// const taskAmount = 15; // Number of tasks to create

// // Create a number of tasks
// for (let i = 0; i < taskAmount; i++) {
//   const listId = Math.floor(Math.random() * taskLists.length) + 1;
//   const description = `${taskDescriptions[Math.floor(Math.random() * taskDescriptions.length)]} ${i + 1}.`;

//   // Determine status based on list name
//   let status: Status = "pending";
//   switch (listId) {
//     case 4: // Done list
//       status = "completed";
//       break;
//     case 3: // Doing list
//       status = "in-progress";
//       break;
//     case 1:
//     case 2: // Backlog or To-Do list
//       status = "pending";
//       break;
//     default:
//       status = "pending";
//   }

//   const createTaskDesc: CreateTaskDesc = {
//     app,
//     taskLists,
//     tasks,
//     description,
//     status,
//     listId,
//   };
//   createTask(createTaskDesc);
// }
