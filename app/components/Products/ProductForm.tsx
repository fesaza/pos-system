import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Icon, message, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import db from '../../database/db';
import routes from '../../constants/routes.json';

const defaultValues = { name: '', price: '', code: '', _id: '' };

const ProductForm = ({ history, match }) => {
  const [product, setProduct] = useState(defaultValues);
  useEffect(() => {
    if (match.params.id) {
      db.products.findOne({ _id: match.params.id }, (err, doc) => {
        setProduct(doc);
      });
    }
  }, [match.params.id]);
  return (
    <Formik
      initialValues={product}
      enableReinitialize
      validationSchema={Yup.object({
        name: Yup.string().required('Requerido'),
        price: Yup.number()
          .positive('Debe ser mayor que cero')
          .required('Requerido'),
        code: Yup.string().required('Requerido'),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (values._id) {
          db.products.update({ _id: values._id }, values, {}, (err) => {
            if (err) {
              message.error(JSON.stringify(err));
            } else {
              message.info('Registro guardado');
            }
            setSubmitting(false);
          });
        } else {
          db.products.insert(values, (err) => {
            if (err) {
              message.error(JSON.stringify(err));
            } else {
              message.info('Registro guardado');
              resetForm();
            }
            setSubmitting(false);
          });
        }
      }}
      render={({ isValid, isSubmitting, values }) => (
        <Form>
          <FormItem label="Nombre">
            <>
              <Field
                name="name"
                render={({ field }) => {
                  return <Input {...field} />;
                }}
              />
              <ErrorMessage name="name" />
            </>
          </FormItem>
          <FormItem label="Precio">
            <Field
              name="price"
              render={({ field }) => {
                return <Input {...field} />;
              }}
            />
            <ErrorMessage name="price" />
          </FormItem>

          <FormItem label="Códugo">
            <Field
              name="code"
              render={({ field }) => {
                return <Input {...field} />;
              }}
            />
            <ErrorMessage name="code" />
          </FormItem>
          <Button
            type="primary"
            disabled={!isValid || isSubmitting}
            htmlType="submit"
          >
            Guardar
          </Button>
          <Button onClick={() => history.push(routes.PRODUCTS)}>Cancelar</Button>
          {/* {values._id && <Button onClick={() => history.push(routes.NEWPRODUCT)}>Nuevo</Button>} */}
        </Form>
      )}
    />
  );
};

export default ProductForm;
