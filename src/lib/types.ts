export type TSalesData = {
  id: number;
  name: string;
  icon: string;
  data: [date: string, downloads: number, revenue: number][];
};

export type TDateRange = { start: string; end: string };

export enum EChartType {
  Downloads = "downloads",
  Revenue = "revenue",
}
