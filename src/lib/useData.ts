import { useState, useEffect } from "react";
import type { TSalesData } from "./types";

interface UseDataInterface {
  data: TSalesData[];
  loading: boolean;
}

export default function useData() {
  const [data, setData] = useState<UseDataInterface>({
    data: [],
    loading: true,
  });

  useEffect(() => {
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
  }, []);

  return data;
}
