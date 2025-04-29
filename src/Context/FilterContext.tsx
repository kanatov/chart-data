import { createContext, useContext, useState, ReactNode } from "react";
import useData from "../lib/useData";
import { type TSalesData, type TDateRange, EChartType } from "../lib/types";

const CHART = EChartType.Downloads;
const FILTER_RANGE = { start: "2020-01-01", end: "2020-01-07" };

interface IFilter {
  chart: EChartType;
  dateRange: TDateRange;
}

interface IFilterContext {
  filter: IFilter;
  filteredData: TSalesData[];
  setDateRange: (range: TDateRange) => void;
  setChart: (chart: EChartType) => void;
  loading: boolean;
}

interface IFilterProvider {
  children: ReactNode;
}
const FilterContext = createContext<IFilterContext | null>(null);

export function FilterProvider({ children }: IFilterProvider) {
  const [filter, setFilter] = useState<IFilter>({
    chart: CHART,
    dateRange: FILTER_RANGE,
  });

  const setDateRange = ({ start, end }: TDateRange) => {
    if (new Date(start) <= new Date(end)) {
      const newDateRange = { start, end };
      setFilter((prev) => ({ ...prev, dateRange: newDateRange }));
    }
  };

  const setChart = (chart: EChartType) => {
    setFilter((prev) => ({ ...prev, chart }));
  };

  const { data: rawData, loading } = useData();

  return (
    <FilterContext.Provider
      value={{ filter, setDateRange, setChart, filteredData: rawData, loading }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error("useFilterContext must be used within FilterProvider");
  return ctx;
};
