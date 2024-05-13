import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { useGetElementProperty } from "@/hooks/useGetElementProperty";
import dateUtils from "@/utils/dateUtils";

/**
 * タイムラインチャートを表示するためのデータの型です。
 */
export interface TimeLineDataSet {
  color: string;
  from: Date;
  to: Date;
}

/**
 * タイムラインチャートを表示するためのコンポーネントです。
 */
const TimeLine = ({
  datasets,
  className,
  padding = { top: 10, left: 10, bottom: 15, right: 10 },
  startTime,
  endTime,
  ticks = 24,
  linePaddingBottom = 0,
  linePaddingTop = 0,
}: {
  /**
   * チャートを表示するためのデータです。
   */
  datasets: TimeLineDataSet[];
  /**
   * チャートに適用するクラスです。
   * ※親コンポーネントに幅・高さを指定していない場合は、classNameで設定してください。
   */
  className?: string;
  padding?: { top: number; bottom: number; left: number; right: number };
  /**
   * チャートを表示するための開始時間です。
   */
  startTime?: Date;
  /**
   * チャートを表示するための終了時間です。
   */
  endTime?: Date;
  /**
   * 表示するチャートのメモリです。
   */
  ticks?: number;
  /**
   * チャートの下方向の余白です。
   */
  linePaddingBottom?: number;
  /**
   * チャートの上方向の余白です。
   */
  linePaddingTop?: number;
}) => {
  const idRef = useRef(uuidv4());
  const targetRef = useRef(null);
  const { getElementProperty } = useGetElementProperty<HTMLDivElement>(targetRef);

  const timelineStartTime = startTime
    ? startTime
    : datasets && datasets.length > 0
      ? dateUtils.getStartOfDay(datasets[0].from)
      : new Date("1900/01/01 00:00:00");
  const timelineEndTime = endTime
    ? endTime
    : datasets && datasets.length > 0
      ? new Date(dateUtils.getStartOfDay(datasets[0].from).getTime() + 1 * 24 * 60 * 60 * 1000) // 1日をミリ秒単位で加算する
      : new Date("1900/01/02 00:00:00");

  useEffect(() => {
    const width = getElementProperty("width");
    const height = getElementProperty("height");

    d3.select(targetRef.current).select("svg").remove();
    const svg = d3
      .select(targetRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleBand()
      .rangeRound([padding, width - padding])
      .padding(0.1)
      .domain(
        dataset.map(function (d) {
          return d.name;
        }),
      );

    const xScale = d3
      .scaleTime()
      .domain([timelineStartTime, timelineEndTime])
      .range([padding.left, width - padding.right]);
    const charHight = height - padding.top - padding.bottom;
    console.log(charHight);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(ticks * 2)
      .tickSize(-charHight)
      .tickFormat((d, i) => {
        if (d instanceof Date) {
          if (d.getMinutes() === 0)
            return d.getHours() === 0 ? (i === 0 ? "00" : "24") : d3.timeFormat("%H")(d);
          else return "";
        } else {
          return "Invalid Date";
        }
      });

    const chartCenterY = padding.top + charHight / 2;
    const timeLineData = svg.selectAll().data(datasets).enter().append("g");
    timeLineData
      .append("rect")
      .attr("x", (d) => {
        return xScale(d.from);
      })
      .attr("y", chartCenterY - charHight / 2 + linePaddingTop)
      .attr("width", (d) => {
        return xScale(d.to) - xScale(d.from);
      })
      .attr("height", charHight - linePaddingBottom - linePaddingTop)
      .attr("fill", (d) => {
        return d.color;
      });

    svg
      .append("g")
      .attr("transform", `translate(${0}, ${height - padding.bottom})`)
      .call(xAxis)
      .selectAll(".tick line")
      .style("stroke-dasharray", (d: unknown) => {
        return d instanceof Date ? (d.getMinutes() !== 0 ? "1,1" : "none") : "none";
      })
      .style("stroke", (d: unknown) => {
        return d instanceof Date ? (d.getMinutes() !== 0 ? "#aaa" : "") : "";
      });
  }, [datasets]);

  return (
    <div
      ref={targetRef}
      id={idRef.current}
      className={cn("bg-inherit w-full h-full", className)}
    ></div>
  );
};

export default TimeLine;
