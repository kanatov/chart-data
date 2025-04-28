import ToggleGroup from "../ToggleGroup/ToggleGroup";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import "./Filter.css";

export default function Filter() {
  return (
    <search className="filter">
      <DateRangePicker />
      <ToggleGroup
        options={[
          { label: "Downloads", value: "downloads" },
          { label: "Revenue", value: "revenue" },
        ]}
      />
    </search>
  );
}
