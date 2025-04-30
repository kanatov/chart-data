import { ReactNode } from "react";
import { useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import "./DatePicker.css";
import { useFilterContext } from "../Context/FilterContext";
import { type IDateRange } from "../lib/types";

interface IDatePicker {
  children: ReactNode;
  name: keyof IDateRange;
}

export default function DatePicker({ children, name }: IDatePicker) {
  const { filter, setDateRange } = useFilterContext();
  const [value, setValue] = useState<Dayjs>(dayjs(filter.dateRange[name]));

  useEffect(() => {
    setValue(dayjs(filter.dateRange[name]));
  }, [filter]);

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDateRange({
        ...filter.dateRange,
        [name]: newValue.format("YYYY-MM-DD"),
      });
    }
  };

  return (
    <div className="date-picker">
      {children}
      <MUIDatePicker
        value={value}
        onChange={handleChange}
        slots={{
          openPickerIcon: () => <CalendarTodayIcon sx={{ width: "16px" }} />,
        }}
        slotProps={{
          textField: {
            size: "small",
            margin: "none",
            name,
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
