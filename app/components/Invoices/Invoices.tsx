import React, { useState, useEffect, useCallback } from 'react';
import {
  Row,
  Col,
  Input,
  Divider,
  Statistic,
  Button,
  Switch,
  Typography,
  message,
} from 'antd';
import db from '../../database/db';
import ProductCard from '../Products/ProductCard';
const { Text } = Typography;

const Invoices = () => {
  const [products, setProducts] = useState([]);
  const [productsFilterd, setProductsFilterd] = useState(products);
  //TODO: Get this from currentInvoice insted use state
  const [productsAdded, setproductsAdded] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState({ products: []});
  const total = productsAdded.reduce((prev, current) => {
    return prev + Number(current.price);
  }, 0);
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
      const value = e.target.value;
      if (!value) {
        setProductsFilterd(products);
      } else {
        setProductsFilterd(
          products.filter((p) => p.name.includes(value) || p.code === value)
        );
      }
    },
    [products]
  );
  return (
    <Row>
      <Col flex={3}>
        <Input placeholder="Filtrar productos" onChange={onChangeFilter} />
        <Divider>Seleccione los productos</Divider>
        {productsFilterd &&
          productsFilterd.length > 0 &&
          productsFilterd.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onClick={() => {
                const newProducts = [...productsAdded, p];
                setproductsAdded(newProducts);
                setCurrentInvoice({
                  ...currentInvoice,
                  products: newProducts,
                });
              }}
            />
          ))}
      </Col>
      <Col flex={2}>
        <Divider>Productos Agregados</Divider>
        <div
          style={{
            height: '55vh',
            overflow: 'scroll',
            padding: '5px',
            paddingTop: '15px',
            width: '100%',
          }}
        >
          {productsAdded &&
            productsAdded.length > 0 &&
            productsAdded.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onClick={() => {
                  const newProducts = productsAdded.filter(
                    (productAdded) => productAdded._id !== p._id
                  );
                  setproductsAdded(newProducts);
                  setCurrentInvoice({
                    ...currentInvoice,
                    products: newProducts,
                  });
                }}
              />
            ))}
        </div>

        <Divider />
        <Row justify="space-around" align="middle">
          TOTAL A PAGAR:
          <Statistic
            prefix="$"
            valueStyle={{ color: '#3f8600' }}
            value={total}
          />
        </Row>
        <Divider />
        <Row justify="space-between" align="middle">
          <Col>
            <Text>¿Paga Con Transferencia?: </Text>
            <Switch
              checked={currentInvoice.bank}
              onChange={(checked) => {
                setCurrentInvoice({
                  ...currentInvoice,
                  bank: checked,
                });
              }}
            />
          </Col>
          <Col>
            <Button
            disabled={total === 0 || currentInvoice.products.length === 0}
              type="primary"
              size="large"
              onClick={() => {
                db.invoices.insert({ ...currentInvoice, total, date: Date.now() }, (err) => {
                  if(!err){
                    message.success('Factura guardada');
                    setCurrentInvoice({ products: []});
                    setproductsAdded([]);
                    setProductsFilterd(products);
                  }
                });
              }}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Invoices;
