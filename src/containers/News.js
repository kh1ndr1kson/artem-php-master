import React, {useEffect} from 'react';
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectors, fetchNewsUnchecked} from "../store/newsSlice";
import LoadingWrapper from "../components/LoadingWrapper";
import {useNavigate} from "react-router-dom";

export default function News({}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectors.selectAll);
  const {loading} = useSelector((state) => state.news);
  const {isAuth} = useSelector((state) => state.secure);

  useEffect(() => {
    dispatch(fetchNewsUnchecked());

    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth]);

  return (
    <Container>
      {loading
        ? <LoadingWrapper />
        : (
          <Row style={{ boxSizing: 'border-box' }}>
            {items.map((el) => (
              <Col key={el.id} xs={12} md={6} lg={4}>
                <Card>
                  <Badge style={{ position: 'absolute', right: -10, top: -10 }} bg="success">Одобрено</Badge>
                  <Card.Body>
                    <Card.Title>{el.title}</Card.Title>
                    <Card.Text>
                      {el.description}
                    </Card.Text>
                    <Button variant="primary">Подробнее</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
    </Container>
  );
}
