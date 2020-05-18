import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerContainer = (props) => {
  return (
    <Spinner animation="border" role="status" variant="primary">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};
export default SpinnerContainer;
