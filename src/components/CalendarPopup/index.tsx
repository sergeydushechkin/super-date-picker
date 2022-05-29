import React from "react";
import "./CalendarPopup.scss"

interface CalendarPopupProps {
  items: string[] | number[];
  onClick: (item: number) => void;
  activeItem?: number;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({items, onClick, activeItem = 0}) => {
  return (
    <ul className={`calendar-popup${items.length === 48 ? " calendar-popup--wide" : ""}`}>
      {
        items.length && items.map((item, index) =>
          <li className="calendar-popup__item" key={item}>
            <button
              className={`button button--calendar-popup calendar-popup__button${index === activeItem ? " calendar-popup__button--active" : ""} `}
              type="button"
              onClick={() => onClick(index)}
            >
              {item}
            </button>
          </li>
        )
      }
    </ul>
  )
}

export default CalendarPopup;
