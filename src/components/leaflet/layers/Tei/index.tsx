/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import * as d3 from "d3";
import * as d3Geo from "d3-geo";
import { useRecoilState, useRecoilValue } from "recoil";

import { GeoJson as GeoJSONType } from "@/types/GeoJson.ts";
import axiosClient from "@/extends/AxiosClientProvider";
import styles from "./Tei.module.css";
// import { limitAtom } from "@/pages/Dashboard";
import { searchKeyAtom } from "@/App";
import { searchAtom } from "@/App";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";

const Tei = () => {
  const [data, setData] = useState<GeoJSONType>({ type: "FeatureCollection", features: [] });
  // const [limit] = useRecoilState(limitAtom);
  // const [search, setSearch] = useRecoilState(searchAtom);
  // const isFirstRender = useRef(true);
  const searchKey = useRecoilValue(searchKeyAtom);
  const [search, setSearch] = useRecoilState(searchAtom);

  const map = useMap();

  const getData = async (limit: number) => {
    const response = await axiosClient.get(import.meta.env.VITE_API_HOST + `/teis?limit=${limit}`);
    const body = JSON.parse(JSON.stringify(response.data));
    return body;
  };

  const refresh = async () => {
    const data = await getData(searchKey.limit);
    setData(data);
  };

  useUpdateEffect(() => {
    console.log("searchKey.search", search);
    if (search == false) return;

    if (search) {
      refresh();
      setSearch(false);
    }
  }, [search]);

  useEffect(() => {
    (async () => {
      // svgを削除後に再度追加
      const overlayPane = d3.select(map.getPanes().overlayPane);
      overlayPane.select("svg").remove();
      const svg = overlayPane.append("svg");
      const g = svg.append("g").attr("class", "leaflet-zoom-hide");

      //  create a d3.geo.path to convert GeoJSON to SVG
      const transform = d3Geo.geoTransform({
        point: projectPoint,
      });

      const path: any = d3Geo.geoPath().projection(transform);

      // create path elements for each of the features
      const d3_features = g
        .selectAll("path")
        .data(data.features || [])
        .enter()
        .append("path")
        .attr("style", "cursor: pointer;");

      map.on("moveend", reset);

      // tooltip用div要素
      const tooltip = d3.select("#tooltip");

      reset();

      // fit the SVG element to leaflet's map layer
      function reset() {
        // TODO：ツールチップ非表示
        // if (isSp) tooltip.style("visibility", "hidden");

        const bounds = map.getBounds();
        const topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
        const bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

        svg
          .attr("width", bottomRight.x - topLeft.x)
          .attr("height", bottomRight.y - topLeft.y)
          .style("left", topLeft.x + "px")
          .style("top", topLeft.y + "px");

        g.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

        // 円の半径を変更
        const zoom = map.getZoom();
        const ZOOM_SCALE = 25;
        path.pointRadius(zoom * Math.min(zoom * (1 / ZOOM_SCALE), 3));

        d3_features
          .attr("d", path)
          .attr("stroke", "red")
          .attr("stroke-width", 0.5)
          .attr("fill", "orange")
          .attr("fill-opacity", 0.5)
          .attr("style", "pointer-events: auto;")
          .on("mouseover", function (e) {
            const d = e.target.__data__;

            tooltip
              .style("visibility", "visible")
              .html(
                d.properties.tei_cd +
                  "：" +
                  d.properties.tei_name +
                  "<br>" +
                  "緯度：" +
                  d.properties.latitude +
                  "<br>" +
                  "経度：" +
                  d.properties.longitude,
              );
          })
          .on("mousemove", function (e) {
            tooltip.style("top", e.pageY - 50 + "px").style("left", e.pageX + 0 + "px");
          })
          .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
          })
          .on("mouseenter", function (e) {
            d3.select(e.currentTarget).style("fill", "red");
          })
          .on("mouseleave", function (e) {
            d3.select(e.currentTarget).style("fill", "orange");
          });
      }
    })();

    // Use Leaflet to implement a D3 geometric transformation.
    function projectPoint(this: any, x: number, y: number) {
      const point = map.latLngToLayerPoint(new LatLng(y, x));
      this.stream.point(point.x, point.y);
    }
  }, [map, data]);

  return (
    <div>
      <div id="tooltip" className={styles.Tooltip}></div>
    </div>
  );
};

export default Tei;
