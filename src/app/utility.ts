export const HTML = {
  createElement(type: string, classList: string[] = []): HTMLElement {
    const element = document.createElement(type);
    element.classList.add(...classList); // Add all classes to the element
    return element;
  },

  createDropdown(
    classList: string[] = [],
    options: string[],
    selectedValue: string = "",
    onChange: (value: string) => void,
  ): HTMLSelectElement {
    const select: HTMLSelectElement = document.createElement("select");
    select.classList.add(...classList);
    select.value = selectedValue ?? options[0] ?? "";

    options.forEach((value) => {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = value;
      option.textContent = value;

      select.append(option);
    });

    select.addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      if (!target.selectedOptions.length) return;
      if (!target.selectedOptions[0]) return;

      onChange?.(target.selectedOptions[0].text);
    });

    return select;
  },
};

export const Utility = {
  isNullOrEmpty(value: string): boolean {
    return value === null || value === undefined || value.trim() === "";
  },
};
