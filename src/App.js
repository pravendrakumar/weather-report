import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactToPdf from "react-to-pdf";
import Axios from "axios";
import SearchForm from "./components/FormComponent";
import Filter from "./components/FilterComponents";
import TableData from "./components/TableComponent";
import Spinner from "./components/SpinnerComponent";
import Map from "./components/MapContainer";

import http from "./http";

const getDataFromDb = async () => {
  return http.get("/weathers");
};

const App = (props) => {
  const pdfRef = React.createRef();
  const [data, setData] = useState([]);
  const [fetchData, setFetchData] = useState([]);
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [searchError, setSearchError] = useState("");
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    const inIt = async () => {
      let results = await getDataFromDb();
      setData(results.data);
      setLoading(false);
    };
    inIt();
  }, []);

  const handleChange = (e) => {
    setSearchError("");
    setWeatherError("");
    setCity(e.target.value);
  };

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();
    setWeatherError("");
    setSearchError("");
    if (city.trim() === "") {
      setSearchError("Please enter first city Name");
      return;
    }
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7f3ad0c2a2bff236e2c26e0718c01478`;
      const results = await Axios.get(url);
      setLoading(false);
      let freshData = [...fetchData, results.data];
      const res = [...data, results.data];
      setFetchData(freshData);
      setData(res);
    } catch (error) {
      setLoading(false);
      setSearchError(error.message);
    }
  };

  const saveDataInDb = (e) => {
    e.preventDefault();
    setWeatherError("");
    if (!fetchData.length) {
      setWeatherError("There is no data to Save.Please fetch data first");
      return;
    }
    for (let weather of fetchData) {
      http
        .post("/weathers", weather)
        .then((res) => {
          setWeatherError(`Data saved succefully ${weather.id}`);
        })
        .catch((error) => {
          setWeatherError(error.message);
        });
    }
  };

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filterData = data.filter((result) => {
      let weatherDate = new Date(result.dt * 1000);
      // let dateStr = weatherDate.split(",")[0];
      // let dateArr = dateStr.split("/");
      // console.log(dateArr);
      const date = new Date(weatherDate);
      console.log(date);

      return fromDate <= date && date <= toDate;
    });
    console.log(filterData);
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col>
            <SearchForm
              city={city}
              onChangeCity={handleChange}
              onFormSubmit={handleSearchFormSubmit}
              searchError={searchError}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Filter
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
              onFilterSubmit={handleFilterSubmit}
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col size={6}>
            <Button variant="primary" type="button" onClick={saveDataInDb}>
              Save Data
            </Button>
          </Col>
          <Col size={6}>
            <ReactToPdf targetRef={pdfRef} filename="table.pdf">
              {({ toPdf }) => (
                <Button variant="primary" onClick={toPdf}>
                  Generate pdf
                </Button>
              )}
            </ReactToPdf>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Spinner />
            ) : (
              <div className="table-data" ref={pdfRef}>
                <TableData results={data} weatherError={weatherError} />
              </div>
            )}
          </Col>
        </Row>
        <div style={{ height: "100vh", width: "100%" }}>
          {loading ? (
            <Spinner />
          ) : (
            <Map results={data} google={window.google} />
          )}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default App;
