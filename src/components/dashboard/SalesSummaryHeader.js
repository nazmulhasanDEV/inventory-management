import { Row, Col, Container } from "react-bootstrap";
import { Box, User, Users, ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";

const SalesSummaryHeader = () => {
  return (
    <>
      <Col md={12} className="mb-3">
        <Row className="g-3 dashboard-cards">
          <Col md={6}>
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">Total orders</h5>
                <h4 className="card-text">50</h4>
                <Link className="link">View all</Link>
                <ShoppingCart className="icon" />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">Number of customers</h5>
                <h4 className="card-text">50</h4>
                <Link className="link">View all</Link>
                <Users className="icon" />
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default SalesSummaryHeader;
