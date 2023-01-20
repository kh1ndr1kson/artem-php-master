import React, {useEffect, useState} from "react";
import {Form, Button, Spinner} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../store/secureSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(true);
  const {loading} = useSelector((state) => state.secure);

  useEffect(() => {
    setDisabled(!(login && password) || loading);
  }, [login, password, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin({
      login,
      password
    }));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Логин</Form.Label>
        <Form.Control
          placeholder="Enter email"
          onChange={(e) => setLogin(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="primary" type="submit" disabled={disabled}>
          {loading ? <Spinner size="sm" /> : 'Войти'}
        </Button>
      </div>
    </Form>
  );
};
