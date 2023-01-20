import React from 'react';
import {Col, Spinner} from "react-bootstrap";

export default function LoadingWrapper() {
  return (
    <Col
      xs={12}
      style={{
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Spinner variant="primary" />
    </Col>
  );
}
