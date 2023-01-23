import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Col, Container, Row, Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectors, fetchNewsChecked, fetchNewsUnchecked} from "../store/newsSlice";
import LoadingWrapper from "../components/LoadingWrapper";
import {useNavigate} from "react-router-dom";

export default function News({}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(1)
  const items = useSelector(selectors.selectAll);
  const {loading} = useSelector((state) => state.news);
  const {isAuth, user} = useSelector((state) => state.secure);

  let pages = [];
  for (let number = 1; number <= Math.ceil(items.length / 6); number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setActive(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    user.isAdmin ? dispatch(fetchNewsUnchecked()) : dispatch(fetchNewsChecked());

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
            {Object.assign(items).map((el) => (
              <Col key={el.id} xs={12} md={6} lg={4} style={{ marginBottom: 25 }}>
                <Card>
                  {!user.isAdmin ?
                    <Badge style={{ position: 'absolute', right: -10, top: -10 }} bg="success">Одобрено</Badge>
                  : ''}
                  <Card.Body>
                    <Card.Title>{el.title}</Card.Title>
                    <Card.Text>
                      {el.description}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/news/${el.id.toString()}`)}
                    >
                      Подробнее
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )).filter((el, i) => (i <= active * 6 - 1 && i >= active * 6 - 6))}
          </Row>
        )}
      <Pagination style={{ display: 'flex', justifyContent: 'center' }}>{pages}</Pagination>
    </Container>
  );
}
