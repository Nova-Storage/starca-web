import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
const Pool = require('pg').PoolW
const pool = new Pool({
  user: process.env.REACT_APP_PGUSER,
  host: process.env.REACT_APP_PGHOST,
  database: process.env.REACT_APP_PGDATABASE,
  password: process.env.REACT_APP_PGPASSWORD,
  port: process.env.REACT_APP_PGPORT
});

module.exports = pool;


const getTestUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM testuser', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}*/
/*
const { Client } = require('pg')

const connectDb = async () => {
  try {
    const client = new Client({
      user: process.env.REACT_APP_PGUSER,
      host: process.env.REACT_APP_PGHOST,
      database: process.env.REACT_APP_PGDATABASE,
      password: process.env.REACT_APP_PGPASSWORD,
      port: process.env.REACT_APP_PGPORT
    })
    
    await client.connect()
    const res = await client.query('SELECT * FROM testuser')
    console.log(res)
    await client.end()
  } catch (error) {
    console.log(error)
  }
}

connectDb()*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
