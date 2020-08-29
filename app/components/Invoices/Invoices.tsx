/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Input, Divider } from 'antd';
import db from '../../database/db';
import ProductCard from '../Products/ProductCard';
import CreateInvoice from './CreateInvoice';
import { filterProductByName } from '../../utils/utils';

const Invoices = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  // const [productsFilterd, setProductsFilterd] = useState(products);
  const [productsAdded, setproductsAdded] = useState([]);

  useEffect(() => {
    const cb = (err, docs) => {
      if (!err) {
        setProducts(docs);
      }
    };
    if (!filter) {
      db.products.find({}).limit(12).exec(cb);
    } else {
      db.products
        .find({
          $where() {
            return filterProductByName(this, filter);
          },
        })
        .limit(12)
        .exec(cb);
    }
  }, [filter]);

  const onChangeFilter = useCallback((e) => {
    const { value } = e.target;
    setFilter(value);
  }, []);

  /**
   * When the user clicks an item on the invoice that item will be removed
   */
  const onProductInvoiceClick = useCallback(
    (p) => {
      let alreadyDeleted = false;
      const newProducts = productsAdded.map((productAdded) => {
        if (alreadyDeleted) return productAdded;
        if (p._id === productAdded._id) {
          alreadyDeleted = true;
          return null;
        }
        return productAdded;
      });
      setproductsAdded(newProducts.filter((x) => x));
    },
    [productsAdded]
  );

  /**
   * Restart filter and products added
   */
  const onInvoiceCreated = useCallback(() => {
    setproductsAdded([]);
    setFilter('');
    // setProductsFilterd(products);
  }, []);

  return (
    <Row>
      <Col flex={3}>
        <Input
          placeholder="Filtrar productos"
          onChange={onChangeFilter}
          value={filter}
        />
        <Divider>Seleccione los productos</Divider>
        <div
          style={{
            height: '70vh',
            overflow: 'scroll',
            padding: '5px',
            paddingTop: '15px',
            width: '100%',
          }}
        >
          {products &&
            products.length > 0 &&
            products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onClick={() => {
                  const newProducts = [...productsAdded, p];
                  setproductsAdded(newProducts);
                }}
              />
            ))}
        </div>
      </Col>
      <Col flex={2}>
        <CreateInvoice
          products={productsAdded}
          onProductClick={onProductInvoiceClick}
          onInvoiceCreated={onInvoiceCreated}
        />
      </Col>
    </Row>
  );
};

export default React.memo(Invoices);
