import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';
import { Divider, Table, Space, Modal, Row, Statistic } from 'antd';
import * as moment from 'moment';
import InvoiceDetail from './InvoiceDetail';

const InvoicesByDay = ({ data }) => {
  const [currentInvoice, setCurrentInvoice] = useState({});
  const [openDetails, setOpenDetails] = useState(false);
  const onCloseModal = () => {
    setOpenDetails(false);
    setCurrentInvoice({});
  };
  const columns = [
    {
      title: 'Valor',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => {
        return <span>{moment(text).format('h:mm:ss a')}</span>;
      },
    },
    {
      title: 'Transferencia',
      dataIndex: 'bank',
      key: 'bank',
      render: (text, record) => {
        return <span>{record.bank ? 'Sí' : ''}</span>;
      },
    },
    {
      title: 'Acciones',
      key: 'acciones',
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <Space size="middle" key={record._id}>
          <a
            onClick={() => {
              setCurrentInvoice(record);
              setOpenDetails(true);
            }}
          >
            Detalles
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Divider>{data && moment(data.date).format('DD MMM YYYY')}</Divider>
      <Row justify="space-around" align="middle">
        TOTAL DEL DÍA:
        <Statistic
          prefix="$"
          valueStyle={{ color: '#3f8600' }}
          value={data.invoices.reduce((prev, next) => {
            return prev + Number(next.total);
          }, 0)}
        />
        TOTAL DEL DÍA (EFECTIVO):
        <Statistic
          prefix="$"
          valueStyle={{ color: '#3f8600' }}
          value={data.invoices.reduce((prev, next) => {
            if (!next.bank) {
              return prev + Number(next.total);
            }
            return prev;
          }, 0)}
        />
        TOTAL DEL DÍA (TRANSFERENCIAS):
        <Statistic
          prefix="$"
          valueStyle={{ color: '#3f8600' }}
          value={data.invoices.reduce((prev, next) => {
            if (next.bank) {
              return prev + Number(next.total);
            }
            return prev;
          }, 0)}
        />
      </Row>
      <Table
        columns={columns}
        dataSource={orderBy(data.invoices, 'date', 'desc')}
      />
      <Modal
        title="Detalles de factura"
        visible={openDetails}
        onCancel={onCloseModal}
        onOk={onCloseModal}
      >
        <InvoiceDetail invoice={currentInvoice} />
      </Modal>
    </div>
  );
};

export default InvoicesByDay;
