import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import { Button, Menu } from 'antd';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Kasa Massa POS</h2>
      {/* <Link to={routes.COUNTER}>Ventas</Link>
      <Link to={routes.COUNTER}>Turnos (Caja)</Link>
      <Link to={routes.COUNTER}>Listado de precios</Link> */}
    </div>
  );
}
