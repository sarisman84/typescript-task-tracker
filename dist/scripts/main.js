import { createTaskList } from "./core/data management/list-data.js";
import storageUtils from "./core/data management/storage.js";
import { pageRoot, runtime } from "./core/runtime.js";
function initializeApp() {
    console.log("[Log][Main/initializeApp]: Initializing application..."); // Debug log
    // Load data from storage
    if (storageUtils.loadDataFromStorage() !== 200) {
        initializeEmptyBoard();
    }
    runtime.refreshAppRender();
}
function initializeEmptyBoard() {
    createTaskList("Pending");
    createTaskList("In-progress");
    createTaskList("Completed");
    runtime.saveAppData();
}
initializeApp();
//# sourceMappingURL=main.js.map