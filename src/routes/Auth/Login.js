import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import LoginForm from "../../containers/LoginForm";
import {unsetStatus} from "../../store/secureSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status} = useSelector((state) => state.secure);

  useEffect(() => {
    if (status === 200) {
      navigate('/');
    }

    dispatch(unsetStatus());
  }, [status]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={4} />
        <Col xs={12} md={6} lg={4} style={{ margin: ' 27.5vh 0' }}>
          <LoginForm />
        </Col>
        <Col xs={12} md={3} lg={4} />
      </Row>
    </Container>
  );
};
