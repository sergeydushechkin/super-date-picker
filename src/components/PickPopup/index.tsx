import React from "react";
import "./PickPopup.scss";
import { PDate } from "../../types";
import Calendar from "../Calendar";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Now from "../Now";

interface PickPopupProps {
  date: PDate;
  onDateSet: (date: PDate) => void;
  onClose: () => void;
}

enum ShowTab {
  Absolute,
  Relative,
  Now
}

const PickPopup: React.FC<PickPopupProps> = ({date, onDateSet, onClose}) => {
  const [tab, setTab] = React.useState<ShowTab>(ShowTab.Absolute);
  const ref = React.useRef<HTMLDivElement>(null)

  useOnClickOutside(() => onClose(), [ref]);

  return (
    <div ref={ref} className="pick-popup">
      <ul className="pick-popup__tabs">
        <li className="pick-popup__item">
          <button className={`button pick-popup__button${tab === ShowTab.Absolute ? " pick-popup__button--active" : ""}`} type="button" onClick={() => setTab(ShowTab.Absolute)}>Absolute</button>
        </li>
        <li className="pick-popup__item">
          <button className={`button pick-popup__button${tab === ShowTab.Relative ? " pick-popup__button--active" : ""}`} type="button" onClick={() => setTab(ShowTab.Relative)}>Relative</button>
          </li>
        <li className="pick-popup__item">
          <button className={`button pick-popup__button${tab === ShowTab.Now ? " pick-popup__button--active" : ""}`} type="button" onClick={() => setTab(ShowTab.Now)}>Now</button>
          </li>
      </ul>
      <div className="pick-popup__tab-container">
        {tab === ShowTab.Absolute && <Calendar date={date} onDateSet={onDateSet}/>}
        {tab === ShowTab.Relative && <div></div>}
        {tab === ShowTab.Now && <Now onClick={() => onDateSet(new Date())} />}
      </div>
    </div>
  )
}

export default PickPopup;
