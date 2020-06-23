import React from 'react';
import { Row, Statistic, Divider } from 'antd';
import ProductCard from '../Products/ProductCard';

const InvoiceDetail = ({ invoice }) => {
  return (
    <div>
      <Row justify="center" align="middle">
        TOTAL:
        <Statistic
          prefix="$"
          valueStyle={{ color: '#3f8600' }}
          value={invoice.total}
        />
      </Row>
      <Row justify="center" align="middle">Transferencia: {invoice.bank ? 'Sí' : ''}</Row>
      <Divider>
        Productos
      </Divider>
      {invoice.products && invoice.products.map(p => <ProductCard product={p} />)}
    </div>
  );
};

export default InvoiceDetail;
