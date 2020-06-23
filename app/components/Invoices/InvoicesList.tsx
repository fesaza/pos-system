import React, { useEffect, useState } from 'react';
import groupBy from 'lodash/groupBy';
import * as moment from 'moment';
import { Divider } from 'antd';
import db from '../../database/db';
import InvoicesByDay from './InvoicesByDay';

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
        const newInv = Object.keys(grouped).map(g => {
          return {
            date: g,
            invoices: grouped[g]
          }
        })
        setInvoices(newInv);
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
      <Divider>Lista de ventas</Divider>
      {invoices.map((i) => (
        <InvoicesByDay data={i} />
      ))}
    </div>
  );
};

export default InvoicesList;
