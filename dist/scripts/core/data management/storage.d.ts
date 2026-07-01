import type { Status } from "../types.js";
declare const storageUtils: {
    tryBindingData<TValue>(key: string, obj: TValue): Status;
    bindData<TValue>(key: string, obj: TValue): void;
    saveDataToStorage(): Status;
    loadDataFromStorage(): Status;
    clearStorage(): void;
};
export default storageUtils;
//# sourceMappingURL=storage.d.ts.map