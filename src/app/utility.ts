export function createElement(
  type: string,
  classList: string[] = [],
): HTMLElement {
  const element = document.createElement(type);
  element.classList.add(...classList); // Add all classes to the element
  return element;
}


