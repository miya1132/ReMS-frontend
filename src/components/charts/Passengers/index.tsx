import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { useGetElementProperty } from "@/hooks/useGetElementProperty";

/**
 * 時間帯別乗客人数変化チャートを表示するためのデータの型です。
 */
export interface DataSet {
  number: number;
  timeSlot: string;
}

const Passengers = ({
  datasets,
  className,
  padding = { top: 50, left: 50, bottom: 50, right: 50 },
}: {
  /**
   * チャートを表示するためのデータです。
   */
  datasets: DataSet[];
  /**
   * チャートに適用するクラスです。
   * ※親コンポーネントに幅・高さを指定していない場合は、classNameで設定してください。
   */
  className?: string;
  /**
   * スケールを表示するためもマージンです。
   *
   */
  padding?: { top: number; bottom: number; left: number; right: number };
}) => {
  const idRef = useRef(uuidv4());
  const targetRef = useRef(null);
  const { getElementProperty } = useGetElementProperty<HTMLDivElement>(targetRef);

  useEffect(() => {
    const width = getElementProperty("width");
    const height = getElementProperty("height");

    const domainRange = [
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "00",
      "01",
      "02",
      "03",
      "平均",
    ];
    const data = datasets.slice();

    const total = datasets.reduce((acc, data) => acc + data.number, 0);

    domainRange.map((dr) => {
      console.log(`${dr} ${datasets.findIndex((d) => d.timeSlot === dr)}`);
      if (datasets.findIndex((d) => d.timeSlot === dr)) {
        if (dr === "平均") data.unshift({ number: (total / 24).toFixed(1), timeSlot: dr });
        else data.unshift({ number: 0, timeSlot: dr });
      }
    });

    // TODO：これはよくない！！
    datasets = data;

    //

    d3.select(targetRef.current).select("svg").remove();
    const svg = d3
      .select(targetRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleBand()
      .rangeRound([padding.left, width - padding.right])
      .padding(0.1)
      .domain(
        domainRange,

        // datasets.map(function (d) {
        //   return d.timeSlot;
        // }),
      );

    const max = d3.max(datasets, (d) => {
      return d.number;
    });

    const yScale = d3
      .scaleLinear()
      .domain([0, max])
      // .domain([
      //   0,
      //   d3.max(datasets, (d) => {
      //     return d.number;
      //   }),
      // ])
      .range([height - padding.bottom, padding.top]);

    svg
      .append("g")
      .attr("transform", `translate(${0},${height - padding.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${padding.left},${0})`)
      .call(d3.axisLeft(yScale).ticks(max / 0.5));

    // const barGroups = svg.selectAll().data(datasets).enter().append("g");

    const g = svg.append("g");
    g.selectAll("rect")
      .data(datasets)
      .enter()
      .append("rect")
      .attr("x", (d) => {
        return xScale(d.timeSlot);
      })
      .attr("y", (d) => {
        return yScale(d.number);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return height - padding.bottom - yScale(d.number);
      })
      .attr("fill", (d) => {
        // 選択されている時間帯の場合
        if (d.timeSlot === "10") return "#c3fed6";
        else return "#e7ffef";
      });

    g.selectAll("text")
      .data(datasets)
      .enter()
      .append("text")
      // .attr("text-anchor", "middle")
      .text(function (d) {
        // return yScale(d.number);
        return d.number;
      })
      .attr("x", (d) => {
        return xScale(d.timeSlot) + xScale.bandwidth() / 2;
      })
      .attr("y", (d) => {
        return yScale(d.number) - 5;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#ffffff");

    svg
      .append("text")
      .attr("x", padding.left - 15)
      .attr("y", padding.top - 10)
      .attr("text-anchor", "middle")
      .text("[人]")
      .attr("fill", "#ffffff");

    svg
      .append("text")
      .attr("x", width - padding.right + 15)
      .attr("y", height - padding.bottom + 10)
      .attr("text-anchor", "middle")
      .text("[時]")
      .attr("fill", "#ffffff");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - padding.bottom + 40)
      .attr("text-anchor", "middle")
      .text("表示時刻　10：00")
      .attr("fill", "#ffffff");
  }, [datasets]);

  return (
    <div
      ref={targetRef}
      id={idRef.current}
      className={cn("bg-inherit w-full h-full", className)}
    ></div>
  );
};

export default Passengers;
