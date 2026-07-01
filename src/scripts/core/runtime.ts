import { htmlUtils } from "../utility/html/html-utils.js";
import type { TaskList } from "./data management/list-data.js";
import storageUtils from "./data management/storage.js";
import type { Task } from "./data management/task-data.js";
import { refreshAppRender } from "./render.js";
import type { Bindable } from "./types.js";

/**
 * Array to store all tasks.
 */
export const tasks: Bindable<Task[]> = storageUtils.createBindingData(
  "app/tasks",
  () => [] as Task[],
);
export const taskLists: Bindable<TaskList[]> = storageUtils.createBindingData(
  "app/taskLists",
  () => [] as TaskList[],
);
export const app: HTMLDivElement | null = htmlUtils.getElementById("app");
export const pageRoot: HTMLElement | null =
  htmlUtils.getElementById("page-root");

export const runtime = {
  saveDataAndRefreshAppRenderer(): void {
    console.log(
      "[Log][Runtime/saveAndRefreshAppRender]: Saving data and refreshing app render...",
    ); // Debug log

    storageUtils.saveDataToStorage();
    refreshAppRender();
  },

  refreshAppRender(): void {
    console.log("[Log][Runtime/refreshAppRender]: Refreshing app render..."); // Debug log
    refreshAppRender();
  },

  saveAppData(): void {
    console.log("[Log][Runtime/saveAppData]: Saving app data..."); // Debug log
    storageUtils.saveDataToStorage();
  },
};
