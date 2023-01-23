import React, {useEffect, useState} from 'react';
import {Button, Form, Modal, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewsCheckedCreate, fetchNewsUncheckedCreate} from "../store/newsSlice";

export default function ModalFormCreate({show, setShow}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [disabled, setDisabled] = useState(true);
  const {loading} = useSelector((state) => state.news);
  const {user} = useSelector((state) => state.secure);

  useEffect(() => {
    setDisabled(!(title && description) || loading);
  }, [title, description, loading]);

  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchCreate = user.isAdmin ? fetchNewsCheckedCreate : fetchNewsUncheckedCreate;
    dispatch(fetchCreate({
      title,
      description
    })).then(() => setShow(false));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Создать новость</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control
              placeholder="Заголовок"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              style={{ height: 150 }}
              as="textarea"
              placeholder="Описание"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit} disabled={disabled}>
          {loading ? <Spinner size="sm" /> : 'Создать'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
