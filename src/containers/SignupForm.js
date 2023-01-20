import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, Button, Spinner} from "react-bootstrap";
import {fetchRegistration} from "../store/secureSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const {loading} = useSelector((state) => state.secure);

  useEffect(() => {
    setDisabled(!(login && password && password2 && (password === password2)) || loading);
  }, [login, password, password2, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRegistration({
      login,
      password,
      isAdmin
    }));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="Логин"
          onChange={(e) => setLogin(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Повторите пароль"
          onChange={(e) => setPassword2(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Check
          type="checkbox"
          id="isAdmin"
          label="Я админ"
          onChange={() => setIsAdmin(!isAdmin)}
        />
        {isAdmin}
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="primary" type="submit" disabled={disabled}>
          {loading ? <Spinner size="sm" /> : 'Зарегистрироваться'}
        </Button>
      </div>
    </Form>
  );
};
