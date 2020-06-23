import React, { useEffect, useState } from 'react';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import * as moment from 'moment';
import { Typography } from 'antd';
import db from '../../database/db';
import InvoicesByDay from './InvoicesByDay';

const {Title} = Typography;

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    db.invoices.find({}, (err, docs) => {
      if (!err) {
        //group by date
        const grouped = groupBy(
          docs.map((d) => ({ ...d, onlyDate: moment(d.date).startOf("day") })),
          'onlyDate'
        );
        const invoicesByDays = Object.keys(grouped).map(g => {
          return {
            date: g,
            dateMoment: moment(g),
            invoices: grouped[g]
          }
        })
        setInvoices(orderBy(invoicesByDays, 'dateMoment', 'desc'));
      }
    });
  }, []);
  return (
    <div
      style={{
        height: '80vh',
        overflow: 'scroll',
        padding: '5px',
        paddingTop: '15px',
        width: '100%',
      }}
    >
      <Title>Lista De Ventas</Title>
      {invoices.map((i) => (
        <InvoicesByDay data={i} />
      ))}
    </div>
  );
};

export default InvoicesList;
