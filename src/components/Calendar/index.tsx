import React from "react";
import "./Calendar.scss";
import { PDate } from "../../types";
import { compareDates, getHoursByIndex, getHoursTable, getIndexByHours, getMonthTable, getYearsTable } from "../../utils";
import CalendarNavigation from "../CalendarNavigation";
import CalendarPopup from "../CalendarPopup";
import { MonthsNames } from "../../const";

enum ShowCalendarPopupMode {
  Years,
  Months,
  Time,
  None
}

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

interface CalendarProps {
  date: PDate;
  onDateSet: (date: PDate) => void;
}

const Calendar: React.FC<CalendarProps> = ({date: currentDate, onDateSet}) => {

  const date = new Date(currentDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const today = new Date();
  const activeCell = date;

  const [showPopup, setShowPopup] = React.useState<ShowCalendarPopupMode>(ShowCalendarPopupMode.None);
  const monthTable = React.useMemo(() => getMonthTable(year, month, hours, minutes), [year, month, hours, minutes]);
  const yearsTable = React.useMemo(() => getYearsTable(year), [year]);
  const hoursTable = React.useMemo(() => getHoursTable(), []);

  const handleYearClick = (index: number) => {
    date.setFullYear(yearsTable[index]);
    setShowPopup(ShowCalendarPopupMode.None);
    onDateSet(date);
  };

  const handleMonthClick = (index: number) => {
    date.setMonth(index);
    setShowPopup(ShowCalendarPopupMode.None);
    onDateSet(date);
  };

  const handleTimeClick = (index: number) => {
    const time = getHoursByIndex(index);
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    setShowPopup(ShowCalendarPopupMode.None);
    onDateSet(date);
  };

  return (
    <div className="calendar">
      <div className="calendar__date">
        <div>
          <CalendarNavigation
            date={date}
            onChange={onDateSet}
            onMonthClick={() => setShowPopup(ShowCalendarPopupMode.Months)}
            onYearClick={() => setShowPopup(ShowCalendarPopupMode.Years)}
            onTimeClick={() => setShowPopup(ShowCalendarPopupMode.Time)}
          />
        </div>
        <table className="calendar__grid">
          <thead>
            <tr className="calendar__row calendar__row--header">
              {
                daysOfWeek.map((item, index) =>
                  <th className = "calendar__cell" key={index}>{item}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              monthTable.map((week, index) =>
                <tr className="calendar__row" key={index}>
                  {
                    week.map((dayCell, index) => {
                      const {day, isThisMonth} = dayCell;
                      const className = "calendar__cell-button" +
                        (!isThisMonth ? " calendar__cell-button--other-month" : "") +
                        (compareDates(day, today) ? " calendar__cell-button--today" : "") +
                        (compareDates(day, activeCell) ? " calendar__cell-button--active" : "");

                      return (
                        <td className="calendar__cell" key={index}>
                          <button
                            type="button"
                            className={className}
                            onClick={() => onDateSet(day)}
                          >
                            {day.getDate()}
                          </button>
                        </td>
                      );
                    })
                  }
                </tr>
              )
            }
          </tbody>
        </table>
        <div className={`calendar__popup${showPopup === ShowCalendarPopupMode.None ? "calendar__popup--hide" : ""}`}>
          {
            showPopup === ShowCalendarPopupMode.Years && (
                  <CalendarPopup
                    items={yearsTable}
                    onClick={handleYearClick}
                    activeItem={7}
                  />
            )
          }
          {
            showPopup === ShowCalendarPopupMode.Months && (
                  <CalendarPopup
                    items={MonthsNames}
                    onClick={handleMonthClick}
                    activeItem={month}
                  />
            )
          }
          {
            showPopup === ShowCalendarPopupMode.Time && (
                  <CalendarPopup
                    items={hoursTable}
                    onClick={handleTimeClick}
                    activeItem={getIndexByHours(hours, minutes)}
                  />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Calendar;
