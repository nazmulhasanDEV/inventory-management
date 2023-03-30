import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Box, User, Users, ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import SalesSummary from "./SalesSummary";
import SalesSummaryHeader from "./SalesSummaryHeader";
import ProductConsumedSummaryPerDay from "./ConsumedProductSummaryPerDay";
import ConsumedProductSummaryPerDayHeader from "./ConsumedProductSummaryPerDayHeader";

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

const Dashboard = () => {
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

  const labels = [
    "Woods & Screws",
    "Clever Machines",
    "Projector",
    "Scanner",
    "Smart Board",
    "Tablet PC",
    "Apple iPhone",
    "Floppy disc",
    "Earbuds",
    "Laptop",
    "Mouse",
    "Memory card",
    "Game console",
    "Photo camera",
    "Router",
    "camera",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Product vs Quantity",
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
      <Container fluid className="dashboard-section p-5">
        <Row>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        </Row>
        <Row>
          <Col md={3}>
            <Row className="g-3 dashboard-cards">
              <Col md={12}>
                <div className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title">Total products</h5>
                    <h4 className="card-text">50</h4>
                    <Link className="link">View all</Link>
                    <Box className="icon" />
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <div className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title">Number of admins</h5>
                    <h4 className="card-text">50</h4>
                    <Link className="link">View all</Link>
                    <Users className="icon" />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={9} className="product-quantity-chart">
            <Bar options={options} data={data} className="chart" />
          </Col>
        </Row>

        <Row className="mt-5 mb-5 gx-5">
          <Col md={6} className="sales-summary-chart">
            <Row>
              <SalesSummaryHeader />
            </Row>
            <Row>
              <Col md={12}>
                <SalesSummary />
              </Col>
            </Row>
          </Col>

          <div className="col-md-6 product-consumption-summary-per-day w-50">
            <ConsumedProductSummaryPerDayHeader />
            <div className="row">
              <ProductConsumedSummaryPerDay />
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
