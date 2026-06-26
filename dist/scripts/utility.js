export const HTML = {
    createElement(type, classList = []) {
        const element = document.createElement(type);
        element.classList.add(...classList); // Add all classes to the element
        return element;
    },
    createDropdown(classList = [], options, selectedValue = "", onChange) {
        const select = document.createElement("select");
        select.classList.add(...classList);
        select.value = selectedValue ?? options[0] ?? "";
        options.forEach((value) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.append(option);
        });
        select.addEventListener("change", (event) => {
            const target = event.target;
            if (!target.selectedOptions.length)
                return;
            if (!target.selectedOptions[0])
                return;
            onChange?.(target.selectedOptions[0].text);
        });
        return select;
    },
};
export const Utility = {
    isNullOrEmpty(value) {
        return value === null || value === undefined || value.trim() === "";
    },
};
//# sourceMappingURL=utility.js.map