import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

export default function HeaderApp() {
  return (
    <Navbar bg="dark" variant="dark" style={{ marginBottom: 15 }}>
      <Container>
        <Navbar.Brand href="/">NEWS</Navbar.Brand>
        <Nav>
          <Nav.Link href="/login">Войти</Nav.Link>
          <Nav.Link href="/registration">Регистрация</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
