import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import { useGetElementProperty } from "@/hooks/useGetElementProperty";

const Percentage = ({ className }: { className?: string }) => {
  const idRef = useRef(uuidv4());
  const targetRef = useRef(null);
  const { getElementProperty } = useGetElementProperty<HTMLDivElement>(targetRef);

  useEffect(() => {
    const width = getElementProperty("width");
    const height = getElementProperty("height");

    const dataset = [
      { name: "A", value: 5 },
      { name: "B", value: 6 },
      { name: "C", value: 8 },
      { name: "D", value: 1 },
      { name: "E", value: 2 },
      { name: "F", value: 6 },
      { name: "D", value: 1 },
      { name: "E", value: 2 },
      { name: "F", value: 6 },
      { name: "G", value: 8 },
      { name: "H", value: 6 },
      { name: "I", value: 10 },
      { name: "J", value: 9 },
    ];

    const radius = Math.min(width, height) / 2 - 10;

    d3.select(targetRef.current).select("svg").remove();
    const svg = d3
      .select(targetRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    // const color = d3.scaleOrdinal().range(["#DC3912", "#3366CC", "#109618", "#FF9900", "#990099"]);
    // const color = d3.scaleOrdinal().range(d3.schemeSet3);
    const colors = d3.quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), dataset.length);
    const color = d3.scaleOrdinal(colors);

    const pie = d3
      .pie()
      .value(function (d) {
        return d.value;
      })
      .sort(null);

    const pieGroup = g
      .selectAll(".pie")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "pie");

    const arc = d3.arc().outerRadius(radius).innerRadius(0);

    pieGroup
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d) {
        return color(d.index);
      })
      .attr("opacity", 0.75)
      .attr("stroke", "white");

    // 6. pieチャートテキストSVG要素の設定
    const text = d3
      .arc()
      .outerRadius(radius - 30)
      .innerRadius(radius - 30);

    pieGroup
      .append("text")
      .attr("fill", "black")
      .attr("transform", function (d) {
        return "translate(" + text.centroid(d) + ")";
      })
      .attr("dy", "5px")
      .attr("font", "10px")
      .attr("text-anchor", "middle")
      .text(function (d) {
        return d.data.name;
      });
  }, []);
  return (
    <div
      ref={targetRef}
      id={idRef.current}
      className={cn("bg-inherit w-full h-full", className)}
    ></div>
  );
};

export default Percentage;
