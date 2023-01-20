import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import SignupForm from "../../containers/SignupForm";
import {unsetStatus} from "../../store/secureSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Signup() {
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
        <Col xs={12} md={6} lg={4} style={{ margin: ' 25.5vh 0' }}>
          <SignupForm />
        </Col>
        <Col xs={12} md={3} lg={4} />
      </Row>
    </Container>
  );
};
