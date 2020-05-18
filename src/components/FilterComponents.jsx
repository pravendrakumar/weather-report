import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterContainer = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onFilterSubmit,
}) => {
  return (
    <Form onSubmit={onFilterSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridDate">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            minDate={new Date(new Date().getDate() - 5)}
            name="from"
            placeholderText="from date"
            dateFormat="yyyy/MM/dd"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridDate">
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            minDate={new Date(new Date().getDate() - 5)}
            placeholderText="To date"
            name="to"
            dateFormat="yyyy/MM/dd"
          />
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        Filter Data
      </Button>
    </Form>
  );
};

export default FilterContainer;
