import { MatDateFormats } from '@angular/material/core';

export const dateFormatsFactory = (
  dateFormat: string
): Readonly<MatDateFormats> => {
  return {
    parse: {
      dateInput: dateFormat,
    },
    display: {
      dateInput: dateFormat,
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
};
