import type { Status } from "../types.js";

const boundDataRegistry: { [id: string]: any } = {};

const storageUtils = {
  tryBindingData<TValue>(key: string, obj: TValue): Status {
    if (boundDataRegistry[key]) {
      console.warn(
        `[Warn][Storage/tryBindingData]: Key ${key} is already bound, skipping binding.`,
      );
      return 409;
    }
    this.bindData(key, obj);
    return 200;
  },
  bindData<TValue>(key: string, obj: TValue): void {
    boundDataRegistry[key] = obj;
  },
  saveDataToStorage(): Status {
    if (Object.keys(boundDataRegistry).length === 0) {
      console.warn(
        "[Warn][Storage/saveDataToStorage]: No data bound to storage, skipping save operation.",
      );
      return 204; // No Content
    }
    console.log("[Log][Storage/saveDataToStorage]: Saving data to storage..."); // Debug log

    Object.keys(boundDataRegistry).forEach((key: string) => {
      localStorage.setItem(key, JSON.stringify(boundDataRegistry[key]));
    });

    console.log(
      "[Log][Storage/saveDataToStorage]: Data saved to storage successfully.",
    ); // Debug log
    return 200; // OK
  },
  loadDataFromStorage(): Status {
    if (localStorage.length === 0) {
      console.log(
        "[Log][Storage/loadDataFromStorage]: No data found in storage.",
      ); // Debug log
      return 204;
    }

    console.log(
      "[Log][Storage/loadDataFromStorage]: Loading data from storage...",
    ); // Debug log

    Object.keys(boundDataRegistry).forEach((key: string) => {
      const data = localStorage.getItem(key);
      if (data) {
        boundDataRegistry[key] = JSON.parse(data);
      }
    });

    console.log(
      "[Log][Storage/loadDataFromStorage]: Data loaded from storage successfully.",
    ); // Debug log

    return 200;
  },
  clearStorage(): void {
    console.log("[Log][Storage/clearStorage]: Clearing storage..."); // Debug log

    localStorage.clear();
    Object.keys(boundDataRegistry).forEach((key: string) => {
      delete boundDataRegistry[key];
    });
    console.log("[Log][Storage/clearStorage]: Storage cleared successfully."); // Debug log
  },
};

export default storageUtils;
