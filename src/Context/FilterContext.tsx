import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import useData from "../lib/useData";
import type { SalesData } from "../lib/types";

export type FilterType = {
  chart: string;
  dateRange: [string, string];
};

interface FilterContextType {
  setFilter: Dispatch<SetStateAction<FilterType>>;
  filteredData: SalesData[];
  loading: boolean;
}

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: rawData, loading } = useData();
  const [filter, setFilter] = useState<FilterType>({
    chart: "Downloads",
    dateRange: ["2020-01-01", "2020-07-01"],
  });

  return (
    <FilterContext.Provider
      value={{ setFilter, filteredData: rawData, loading }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error("useFilterContext must be used within FilterProvider");
  return ctx;
};
