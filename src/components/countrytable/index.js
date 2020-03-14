import React from 'react';
import './style.css';

const CountryTable = ({ countries }) => {
  return (
    <div className="countryTable">
     <h2>Situation in other countries</h2>
          {countries.map(country => {
            return (
              <div className="casesByCountry" key={`${country.country}-${country.cases}`}>

            <span className="countryLabel">{country.country}:</span> <span className="countryCases">{country.cases}</span>
                
              </div>
            )
          })}
    </div>
  );
}
export default CountryTable;