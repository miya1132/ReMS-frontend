import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";

import { useGetElementProperty } from "@/hooks/useGetElementProperty";
import Moveable from "react-moveable";
import imageUrl from "./seattable01.png";

// SELECT '{name:''' || TABLE_NAME || ''',min_number:' || min_number || ',max_number:' || max_number || ',x:' || x || ',y:' || y || ',width:'||WIDTH || ',height:' || HEIGHT|| '},'
// FROM table_dummy WHERE store_id=1

export interface DataSet {
  id: number;
  name: string;
  min_number: number;
  max_number: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  newline_type: number;
  line_type: number;
}

const Seat = () => {
  const [datasets, setDataSets] = useState<DataSet[]>([
    {
      id: 1,
      name: "Ａ１",
      min_number: 4,
      max_number: 4,
      x: 376,
      y: 129,
      width: 89,
      height: 66,
      rotate: 0,
      newline_type: 0,
      line_type: 0,
    },
    {
      id: 2,
      name: "Ａ１",
      min_number: 4,
      max_number: 4,
      x: 354,
      y: 605,
      width: 82,
      height: 36,
      rotate: 0,
      newline_type: 0,
      line_type: 0,
    },
  ]);

  const idRef = useRef(uuidv4());
  const targetRef = useRef(null);
  const { getElementProperty } = useGetElementProperty<HTMLDivElement>(targetRef);
  const [target, setTarget] = useState(null);
  const scale = 0.8; // スケール

  useEffect(() => {
    const width = getElementProperty("width");
    const height = getElementProperty("height");

    // console.log(width, height);

    d3.select(targetRef.current).select("svg").remove();
    const svg = d3
      .select(targetRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("postion", "absolute");

    svg
      .append("image")
      .attr("href", imageUrl)
      .attr("x", 0) // 画像の左端をSVGの左端に配置
      .attr("y", 0)
      .attr("transform", `scale(${scale})`)
      .on("click", function (e) {
        const d = e.target.__data__;
        console.log("target", d);

        // moveableを解除
        setTarget(null);
      });

    const colors = [
      { stroke: "#db6c6c", fill: "#ffffb2" }, // 黄
      { stroke: "#6161ff", fill: "#b2b2ff" }, // 青
      { stroke: "#ff6060", fill: "#ffb2b2" }, // 赤
      { stroke: "#60ff60", fill: "#b2ffb2" }, // 緑
    ];

    svg
      .selectAll("rect")
      .data(datasets)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .attr("stroke", colors[0].stroke)
      .attr("fill", colors[0].fill)
      .attr("id", (d) => d.id)
      .attr("transform", (d) => {
        const x = d.x + d.width / 2;
        const y = d.y + d.height / 2;
        return `scale(${scale}) rotate(${d.rotate} ${x} ${y})`;
      })
      .on("click", (e) => {
        e.stopPropagation();
        const d = e.target.__data__;
        console.log("target", d);

        if (target !== e.target) setTarget(e.target);
      });
  }, [datasets]);

  return (
    <div ref={targetRef} id={idRef.current} className="w-full h-full">
      <div className={"moveable mix z-20"}>&nbsp;</div>
      <Moveable
        target={target}
        draggable={true}
        resizable={true}
        origin={false}
        onDrag={({ target, transform }) => {
          target!.style.transform = transform;
        }}
        onDragEnd={({ target }) => {
          const styleTransform = target.style.transform;
          let translateX = 0,
            translateY = 0;

          if (styleTransform) {
            const translatePattern = /translate\(([^)]+)\)/;
            const translateMatch = styleTransform.match(translatePattern);
            if (translateMatch !== null) {
              const translateValue = translateMatch[1].split(",");
              translateX = parseFloat(translateValue[0]);
              translateY = parseFloat(translateValue[1]);
            }
          }

          // x座標とy座標を取得
          const x = parseFloat(target.getAttribute("x") || "0");
          const y = parseFloat(target.getAttribute("y") || "0");

          // 最終的なx座標とy座標を計算
          const finalX = x + translateX / scale;
          const finalY = y + translateY / scale;

          const _datasets = [...datasets];
          _datasets.map((d) => {
            if (d.id === parseInt(target.id)) {
              d.x = finalX;
              d.y = finalY;
            }
          });
          // console.log("_datasets", _datasets);
          setDataSets(_datasets);
        }}
        onResize={({ target, width, height, delta }) => {
          delta[0] && (target!.style.width = `${width}px`);
          delta[1] && (target!.style.height = `${height}px`);
        }}
        onResizeEnd={({ target }) => {
          // console.log("onResizeEnd", target, isDrag);

          const _datasets = [...datasets];
          _datasets.map((d) => {
            if (d.id === parseInt(target.id)) {
              d.width = target.style.width
                ? parseInt(target.style.width.replace("px", ""))
                : d.width;
              d.height = target.style.height
                ? parseInt(target.style.height.replace("px", ""))
                : d.height;
            }
          });
          // console.log("_datasets", _datasets);
        }}
      />
    </div>
  );
};

export default Seat;
