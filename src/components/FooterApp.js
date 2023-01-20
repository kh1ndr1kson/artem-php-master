import React from 'react';
import {Container, Navbar} from "react-bootstrap";

export default function FooterApp() {
  return (
    <Navbar bg="light" variant="light" style={{ marginTop: 25 }}>
      <Container style={{ justifyContent: 'center' }}>
        <Navbar.Text>© {new Date().getFullYear()} NEWS</Navbar.Text>
      </Container>
    </Navbar>
  );
}
