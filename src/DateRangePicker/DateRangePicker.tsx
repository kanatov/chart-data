import "./DateRangePicker.css";
import DatePicker from "../DatePicker/DatePicker";

export default function DateRangePicker() {
  //2020-01-07
  return (
    <div className="date-range-picker">
      <DatePicker>Start Date:</DatePicker>
      <DatePicker>End Date:</DatePicker>
    </div>
  );
}
