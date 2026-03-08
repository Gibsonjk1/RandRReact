import './exercise.css';
import { useState, useEffect } from 'react';

// Example fetching data on component mount
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/exercise')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
}

export default function Exercise() {
    return (
        <div>
            <h1>Exercise</h1>
            <p>List of Exercises goes here</p>
            <DataComponent />
        </div>
    );
}