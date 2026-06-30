export {};
export interface HTMLElement {
    events: HTMLElementEvents;
}
export interface HTMLElementEvents {
    onClick(fn: EventListener): void;
    onInput(fn: EventListener): void;
    onChange(fn: EventListener): void;
    onKeyDown(fn: EventListener): void;
    onKeyUp(fn: EventListener): void;
    onFocus(fn: EventListener): void;
    onBlur(fn: EventListener): void;
}
//# sourceMappingURL=html-extensions.d.ts.map