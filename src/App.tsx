import React from 'react';
import './App.scss';
import DatePicker from './components/DatePicker';
import { PDate } from './types';

function App() {
  const [start, setStart] = React.useState<PDate>(new Date());
  const [end, setEnd] = React.useState<PDate>(new Date());

  const handleTimeChange = React.useCallback((startDate: PDate, endDate: PDate) => {
    setStart(startDate);
    setEnd(endDate);
  }, []);

  return (
    <div className="app">
      <div className='app__container'>
        <div className='app__result'>
          <p>
            {`Start date: ${start.toString()}`}
          </p>
          <p>
            {`End date: ${end.toString()}`}
          </p>
        </div>
        <div className="app__datepicker">
          <DatePicker start={start} end={end} onDateChange={handleTimeChange}/>
        </div>
      </div>
    </div>
  );
}

export default App;
