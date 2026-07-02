const boundDataRegistry = {};
const storageUtils = {
    createBindingData(key, value) {
        boundDataRegistry[key] ??= { value: value() };
        console.log(`[Log][Storage/createBindingData]: Created binding data -> ${boundDataRegistry[key]}`);
        return boundDataRegistry[key];
    },
    saveDataToStorage() {
        if (Object.keys(boundDataRegistry).length === 0) {
            console.warn("[Warn][Storage/saveDataToStorage]: No data bound to storage, skipping save operation.");
            return 204; // No Content
        }
        console.log("[Log][Storage/saveDataToStorage]: Saving data to storage..."); // Debug log
        Object.keys(boundDataRegistry).forEach((key) => {
            localStorage.setItem(key, JSON.stringify(boundDataRegistry[key]?.value));
        });
        console.log("[Log][Storage/saveDataToStorage]: Data saved to storage successfully."); // Debug log
        return 200; // OK
    },
    loadDataFromStorage() {
        if (localStorage.length === 0) {
            console.log("[Log][Storage/loadDataFromStorage]: No data found in storage."); // Debug log
            return 204;
        }
        console.log("[Log][Storage/loadDataFromStorage]: Loading data from storage..."); // Debug log
        Object.keys(boundDataRegistry).forEach((key) => {
            const data = localStorage.getItem(key);
            if (data && boundDataRegistry[key]) {
                boundDataRegistry[key].value = JSON.parse(data);
                console.log(`[Log][Storage/loadDataFromStorage]: Loaded data for ${key} to:`); // Debug log
                console.table(boundDataRegistry[key].value); // Debug log
            }
        });
        console.log("[Log][Storage/loadDataFromStorage]: Data loaded from storage successfully."); // Debug log
        return 200;
    },
    clearStorage() {
        console.log("[Log][Storage/clearStorage]: Clearing storage..."); // Debug log
        localStorage.clear();
        Object.keys(boundDataRegistry).forEach((key) => {
            delete boundDataRegistry[key];
        });
        console.log("[Log][Storage/clearStorage]: Storage cleared successfully."); // Debug log
    },
};
export default storageUtils;
//# sourceMappingURL=storage.js.map