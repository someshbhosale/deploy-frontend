import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ElectionResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      const response = await axios.get('https://deploy-backend-three.vercel.app/api/results');
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setError('Error fetching results. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 6000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  const predefinedColors = ["#ff944d", "#ffb84d", "#C23B78", "#4bc0c0", "#19AAED", "#8bb036"];

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {results.slice(0, results.length - 1).map((result, index) => {
          const colorIndex = index % predefinedColors.length;
          const backgroundColor = predefinedColors[colorIndex];
          return (
            <div key={index} className="col-sm-2 col-sm-3">
              <div className="grid-box" style={{ backgroundColor }}>
                <h6>{result.party}</h6><br></br>
                <h2><strong>{result.total}</strong></h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card custom-card shadow-sm">
            <div className="card-header">Party Wise Results</div>
            <div className="card-body">
              <div className="table-responsive">
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left' }}>Party</th>
                        <th style={{ textAlign: 'right' }}>Won</th>
                        <th style={{ textAlign: 'right' }}>Leading</th>
                        <th style={{ textAlign: 'right' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index}>
                          <td style={{ textAlign: 'left' }}>{result.party}</td>
                          <td style={{ textAlign: 'right' }}>{result.won}</td>
                          <td style={{ textAlign: 'right' }}>{result.leading}</td>
                          <td style={{ textAlign: 'right' }}>{result.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionResults;
