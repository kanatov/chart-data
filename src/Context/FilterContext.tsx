import { createContext, useContext, useState, ReactNode, useMemo } from "react";
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
  dataRange: TDateRange;
  setDateRange: (range: TDateRange) => void;
  setChart: (chart: EChartType) => void;
  loading: boolean;
}

interface IFilterProvider {
  children: ReactNode;
}

const FilterContext = createContext<IFilterContext | null>(null);

function filterData(
  data: TSalesData[],
  { start, end }: TDateRange
): TSalesData[] {
  if (!data || !start || !end) {
    console.error("Invalid data or date range");
    return [];
  }
  const startDate = new Date(start);
  const endDate = new Date(end);

  const filteredData = data.reduce<TSalesData[]>((acc, item) => {
    const newData = item.data.filter((dataRow) => {
      const date = new Date(dataRow[0]);
      return date >= startDate && date <= endDate;
    });
    if (newData.length) acc.push({ ...item, data: newData });
    return acc;
  }, []);
  return filteredData;
}

export function FilterProvider({ children }: IFilterProvider) {
  // Initial state
  const [filter, setFilter] = useState<IFilter>({
    chart: CHART,
    dateRange: FILTER_RANGE,
  });

  // Setters
  const setDateRange = ({ start, end }: TDateRange) => {
    const prev = filter.dateRange;
    if (prev.start === start && prev.end === end) return;
    if (new Date(start) < new Date(end)) {
      const newDateRange = { start, end };
      setFilter((prev) => ({ ...prev, dateRange: newDateRange }));
    }
  };

  const setChart = (chart: EChartType) => {
    if (filter.chart === chart) return;
    setFilter((prev) => ({ ...prev, chart }));
  };

  // Filtering data
  const { data, loading } = useData();

  const filteredData = useMemo(() => {
    return filterData(data, filter.dateRange);
  }, [data, filter.dateRange]);

  // Data ragnge displays the first and last date of the filtered data
  // and not the date range selected by the user
  const dataRange = useMemo(() => {
    let start: Date | null = null;
    let end: Date | null = null;
    filteredData.forEach((item) => {
      item.data.forEach((dataRow) => {
        const date = new Date(dataRow[0]);
        if (!start || date < start) start = date;
        if (!end || date > end) end = date;
      });
    });
    return {
      start: start || "",
      end: end || "",
    };
  }, [filteredData]);
  return (
    <FilterContext.Provider
      value={{
        filter,
        dataRange,
        setDateRange,
        setChart,
        filteredData,
        loading,
      }}
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
