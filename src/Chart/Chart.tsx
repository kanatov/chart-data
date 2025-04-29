import { useEffect, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { dayjsUtc } from "../dayjs";
import { useFilterContext } from "../Context/FilterContext";
import { EChartType } from "../lib/types";

const TITLE = {
  [EChartType.Downloads]: "Downloads by App",
  [EChartType.Revenue]: "Revenue by App",
};

const Y_AXIS_TITLE = {
  [EChartType.Downloads]: "Downloads",
  [EChartType.Revenue]: "Revenue ($)",
};

const DATA_INDEX = {
  [EChartType.Downloads]: 1,
  [EChartType.Revenue]: 2,
};

const SUBTITLE_DATE_FORMAT = "MMM DD, YYYY";

const Chart = () => {
  const { filter, dataRange, filteredData: data, loading } = useFilterContext();
  if (loading) return <div>Loading...</div>;
  if (!data.length) return <div>No data</div>;

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [seriesData, setSeriesData] = useState<Highcharts.SeriesOptionsType[]>(
    []
  );

  useEffect(() => {
    const newSeriesData: Highcharts.SeriesOptionsType[] = data.map((series) => {
      return {
        name: series.name,
        type: "line",
        data: series.data.map((data) => {
          const dateMs = dayjsUtc(data[0]).valueOf(); // convert date string to unix milliseconds
          const yValue = data[DATA_INDEX[filter.chart]] as number;
          return {
            x: dateMs,
            y: yValue,
          };
        }),
      };
    });
    setSeriesData(newSeriesData);
  }, [data, filter.chart]);

  const subtitleStart = dayjsUtc(dataRange.start).format(SUBTITLE_DATE_FORMAT);
  const subtitleEnd = dayjsUtc(dataRange.end).format(SUBTITLE_DATE_FORMAT);
  const subtitle = `${subtitleStart} - ${subtitleEnd}`;

  const options: Highcharts.Options = {
    title: {
      text: TITLE[filter.chart],
    },
    subtitle: {
      text: subtitle,
    },
    yAxis: {
      title: {
        text: Y_AXIS_TITLE[filter.chart],
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%b %d, %y}",
      },
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
