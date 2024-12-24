import { PropsWithChildren } from "react";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

type ReactPortalProps = PropsWithChildren & {
  wrapperId: string;
};

export const ReactPortal = (props: ReactPortalProps) => {
  const { children, wrapperId = "react-portal-wrapper" } = props;
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let created = false;
    if (!element) {
      created = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (created && element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) {
    return null;
  }

  return createPortal(children, wrapperElement);
};
