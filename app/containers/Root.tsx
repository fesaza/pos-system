import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Store } from '../store';
import Routes from '../Routes';
import routes from '../constants/routes.json';
import styles from './Root.css';

const { Header, Content, Footer } = Layout;

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Header>
          <div className={styles.logo} />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="0">
              <Link to={routes.HOME}>Resumen de ventas</Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to={routes.INVOICES}>Ventas</Link>
            </Menu.Item>
            {/* <Menu.Item key="2">
              <Link to={routes.CASHREGISTER}>Turno (Caja)</Link>
            </Menu.Item> */}
            <Menu.Item key="3">
              <Link to={routes.PRODUCTS}>Lista de precios (Productos)</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className={styles.siteContent}
          style={{ padding: '0', margin: '12px 8px' }}
        >
          {/* <Breadcrum style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
          <div
            className={styles.siteLayoutBackground}
            style={{ padding: 24, minHeight: 380 }}
          >
            <Routes />
          </div>
        </Content>
        <Footer className={styles.footer} style={{ textAlign: 'center' }}>
          @kasamassa
        </Footer>
      </Layout>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
