import { useEffect, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { dayjsUtc } from "../dayjs";
import { useFilterContext } from "../Context/FilterContext";

const Chart = () => {
  const { filteredData: data, loading } = useFilterContext();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data.length) {
    return <div>No data</div>;
  }
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [seriesData, setSeriesData] = useState<Highcharts.SeriesOptionsType[]>(
    []
  );

  useEffect(() => {
    const newSeriesData: Highcharts.SeriesOptionsType[] = data.map((series) => {
      return {
        name: series.name,
        type: "line",
        data: series.data.map(([date, value]) => {
          const dateMs = dayjsUtc(date).valueOf(); // convert date string to unix milliseconds
          const yValue = value as number;
          return {
            x: dateMs,
            y: yValue,
          };
        }),
      };
    });
    setSeriesData(newSeriesData);
  }, [data]);

  const options: Highcharts.Options = {
    title: {
      text: "Downloads by App",
    },
    subtitle: {
      text: "TODO",
    },
    yAxis: {
      title: {
        text: "Downloads",
      },
    },
    xAxis: {
      type: "datetime",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    series: seriesData,
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
};

export default Chart;
