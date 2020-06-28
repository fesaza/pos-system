/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Products from './components/Products';
import ProductForm from './components/Products/ProductForm';
import Invoices from './components/Invoices';
import CashRegister from './components/CashRegister';


// Lazily load routes and code split with webpacck
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
// );

// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );<

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.PRODUCTS} component={Products} />
        <Route path={routes.NEWPRODUCT} component={ProductForm} />
        <Route path="/edit/:id" component={ProductForm} />
        <Route path={routes.INVOICES} component={Invoices} />
        <Route path={routes.CASHREGISTER} component={CashRegister} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
