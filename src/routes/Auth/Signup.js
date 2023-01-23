import React, {useEffect, useState} from "react";
import {Alert, Col, Container, Row} from "react-bootstrap";
import SignupForm from "../../containers/SignupForm";
import {unsetStatus} from "../../store/secureSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Signup() {
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
        <Col xs={12} md={6} lg={4} style={{ margin: ' 25.5vh 0', position: "relative" }}>
          {alert ? (
            <Alert variant="danger" style={{ position: "absolute", top: -75, width: '94.5%' }}>
              Такой пользователь существует
            </Alert>
          ) : ''}
          <SignupForm />
        </Col>
        <Col xs={12} md={3} lg={4} />
      </Row>
    </Container>
  );
};
