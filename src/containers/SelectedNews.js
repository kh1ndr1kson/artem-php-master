import React, {useEffect} from 'react';
import {Badge, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewsChecked, fetchNewsUnchecked, selectors} from "../store/newsSlice";
import Comments from "../components/Comments";

export default function SelectedNews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()
  const {isAuth, user} = useSelector((state) => state.secure);
  const item = useSelector((state) => selectors.selectById(state, id));

  useEffect(() => {
    user.isAdmin ? dispatch(fetchNewsUnchecked()) : dispatch(fetchNewsChecked());

    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth]);

  return (
    <Container>
      {item ? (
        <Row>
          <Col xs={12}>
            <h1>{item.title}</h1>
            {!user.isAdmin ?
              <Badge style={{ marginBottom: 10 }} bg="success">Одобрено</Badge>
              : ''}
            <p>{item.description}</p>
          </Col>
          <Col xs={12}>
            <Comments newsId={id} />
          </Col>
        </Row>
      ) : ''}
    </Container>
  );
}
