import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';

const { Title } = Typography;
const ProductCard = ({ product, onClick }) => {
  let price = product.price;
  if (product.amount) {
    price *= product.amount;
  }
  return (
    <a onClick={onClick}>
      <Card size="small" style={{ margin: '4px 5px' }}>
        {/* <p>{product.name}</p>
      <p>{product.price}</p> */}
        <Row>
          <Col flex="auto">
            <Row>
              <Title level={4}>{product.name}</Title>
              {product.amount && product.amount > 1 && (
                <Statistic
                  style={{
                    margin: '0 5px',
                  }}
                  value={product.amount}
                  valueStyle={{ color: '#3f8600' }}
                  prefix=":"
                  suffix="Unidades"
                />
              )}
            </Row>
          </Col>
          <Col flex="140px">
            <Statistic value={price} prefix="$" />
          </Col>
        </Row>
      </Card>
    </a>
  );
};

export default React.memo(ProductCard);
