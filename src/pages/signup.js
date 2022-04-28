import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from '../config/axios.config';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const history = useHistory();

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(false);

    try {
      const res = await axios.post('/auth/signup', { username, password, name, email, role: ['user'] });
      history.push('/login');
    } catch (error) {
      console.log(error.response);

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
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Display Name</Form.Label>
          <Form.Control type="text" placeholder="" onChange={e => setName(e.target.value)} />
          <small className="text-danger">{errors.name}</small>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="" onChange={e => setEmail(e.target.value)} />
          <small className="text-danger">{errors.email}</small>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="" onChange={e => setUsername(e.target.value)} />
          <small className="text-danger">{errors.username}</small>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="" onChange={e => setPassword(e.target.value)} />
          <small className="text-danger">{errors.password}</small>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="success" type="submit">
          Create account
        </Button>
      </Form>
    </Col>
  );
}
