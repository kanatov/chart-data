export interface ISalesData {
  id: number;
  name: string;
  icon: string;
  data: [date: string, downloads: number, revenue: number][];
}

export interface IDateRange {
  start: string;
  end: string;
}

export enum EChartType {
  Downloads = "downloads",
  Revenue = "revenue",
}
