import React, { useCallback, useState, useEffect } from 'react';
import { Button, Table, Space, message, Input } from 'antd';
import routes from '../../constants/routes.json';
import db from '../../database/db';
import { filterProducts } from '../../utils/utils';

const Products = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [productsFilterd, setProductsFilterd] = useState(products);
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle" key={record._id}>
          <a
            onClick={() => {
              history.push('/edit/' + record._id);
            }}
          >
            Editar
          </a>
          <a
            onClick={() => {
              db.products.remove({ _id: record._id }, (err) => {
                if (err) {
                  message.error(JSON.stringify(err));
                } else {
                  message.info('Registro eliminado');
                }
              });
            }}
          >
            Eliminar
          </a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    db.products.find({}, (err: any, docs: []) => {
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
          filterProducts(products, value)
        );
      }
    },
    [products]
  );
  const onNewProduct = useCallback(() => {
    history.push(routes.NEWPRODUCT);
  }, []);
  return (
    <div
      style={{
        height: '70vh',
        overflow: 'scroll',
        padding: '5px',
        paddingTop: '15px',
        width: '100%',
      }}
    >
      <Button onClick={onNewProduct}>Nuevo Producto</Button>
      <Input placeholder="Filtrar productos" onChange={onChangeFilter} />
      <Table columns={columns} dataSource={productsFilterd} />
    </div>
  );
};

export default Products;
