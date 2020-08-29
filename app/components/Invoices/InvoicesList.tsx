import React, { useEffect, useState, useCallback } from 'react';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import * as moment from 'moment';
import { Typography, Switch } from 'antd';
import db from '../../database/db';
import InvoicesByDay from './InvoicesByDay';

const { Title, Text } = Typography;

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  useEffect(() => {
    db.invoices.find({}, (err, docs) => {
      if (!err) {
        //group by date
        const grouped = groupBy(
          docs
            .filter((d) => !!d.date)
            .map((d) => ({ ...d, onlyDate: moment(d.date).startOf('day') })),
          'onlyDate'
        );
        const invoicesByDays = Object.keys(grouped).map((g) => {
          return {
            date: g,
            dateMoment: moment(g),
            invoices: grouped[g],
          };
        });
        const invs = orderBy(invoicesByDays, 'dateMoment', 'desc');
        if (viewAll) {
          setInvoices(invs);
        } else {
          setInvoices(invs.slice(0, 5));
        }
      }
    });
  }, [viewAll]);
  const onChangeViewAll = useCallback(() => {
    setViewAll((prev) => !prev);
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
      <Text>Ver las ventas de todos los días? (Lento): </Text>
      <Switch checked={viewAll} onChange={onChangeViewAll} />
      {invoices.map((i) => (
        <InvoicesByDay key={i._id} data={i} />
      ))}
    </div>
  );
};

export default InvoicesList;
