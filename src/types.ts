type PDate = Date;

enum ShowMode {
  ShowStart,
  ShowEnd,
  ShowNone
}

interface DayData {
  day: Date;
  isThisMonth: boolean;
}

export type {PDate, DayData};
export {ShowMode};
