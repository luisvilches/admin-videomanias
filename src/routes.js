import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Containers
import Full from './containers/Full/'
// import Simple from './containers/Simple/'

import Dashboard from './views/Dashboard/'
import Productos from './views/Productos/'
import Category from './views/Category/'
import Family from './views/Family/'
import Gender from './views/Gender/'
import Banner from './views/Banners/'
import BannerGallery from './views/BannersGallery/'
import Publicidad from './views/Publicidad/'
import ProductosNew from './views/ProductosNew/'
import FichaProducto from './views/Ficha/'
import Gallery from './views/Galeria/'
import Users from './views/Users/'
import Transactions from './views/Transactions/'
import TransactionsDetails from './views/TransactionsDetails/TransactionsDetails'
import Clients from './views/Clients/'

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Productos" component={Full}>
      <IndexRoute component={Productos}/>
      <Route path="productos" name="Productos" component={Productos}/>
      <Route path="categorias" name="Categorias" component={Category}/>
      <Route path="banners" name="Banners" component={Banner}/>
      <Route path="banners/gallery/:category" name="Galleria de banners" component={BannerGallery}/>
      <Route path="publicidad" name="Banners publicitarios" component={Publicidad}/>
      <Route path="familias" name="Familias" component={Family}/>
      <Route path="generos" name="Generos" component={Gender}/>
      <Route path="productos/new" name="Nuevo producto" component={ProductosNew}/>
      <Route path="product/:product" name="Ficha producto" component={FichaProducto}/>
      <Route path="product/gallery/:product" name="Galeria de producto" component={Gallery}/>
      <Route path="clients" name="Clientes" component={Clients}/>
      <Route path="transactions" name="Transacciones" component={Transactions}/>
      <Route path="TransactionsDetails/:token" name="Transacciones" component={TransactionsDetails}/>
      <Route path="users" name="Administracion de usuarios" component={Users}/>
    </Route>
  </Router>
);
