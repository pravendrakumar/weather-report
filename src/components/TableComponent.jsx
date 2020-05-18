import React from "react";
import { Table, Alert } from "react-bootstrap";

const TableContainer = ({ results, weatherError }) => {
  const renderResuts = (results) => {
    return results.map((weatherObj) => {
      return (
        <tr key={weatherObj.id}>
          <td>{weatherObj.id}</td>
          <td>{weatherObj.name}</td>
          <td>{new Date(weatherObj.dt * 1000).toDateString()}</td>
          <td>{weatherObj.weather[0].main}</td>
          <td>{weatherObj.main.temp}</td>
          <td>
            {weatherObj.main.temp_min}/{weatherObj.main.temp_max}
          </td>
          <td>{weatherObj.main.pressure}</td>
          <td>{weatherObj.wind.speed}</td>
          <td>{weatherObj.main.humidity}</td>
        </tr>
      );
    });
  };
  return (
    <React.Fragment>
      {weatherError !== "" ? (
        <Alert variant="danger">{weatherError}</Alert>
      ) : (
        ""
      )}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>City</th>
            <th>Time</th>
            <th>Weather</th>
            <th>Temprature</th>
            <th>Min/Max Temprature</th>
            <th>Presssure</th>
            <th>Air speed</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>{renderResuts(results)}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default TableContainer;
