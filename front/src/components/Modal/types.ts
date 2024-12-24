import React, { PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title?: string;
  onClose(): void;
  onAfterOpen?(): void;
  onAfterClose?(): void;
  customModalWrapperId?: string;
}
