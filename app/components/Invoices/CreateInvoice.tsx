import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Row,
  Col,
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
const defaultInvoice = { products: [] };

const CreateInvoice = ({products, onProductClick, onInvoiceCreated}) => {
  const [currentInvoice, setCurrentInvoice] = useState(defaultInvoice);
  useEffect(() => {
    setCurrentInvoice(prevState => ({
      ...prevState,
      products,
    }));
    return () => {
      setCurrentInvoice(defaultInvoice);
    };
  }, [products]);
  const total = useMemo(
    () =>
      products.reduce((prev, current) => {
        return prev + Number(current.price);
      }, 0),
    [products]
  );
  const onTransferenciaChange = useCallback(
    (checked: boolean) => {
      setCurrentInvoice({
        ...currentInvoice,
        bank: checked,
      });
    },
    [currentInvoice]
  );

  const onSave = useCallback(() => {
    db.invoices.insert(
      { ...currentInvoice, total, date: Date.now() },
      (err: any) => {
        if (!err) {
          message.success('Factura guardada');
          setCurrentInvoice({ products: [] });
          onInvoiceCreated();
        }
      }
    );
  }, [currentInvoice, onInvoiceCreated, total]);
  return (
    <>
      <Divider>Productos Agregados</Divider>
      <div
        style={{
          height: '50vh',
          overflow: 'scroll',
          padding: '5px',
          paddingTop: '15px',
          width: '100%',
        }}
      >
        {products &&
          products.length > 0 &&
          products.map((p, index) => (
            <ProductCard
              key={p._id + index}
              product={p}
              onClick={() => {
                onProductClick(p, index);
              }}
            />
          ))}
      </div>

      <Divider />
      <Row justify="space-around" align="middle">
        TOTAL A PAGAR:
        <Statistic prefix="$" valueStyle={{ color: '#3f8600' }} value={total} />
      </Row>
      <Divider />
      <Row justify="space-between" align="middle">
        <Col>
          <Text>¿Paga Con Transferencia?: </Text>
          <Switch
            checked={currentInvoice.bank}
            onChange={onTransferenciaChange}
          />
        </Col>
        <Col>
          <Button
            disabled={total === 0 || currentInvoice.products.length === 0}
            type="primary"
            size="large"
            onClick={onSave}
          >
            Guardar
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(CreateInvoice);
