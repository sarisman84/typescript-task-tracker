import { htmlUtils } from "../utility/html/html-utils.js";
import storageUtils from "./data management/storage.js";
import { refreshAppRender } from "./render.js";
/**
 * Array to store all tasks.
 */
export const tasks = storageUtils.createBindingData("app/tasks", () => []);
export const taskLists = storageUtils.createBindingData("app/taskLists", () => []);
export const app = htmlUtils.getElementById("app");
export const pageRoot = htmlUtils.getElementById("page-root");
export const runtime = {
    saveDataAndRefreshAppRenderer() {
        console.log("[Log][Runtime/saveAndRefreshAppRender]: Saving data and refreshing app render..."); // Debug log
        storageUtils.saveDataToStorage();
        refreshAppRender();
    },
    refreshAppRender() {
        console.log("[Log][Runtime/refreshAppRender]: Refreshing app render..."); // Debug log
        refreshAppRender();
    },
    saveAppData() {
        console.log("[Log][Runtime/saveAppData]: Saving app data..."); // Debug log
        storageUtils.saveDataToStorage();
    },
};
//# sourceMappingURL=runtime.js.map