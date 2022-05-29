import React from "react";
import "../../styles/button.scss";
import "./DatePicker.scss"
import { PDate, ShowMode } from "../../types";
import PickButton from "../PickButton";
import {ReactComponent as ArrowRight} from '../../assets/icons/icon-arrow-right.svg';
import Quick from "../Quick";
import {ReactComponent as RefreshIcon} from "../../assets/icons/icon-refresh.svg"
import PickPopup from "../PickPopup";

interface DatePickerProps {
  start: PDate;
  end: PDate;
  onDateChange: (start: PDate, end: PDate) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({start, end, onDateChange}) => {
  const [startDate, setStartDate] = React.useState<PDate>(new Date(start));
  const [endDate, setEndDate] = React.useState<PDate>(new Date(end));
  const [showPick, setShowPick] = React.useState<ShowMode>(ShowMode.ShowNone);

  const handleDateChange = React.useCallback(() => {
    onDateChange(startDate, endDate);
  }, [onDateChange, startDate, endDate]);

  return (
    <div className="date-picker">
      <div className="date-picker__controls">
        <div className="date-picker__picker">
          <div className="date-picker__quick">
            <Quick />
          </div>
          <div className="date-picker__ranges">
            <PickButton initDate={startDate} onClick={() => setShowPick(ShowMode.ShowStart)}/>
            <ArrowRight className="date-picker__arrow" width={16} height={16}/>
            <PickButton initDate={endDate} onClick={() => setShowPick(ShowMode.ShowEnd)}/>
          </div>
        </div>
        <div className="date-picker__update">
          <button className="date-picker__update-button button button--icon button--gray" type="button" aria-label="Refresh" onClick={handleDateChange}>
            <RefreshIcon width={16} height={16}/>
          </button>
        </div>
      </div>
      {
        showPick !== ShowMode.ShowNone &&
        <>
          <div className="date-picker__popups">
            {
              showPick === ShowMode.ShowStart
                ? <PickPopup date={startDate} onDateSet={setStartDate} onClose={() => setShowPick(ShowMode.ShowNone)} />
                : <PickPopup date={endDate} onDateSet={setEndDate} onClose={() => setShowPick(ShowMode.ShowNone)} />
            }
          </div>
          <div className={`date-picker__pointer${showPick === ShowMode.ShowEnd ? " date-picker__pointer--right": ""}`}>
          </div>
        </>
      }
    </div>
  )
}

export default DatePicker;
