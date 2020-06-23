import Datastore from 'nedb';

const products = new Datastore({ filename: 'productos.db', autoload: true});
const invoices = new Datastore({ filename: 'invoices.db', autoload: true});
const cashRegister = new Datastore({ filename: 'cashRegister.db', autoload: true});

const db = {
  products,
  invoices,
  cashRegister
}

export default db;
