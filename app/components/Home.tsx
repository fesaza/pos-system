import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import { Button, Menu } from 'antd';
import InvoicesList from './Invoices/InvoicesList';

export default function Home(): JSX.Element {
  return (
    <InvoicesList />
  );
}
