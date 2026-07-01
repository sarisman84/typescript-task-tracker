import type { Bindable, Status } from "../types.js";
declare const storageUtils: {
    createBindingData<T>(key: string, value: () => T): Bindable<T>;
    saveDataToStorage(): Status;
    loadDataFromStorage(): Status;
    clearStorage(): void;
};
export default storageUtils;
//# sourceMappingURL=storage.d.ts.map