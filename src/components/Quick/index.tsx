import React from "react";
import "../../styles/button.scss";
import "./Quick.scss";
import {ReactComponent as CalendarIcon} from "../../assets/icons/icon-calendar.svg"

// interface QuickProps {
// }
/* <QuickProps> */
const Quick: React.FC = () => {

  return (
    <button className="button  button--icon quick" type="button" aria-label="Quick date">
      <CalendarIcon width={16} height={16}/>
    </button>
  )
}

export default Quick;
