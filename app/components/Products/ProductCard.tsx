import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';

const { Title } = Typography;
const ProductCard = ({ product, onClick }) => {
  return (
    <a onClick={onClick}>
      <Card size="small" style={{ margin: '4px 5px' }}>
        {/* <p>{product.name}</p>
      <p>{product.price}</p> */}
        <Row>
          <Col flex="auto">
            <Title level={4}>{product.name}</Title>
          </Col>
          <Col flex="120px">
            <Statistic value={product.price} prefix="$" />
          </Col>
        </Row>
      </Card>
    </a>
  );
};

export default React.memo(ProductCard);
