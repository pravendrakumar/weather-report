import React from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";

const FormConatiner = ({ city, onChangeCity, onFormSubmit, searchError }) => {
  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Row>
        {searchError !== "" ? (
          <Alert variant="danger">{searchError}</Alert>
        ) : (
          ""
        )}
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <br />
          <Form.Control
            type="city"
            placeholder="Enter your city"
            value={city}
            onChange={onChangeCity}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <br />
          <Button variant="primary" type="submit">
            Fetch Weather
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default FormConatiner;
