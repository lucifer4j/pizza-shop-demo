import {Datum, DatumValue, ResponsiveLine} from "@nivo/line";
import {timeFormat} from "d3-time-format";
import {ColorSchemeId} from "@nivo/colors";


type OrdersChartProps = {
  name: string;
  color: ColorSchemeId;
  yAxisFormat?: (value: DatumValue) => any;
  id: string;
  stats: Datum[];
}

const timeFormatter = timeFormat("%H:%M");

function Chart({name, color, yAxisFormat, id, stats}: OrdersChartProps) {
    const series = [{id, data: stats.slice(1, stats.length - 1)}];
    return <ResponsiveLine
        data={series}
        xScale={{
            type: "time"
        }}
        yScale={{
            type: "linear",
            min: "auto",
            max: "auto"
        }}
        xFormat={value => timeFormatter(value as Date)}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        colors={{ scheme: color }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
            tickValues: "every 5 minutes",
            format: "%H:%M",
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: name,
            legendOffset: -48,
            legendPosition: "middle",
            format: yAxisFormat
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        tooltipFormat={value => {
            console.log(value);
            return "";
        }}
    />;
}

export default Chart;