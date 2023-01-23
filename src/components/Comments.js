import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchComments} from "../store/commentsSlice";
import {Button, Form, ListGroup, Spinner} from "react-bootstrap";
import {fetchCommentCreate} from "../store/commentsSlice";
import LoadingWrapper from "./LoadingWrapper";

export default function Comments({ newsId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [disabled, setDisabled] = useState(true);
  const {data, loading} = useSelector((state) => state.comments);
  const {user} = useSelector((state) => state.secure);

  useEffect(() => {
    dispatch(fetchComments({ newsId }))
  }, [newsId]);

  useEffect(() => {
    setDisabled(!content || loading);
  }, [content, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCommentCreate({
      authorId: user.id,
      newsId: Number(newsId),
      content
    })).then(() => setContent(''));

  };

  return (
    <>
      <h4>Комментарии</h4>
      {loading
        ? <LoadingWrapper />
        : (
          data.length === 0
            ? (
              <p style={{ color: '#888' }}>Комментариев пока нет, будь первым!</p>
            ) : (
              <ListGroup>
                {data.map((el) => (
                  <ListGroup.Item key={el.id}>{el.content}</ListGroup.Item>
                ))}
              </ListGroup>
            )
        )}
      <Form>
        <Form.Group className="my-3" controlId="formBasicPassword">
          <Form.Label>Комментарий</Form.Label>
          <Form.Control
            value={content}
            style={{ height: 100, marginBottom: 15 }}
            as="textarea"
            placeholder="Комментарий"
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="primary" type="submit" onClick={handleSubmit} disabled={disabled}>
            {loading ? <Spinner size="sm" /> : 'Добавить комментарий'}
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
