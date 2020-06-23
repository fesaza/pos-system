import React, { useCallback, useState } from 'react'
import { Button, Table, Space, message } from 'antd'
import routes from '../../constants/routes.json'
import db from '../../database/db'

const Products = ({history}) => {
  const [products, setProducts] = useState([]);
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle" key={record._id}>
          <a onClick={() => {
            history.push("/edit/" + record._id);
          }}>Editar</a>
          <a onClick={() => {
            db.products.remove({_id: record._id}, (err) => {
              if(err){
                message.error(JSON.stringify(err));
              } else {
                message.info("Registro eliminado");
              }
            })
          }}>Eliminar</a>
        </Space>
      )
    }
  ]
  db.products.find({}, (err, docs) => {
    if(!err){
      setProducts(docs);
    }
  })
  const onNewProduct = useCallback(
    () => {
      history.push(routes.NEWPRODUCT);
    },
    [],
  )
  return (
    <div>
      <Button onClick={onNewProduct}>Nuevo Producto</Button>
      <Table columns={columns} dataSource={products} />
    </div>
  )
}

export default Products
