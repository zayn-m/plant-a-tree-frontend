import React, { useState } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from '../config/axios.config';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(false);

    try {
      const res = await axios.post('/auth/login', { username, password });
      localStorage.setItem('user', JSON.stringify({username, password}));
      localStorage.setItem('token', res.data.accessToken);
      history.push('/');
      window.location.reload(true);
    } catch (error) {
      console.log(error.response);
      setLoading(false);

      if (error?.response?.status === 401) {
        setErrors({ message: 'Please enter valid credentials' });
      }

      if (error?.response?.data?.errors) {
        let errs = {};
        error.response.data.errors.forEach(error => {
          errs = {
            ...errs,
            [error.field]: error.defaultMessage
          }
        });
        setErrors(errs);
      }
    }
  }

  return (
    <Col md="6" className="border mx-auto mt-5 p-3 bg-light">
      {errors.message &&
       <Alert variant="danger">
        {errors.message}
      </Alert>}
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Your username" onChange={e => setUsername(e.target.value)} />
          <small className="text-danger">{errors.username}</small>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Your password" onChange={e => setPassword(e.target.value)} />
          <small className="text-danger">{errors.password}</small>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="success" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Col>
  );
}
