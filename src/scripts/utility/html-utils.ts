import type { HTMLTag } from "./html-tag.js";
import stringUtils from "./string-utils.js";

export interface HTMLContextMenuOption {
  name: string;
  selectEvent: () => void;
}
export interface HTMLContextMenu extends HTMLElement {}

export const htmlUtils = {
  /**
   * Creates a new DOM element of the specified type with the given CSS classes.
   *
   * @param type - The tag name of the element to create (e.g., 'div', 'span', 'button').
   * @param classList - An optional array of CSS class names to apply to the element.
   * @returns The newly created HTMLElement, cast to the specified type T.
   */
  createElement<T extends HTMLElement>(
    type: HTMLTag,
    classList: string[] = [],
  ): T {
    const element: T = document.createElement(type) as T;
    if (!element) {
      throw new Error(`Failed to create element of type ${type}`);
    }
    if (classList && classList.length > 0) {
      element.classList.add(...classList); // Add all classes to the element
    }
    return element;
  },

  createForm(classList: string[] = []): HTMLElement {
    return this.createElement("form", classList);
  },

  createInput(classList: string[] = []): HTMLInputElement {
    return this.createElement("input", classList);
  },

  /**
   * Creates a dropdown (select) element with the given options and change handler.
   *
   * @param classList - An optional array of CSS class names to apply to the select element.
   * @param options - An array of strings representing the available options in the dropdown.
   * @param selectedValue - The value to initially select. Defaults to the first option if not provided or empty.
   * @param onChange - A callback function invoked when the user selects a different option. Receives the selected value as its argument.
   * @returns The newly created HTMLSelectElement with the specified options and change listener.
   */
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

  createContextMenu(
    options: HTMLContextMenuOption[],
    id: string = "",
    classList: { button: string[]; menu: string[]; options: string[] },
  ): HTMLButtonElement {
    const menu: HTMLUListElement = htmlUtils.createElement("ul", [
      "context-menu",
      ...classList.menu,
    ]);
    {
      const liElements: HTMLLIElement[] = options.map(
        (option: HTMLContextMenuOption) => {
          const element: HTMLLIElement = htmlUtils.createElement("li");
          const button: HTMLButtonElement = htmlUtils.createElement("button", [
            "context-menu__option-button",
            ...classList.options,
          ]);

          element.id = stringUtils.toLower(option.name);
          button.id = "context-menu__menu__option-button";

          button.addEventListener("click", () => {
            option.selectEvent();
            menu.setAttribute("data-state", "close");
          });

          element.append(button);
          return element;
        },
      );

      menu.append(...liElements);

      const button: HTMLButtonElement = htmlUtils.createElement("button", [
        "context-menu__button",
        ...classList.button,
      ]);
      {
        button.id = stringUtils.isStringNullOrEmpty(id)
          ? "context-menu__button"
          : id;
        button.addEventListener("click", () => {
          menu.setAttribute("data-state", "open");
        });
        button.append(menu);
      }

      return button;
    }
  },
};
