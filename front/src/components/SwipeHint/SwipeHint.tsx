import React from "react";

import SwipeLeftIcon from "../../assets/swipe-left.svg";
import SwipeRightIcon from "../../assets/swipe-right.svg";

import "./style.scss";
import { literalContent } from "../../constants";
import { observer } from "mobx-react";
import { appViewStore } from "../../stores/app.store";

export const SwipeHint = observer(() => {
  const { language } = appViewStore;

  return (
    <div className="swipe-hint">
      <img src={SwipeLeftIcon} alt="Swipe Left" className="swipe-icon left" />
      {literalContent.swipeToSeeMore[language]}
      <img
        src={SwipeRightIcon}
        alt="Swipe Right"
        className="swipe-icon right"
      />
    </div>
  );
});
