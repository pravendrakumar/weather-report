import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  renderMarkers = () => {
    const { results } = this.props;
    return results.map((obj) => {
      return (
        <div key={obj.id}>
          <Marker
            title={obj.name}
            id={1}
            mapCenter={{ lat: obj.coord.lat, long: obj.coord.lon }}
          >
            <InfoWindow>
              <div>
                <p>{obj.main.temp}</p>
              </div>
            </InfoWindow>
          </Marker>
        </div>
      );
    });
  };
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        {this.renderMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBPJBGXvbGZWeCActKSfVeAfG1Ajv1wHDE",
})(MapContainer);
