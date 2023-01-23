import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Alert, Col, Container, Row, Toast} from "react-bootstrap";
import LoginForm from "../../containers/LoginForm";
import {unsetStatus} from "../../store/secureSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const {status} = useSelector((state) => state.secure);

  useEffect(() => {
    if (status === 200) {
      navigate('/');
    }

    if (status === 500) {
      setAlert(true)
    }

    dispatch(unsetStatus());
  }, [status]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={4} />
        <Col xs={12} md={6} lg={4} style={{ margin: ' 27.5vh 0', position: "relative" }}>
          {alert ? (
            <Alert variant="danger" style={{ position: "absolute", top: -65, width: '94.5%' }}>
              Неверный логин или пароль
            </Alert>
          ) : ''}
          <LoginForm />
        </Col>
        <Col xs={12} md={3} lg={4} />
      </Row>
    </Container>
  );
};
