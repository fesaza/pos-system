import React, { useEffect, useState } from 'react';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import { Typography, Card, Progress, Statistic, Row, Col } from 'antd';
import db from '../../../database/db';

const ProductTotalSale = ({ name, total, maxPrice, amount }) => {
  return (
    <Card style={{ margin: 0 }}>
      <Row>
        <Col span={8}>
          <Typography.Text>{name}</Typography.Text>
        </Col>
        <Col span={8} offset={8}>
          <Typography.Text>
            Cantidad:
            {amount}
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Progress
          style={{
            width: '85%',
          }}
          percent={(total / maxPrice) * 100}
          format={(percent) => {
            return <Statistic value={total} prefix="$" />;
          }}
        />
      </Row>
    </Card>
  );
};

const TopSales = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    db.invoices.find({}, (err, docs: []) => {
      if (err) {
        setItems([]);
      }

      const products = docs.reduce((prev, current) => {
        return prev.concat(current.products).map((p) => ({
          _id: p._id,
          name: p.name,
          price: p.price,
        }));
      }, []);

      const productsGrouped = groupBy(products, '_id');

      const totalSales = Object.keys(productsGrouped).map((id) => {
        return {
          _id: id,
          name: productsGrouped[id][0].name,
          amount: productsGrouped[id].length,
          total: productsGrouped[id].reduce(
            (prev, current) => prev + Number(current.price),
            0
          ),
        };
      });

      setItems(orderBy(totalSales, 'total', 'desc'));
    });
  }, []);
  return (
    <>
      {items.length > 0 &&
        items.map((i) => (
          <ProductTotalSale key={i._id} {...i} maxPrice={items[0].total} />
        ))}
    </>
  );
};

export default TopSales;
