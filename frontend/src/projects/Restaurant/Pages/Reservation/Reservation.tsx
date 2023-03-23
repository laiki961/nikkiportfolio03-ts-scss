import { Col, Container, Row } from "react-bootstrap";

const Reservation = () => {
  return (
    <section className='min-vh-100 container'>
      <div className='text-2'>Make a reservation online</div>
      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
    </section>
  );
};

export default Reservation;
