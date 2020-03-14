import React, { Component } from 'react';
import FinlandTicker from './components/finlandticker';
import CountryTable from './components/countrytable';
import Map from './components/map';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmedFinland: [],
      deathsFinland: [],
      confirmedWorld: [],
      countries: []
    }
    this.getConfirmedCasesWorld = this.getConfirmedCasesWorld.bind(this);
    this.getConfirmedCasesFinland = this.getConfirmedCasesFinland.bind(this);
  }

  componentDidMount() {
    this.getConfirmedCasesWorld();
    this.getConfirmedCasesFinland();
  }

  async getConfirmedCasesWorld () {
     
    const response = await fetch('https://coronavirus-tracker-api.herokuapp.com/confirmed');
    let data = await Promise.resolve(response);
    data = await data.json();
    const countries = [];
    let casesByCountry = [];
    data.locations.forEach( location => {
      if(!countries.includes(location.country)) {
        countries.push(location.country);
      } 
    })

    countries.forEach( country => {
      let cases = 0;
      let coordinates = null;
      data.locations.forEach( location => {
        if(location.country === country) {
          cases = cases + location.latest;
          if(coordinates === null) {
            coordinates = location.coordinates;
          }
        }
        
      });
      const countryAndCases = {
        country: country,
        cases: cases,
        coordinates: coordinates
      }
      casesByCountry.push(countryAndCases);
    })

    casesByCountry = casesByCountry.sort(function(a, b){return b.cases-a.cases});
    this.setState({confirmedWorld: casesByCountry, countries: countries})

  }

  async getConfirmedCasesFinland () {
     
    const response = await fetch(' https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData');
    let data = await Promise.resolve(response);
    data = await data.json();
    console.log(data)
    this.setState({confirmedFinland: data.confirmed, deathsFinland: data.deaths})
  }


  render() {
    return (
        <div className="App">
        <div className="dataContainer">
          <h1>Covid-19: Finland and the world</h1>
          <FinlandTicker cases={this.state.confirmedFinland} deaths={this.state.deathsFinland} />
          <h2>Situation in other countries</h2>
          <CountryTable countries={this.state.confirmedWorld} />
        </div>
        <div className="mapContainer">
          <Map items={this.state.confirmedWorld} />
        </div>
        

        </div>
      );
  }
  
}

export default App;
