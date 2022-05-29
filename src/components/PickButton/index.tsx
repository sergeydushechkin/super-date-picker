import React from "react";
import "../../styles/button.scss";
import "./PickButton.scss";
import { PDate } from "../../types";

interface PickButtonProps {
  initDate: PDate;
  onClick: () => void;
}

const PickButton: React.FC<PickButtonProps> = ({initDate, onClick}) => {
  return (
    <button className="button pick-button" type="button" aria-label="Pick Date" onClick={onClick}>{initDate.toLocaleString()}</button>
  )
}

export default PickButton;
