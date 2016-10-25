// Missing in Flow
declare class SVGElement extends HTMLElement {
}

// Missing targetTouches
declare class TouchEvent2 extends TouchEvent {
  changedTouches: TouchList;
  targetTouches: TouchList;
};

declare type MouseTouchEvent = MouseEvent & TouchEvent2;
