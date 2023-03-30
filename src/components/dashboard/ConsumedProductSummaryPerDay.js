import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Box, User, Users, ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import SalesSummary from "./SalesSummary";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProductConsumedSummaryPerDay = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Product consumption summary",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(49, 58, 70, 1)",
        barThickness: 16,
        barPercentage: 0.5,
      },
      // },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Bar options={options} data={data} className="chart" />
        </Col>
      </Row>
    </>
  );
};

export default ProductConsumedSummaryPerDay;
