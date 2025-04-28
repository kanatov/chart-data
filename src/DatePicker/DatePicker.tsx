import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import "./DatePicker.css";
export default function DatePicker({ children }) {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2020-01-01"));
  return (
    <div className="date-picker">
      {children}
      <MUIDatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slots={{
          openPickerIcon: () => <CalendarTodayIcon sx={{ width: "16px" }} />,
        }}
        slotProps={{
          textField: {
            size: "small",
            margin: "none",
            name: "start",
            sx: {
              ".MuiPickersOutlinedInput-root": {
                padding: 0,
                paddingLeft: ".5rem",
                fontSize: "inherit",
              },
              ".MuiPickersInputBase-sectionsContainer": {
                padding: 0,
                paddingTop: "0.2rem",
                width: "fit-content",
              },
              ".MuiIconButton-root": {
                padding: ".5rem",
                margin: 0,
              },
            },
          },
        }}
      />
    </div>
  );
}
