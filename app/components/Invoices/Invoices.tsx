import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Input, Divider } from 'antd';
import db from '../../database/db';
import ProductCard from '../Products/ProductCard';
import { filterProducts } from '../../utils/utils';
import CreateInvoice from './CreateInvoice';

const Invoices = () => {
  const [products, setProducts] = useState([]);
  const [productsFilterd, setProductsFilterd] = useState(products);
  const [productsAdded, setproductsAdded] = useState([]);

  useEffect(() => {
    db.products.find({}, (err, docs) => {
      if (!err) {
        setProducts(docs);
        setProductsFilterd(docs);
      }
    });
  }, []);

  const onChangeFilter = useCallback(
    (e) => {
      const { value } = e.target;
      if (!value) {
        setProductsFilterd(products);
      } else {
        setProductsFilterd(filterProducts(products, value));
      }
    },
    [products]
  );

  /**
   * When the user clicks an item on the invoice that item will be removed
   */
  const onProductInvoiceClick = useCallback(() => {
    const newProducts = products.filter(
      (productAdded) => productAdded._id !== p._id
    );
    setproductsAdded(newProducts);
  }, [products]);

  /**
   * Restart filter and products added
   */
  const onInvoiceCreated = useCallback(() => {
    setproductsAdded([]);
    setProductsFilterd(products);
  }, [products]);

  return (
    <Row>
      <Col flex={3}>
        <Input placeholder="Filtrar productos" onChange={onChangeFilter} />
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
          {productsFilterd &&
            productsFilterd.length > 0 &&
            productsFilterd.map((p) => (
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
