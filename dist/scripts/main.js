import { createTaskList } from "./core/data management/list-data.js";
import storageUtils from "./core/data management/storage.js";
import { runtime, taskLists, tasks } from "./core/runtime.js";
function initializeApp() {
    console.log("[Log][Main/initializeApp]: Initializing application..."); // Debug log
    storageUtils.clearStorage(); // Clear storage for testing purposes
    storageUtils.tryBindingData("app/tasks", tasks);
    storageUtils.tryBindingData("app/taskLists", taskLists);
    //storageUtils.tryBindingData("app/tags", [] as ContextMenuOption[]);
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