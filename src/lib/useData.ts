import { useState } from "react";
import type { SalesData } from "./types";

interface UseDataInterface {
  data: SalesData[];
  loading: boolean;
}

export default function useData() {
  const [data, setData] = useState<UseDataInterface>({
    data: [],
    loading: true,
  });

  const fetchData = async () => {
    try {
      // Simulate delay with setTimeout
      setTimeout(async () => {
        const response = await fetch(`/data.json`);
        const jsonData = await response.json();
        setData({ data: jsonData, loading: false });
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
  return data;
}
