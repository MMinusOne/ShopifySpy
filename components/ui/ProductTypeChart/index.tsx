import React from "react";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface VendorChartProps {
  data: number[];
  labels: string[];
}

export default function VendorChart({ data, labels }: VendorChartProps) {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = windowWidth < 768; // Adjust this breakpoint as needed

  const visibleData = isSmallScreen ? data.slice(0, 6) : data;
  const visibleLabels = isSmallScreen ? labels.slice(0, 6) : labels;

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 500,
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: visibleLabels,
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    fill: {
      opacity: 0.8,
      colors: ["#22c55e"],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " items";
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: true,
            },
          },
        },
      },
    ],
  };

  return (
    <ApexChart
      options={options}
      series={[{ name: "Items", data: visibleData }]}
      type="bar"
      height={500}
      width={isSmallScreen? undefined: 700}
    />
  );
}