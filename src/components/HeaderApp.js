import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import ModalFormCreate from "./ModalFormCreate";
import {useDispatch, useSelector} from "react-redux";
import {unsetAuth} from "../store/secureSlice";

export default function HeaderApp() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const {isAuth} = useSelector((state) => state.secure);
  const handleShow = () => setShow(true);
  const logout = () => dispatch(unsetAuth());

  return (
    <Navbar bg="dark" variant="dark" style={{ marginBottom: 25 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>NEWS</Link>
        </Navbar.Brand>
        <Nav>
          {!isAuth ? (
            <>
              <Nav.Link>
                <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>
                  Войти
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/signup" style={{ textDecoration: 'none', color: '#fff' }}>
                  Регистрация
                </Link>
              </Nav.Link>
            </>
          ) : (
            <>
              <ModalFormCreate show={show} setShow={setShow} />
              <Button onClick={handleShow}>
                Создать новость
              </Button>
              <Button variant="outline-danger" onClick={logout} style={{ marginLeft: 10 }}>
                Выйти
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
