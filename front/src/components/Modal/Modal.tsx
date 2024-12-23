import React, { FC, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./style.scss";
import closeIcon from "@/assets/close-icon.svg";

import { ReactPortal } from "../ReactPortal";

import type { ModalProps } from "./types";

export const Modal: FC<ModalProps> = (props) => {
  const {
    title,
    isOpen,
    onClose,
    onAfterOpen,
    onAfterClose,
    children,
    customModalWrapperId = "react-portal-modal-container",
  } = props;

  useEffect(() => {
    if (isOpen && onAfterOpen) {
      onAfterOpen();
    }
    const rootEl = document.querySelector("#root");
    const className = "open-modal";
    if (isOpen) {
      rootEl?.classList.add(className);
    } else {
      rootEl?.classList.remove(className);
    }
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  return (
    <ReactPortal wrapperId={customModalWrapperId}>
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 300 }}
        unmountOnExit
        onExited={onAfterClose}>
        {(state) => {
          return (
            <div className={`modal-wrapper ${state === "entering" || state === "entered" ? "fade-in" : ""}`} onClick={onClose}>
              <div className={`modal-content ${state === "entering" || state === "entered" ? "fade-in" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <div className="modal-header">
                  <div className="modal-close-button" onClick={onClose}>
                    <img src={closeIcon} alt="Close Icon" />
                  </div>
                  <div className="modal-title">{title}</div>
                </div>
                <div>{children}</div>
              </div>
            </div>
          );
        }}
      </CSSTransition>
    </ReactPortal>
  );
};
