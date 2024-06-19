import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import "./Chart.scss";

const typesNumber = (d: any) => d.typeNumber;

function ChartLegend({ data, getColor }: any) {


  return (
    <div className="legend">
      <ul>
        {data.map((el: any) => (
          <li>
            <span
              className="legend__color"
              style={{ background: getColor(el.type) }}
            />{" "}
            <span className="legend__text">{el.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PieChart({
  name = "Distributors",
  data,
  width = 200,
  height = 200,
  colors,
}: any) {
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;
  const pieSortValues = (a: any, b: any) => b - a;

  const getColor = scaleOrdinal({
    domain: data.map((obj: any) => obj.type),
    range: [
      "rgba(154, 208, 75, 1)",
      "rgba(235, 71, 101, 1)",
      "rgba(82, 187, 248, 1)",
    ],
  });

  return (
    <div className="chart">
      <div className="chart__name">{name}</div>

      <div className="chart__body">
        <svg width={width} height={height}>
          <Group top={top} left={left}>
            <Pie
              data={data}
              pieValue={typesNumber}
              pieSortValues={pieSortValues}
              outerRadius={radius}
            >
              {(pie) => {
                return pie.arcs.map((arc, index) => {
                  const { typeNumber, total, type } = arc.data;
                  const result = `${typeNumber}/${total}`;
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                  const arcPath: any = pie.path(arc);
                  const arcFill = getColor(type);
                  return (
                    <g key={`arc-${result}-${index}`}>
                      <path d={arcPath} fill={arcFill} />
                      {hasSpaceForLabel && (
                        <text
                          x={centroidX}
                          y={centroidY}
                          dy=".33em"
                          fill="#ffffff"
                          fontSize={11}
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          {result}
                        </text>
                      )}
                    </g>
                  );
                });
              }}
            </Pie>
          </Group>
        </svg>
      </div>

      <div className="chart__legend">
        <ChartLegend data={data} getColor={getColor} />
      </div>
    </div>
  );
}

export default PieChart;
