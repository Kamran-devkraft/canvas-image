import React from "react";
import Styles from "../styles";
const Spacing = props => {
  const updateMargin = isIncr => {
    if (isIncr) props.changeMargin(props.margin + 1);
    else props.changeMargin(props.margin - 1);
  };
  return (
    <div>
      {/* This actually draws another image on top */}
      <span style={Styles.subHeading}>Draw Another Image By Changing Coordinate position</span>
      <button style={Styles.circleBtn} onClick={() => updateMargin(true)}>
        +
      </button>
      <span>{props.margin.toFixed(1)}&nbsp;</span>
      <button style={Styles.circleBtn} onClick={() => updateMargin(false)}>
        -
      </button>
    </div>
  );
};

export default Spacing;
