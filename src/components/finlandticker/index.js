import React from 'react';
import './style.css';

const FinlandTicker = ({ cases, deaths }) => {
  return (
    <div className="finlandTicker">
     <h2>Situation in Finland</h2>
      <div className="finCases"><span className="finCaseNumber">{cases.length}</span> <br />
      <span className="finCaseLabel">Confirmed cases</span><br />
      <span className="deathsFin">Deaths: {deaths.length}</span>
      </div>
    </div>
  );
}
export default FinlandTicker;