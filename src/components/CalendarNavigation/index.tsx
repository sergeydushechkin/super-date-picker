import React from "react";
import "./CalendarNavigation.scss"
import {ReactComponent as ArrowUpIcon} from "../../assets/icons/icon-up-arrow.svg";
import { PDate } from "../../types";
import { NumToMonth } from "../../const";
import { addZero } from "../../utils";

interface CalendarNavigationProps {
  date: PDate;
  onChange: (date: PDate) => void;
  onMonthClick: () => void;
  onYearClick: () => void;
  onTimeClick: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({date, onChange, onMonthClick, onYearClick, onTimeClick}) => {

  const changeMonth = (shift: number) => {
    date.setMonth(date.getMonth() + shift)
    onChange(date);
  };

  return (
    <div className="calendar-navigation">
      <div className="calendar-navigation__controls">
        <button type="button" aria-label="Previous" className="calendar-navigation__button button" onClick={() => changeMonth(-1)}>
          <ArrowUpIcon width={16} height={16}/>
        </button>
        <div className="calendar-navigation__group">
          <button type="button" aria-label="Month" className="calendar-navigation__month-button button button--blue" onClick={() => onMonthClick()}>{NumToMonth[date.getMonth()]}</button>
          <button type="button" aria-label="Year" className="calendar-navigation__year-button button button--blue" onClick={() => onYearClick()}>{date?.getFullYear()}</button>
          <button type="button" aria-label="Time" className="calendar-navigation__time-button button button--blue" onClick={() => onTimeClick()}>{`${addZero(date?.getHours())}:${addZero(date?.getMinutes())}`}</button>
        </div>
        <button type="button" aria-label="Next" className="calendar-navigation__button calendar-navigation__button--next button" onClick={() => changeMonth(1)}>
          <ArrowUpIcon width={16} height={16}/>
        </button>
      </div>
    </div>
  );
}

export default CalendarNavigation;
