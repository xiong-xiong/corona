import React from 'react';
import L from 'leaflet';
import './style.css';

class Map extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // create map
   
   this.tileUrl = 'https://a.tile.openstreetmap.org/${z}/${x}/${y}.png';

   this.map = L.map('map', {
    center: [0, 0],
    zoom: 3,
    maxZoom: 16,
    preferCanvas: true,
    zoomControl: false,
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }),
    ]
  });



   }

   componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.props.items.forEach(country => {
        
        this.marker = L.circle([country.coordinates.lat, country.coordinates.long], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: country.cases*15
      }).addTo(this.map);


      this.marker.bindPopup(`<h3>${country.country}</h3><p>Confirmed cases: ${country.cases}</p>`);

      })
    }
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}
export default Map;