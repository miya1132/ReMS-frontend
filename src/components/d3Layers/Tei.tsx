/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import * as d3 from "d3";
import * as d3Geo from "d3-geo";
import { GeoJson as GeoJSONType } from "@/types/GeoJson.ts";
import format from "@/utils/format.ts";

const Tei = ({ data }: { data: GeoJSONType }) => {
  const map = useMap();

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
        // ツールチップ非表示
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
            const walking_at = new Date(d.properties.walking_at);

            tooltip
              .style("visibility", "visible")
              .html(
                "日時：" +
                  format.get_formated_time("YYYY/MM/DD hh:mm:ss", walking_at) +
                  "<br>" +
                  "緯度：" +
                  d.properties.latitude +
                  "<br>" +
                  "経度：" +
                  d.properties.longitude +
                  "<br>" +
                  "高度：" +
                  d.properties.altitude +
                  "<br>" +
                  "精度：" +
                  d.properties.accuracy +
                  "<br>" +
                  "速度：" +
                  d.properties.speed,
              );
          })
          .on("mousemove", function (e) {
            tooltip.style("top", e.pageY - 20 + "px").style("left", e.pageX + 10 + "px");
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
  }, [map]);

  return (
    <div>
      <div id="tooltip"></div>
    </div>
  );
};

export default Tei;
