import "./DateRangePicker.css";
import DatePicker from "../DatePicker/DatePicker";

export default function DateRangePicker() {
  return (
    <div className="date-range-picker">
      <DatePicker name="start">Start Date:</DatePicker>
      <DatePicker name="end">End Date:</DatePicker>
    </div>
  );
}
