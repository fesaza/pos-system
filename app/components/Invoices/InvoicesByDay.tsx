import React, { useState } from 'react';
import { Divider, Table, Space, Modal } from 'antd';
import * as moment from 'moment';
import InvoiceDetail from './InvoiceDetail';

const InvoicesByDay = ({data}) => {
  const [currentInvoice, setCurrentInvoice] = useState({});
  const [openDetails, setOpenDetails] = useState(false)
  const onCloseModal = () => {
    setOpenDetails(false);
    setCurrentInvoice({});
  }
  const columns = [
    {
      title: 'Valor',
      dataIndex: 'total',
      key: 'total'
    },{
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => {
        return <span>{moment(text).format("h:mm:ss a")}</span>
      }
    },{
      title: 'Transferencia',
      dataIndex: 'bank',
      key: 'bank',
      render: (text, record) => {
        return <span>{record.bank ? "Sí" : ""}</span>
      }
    },{
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle" key={record._id}>
          <a onClick={() => {
            setCurrentInvoice(record);
            setOpenDetails(true);
          }}>Detalles</a>
        </Space>
      )
    }];
  return (
    <div>
      <Divider>
        {data && moment(data.date).format("DD MMM YYYY")}
      </Divider>
      <Table columns={columns} dataSource={data.invoices} />
      <Modal title="Detalles de factura" visible={openDetails} onCancel={onCloseModal} onOk={onCloseModal}>
        <InvoiceDetail invoice={currentInvoice} />
      </Modal>
    </div>
  );
};

export default InvoicesByDay;
