import React from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";

export default function News({}) {
  const items = [0,1,2,3,4,5,6,7,8,9];
  return (
    <Container>
      <Row style={{ boxSizing: 'border-box' }}>
        {items.map((el) => (
          <Col xs={12} md={6} lg={4} style={{ marginBottom: 25 }}>
            <Card>
              <Card.Body>
                <Card.Title>Где стоит побывать гостям столицы</Card.Title>
                <Card.Text>
                  Гостям и жителям Москвы доступно большое количество экскурсий, ведь здесь очень большое количество достопримечательностей и интересных мест.
                </Card.Text>
                <Button variant="primary">Подробнее</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
