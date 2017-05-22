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
import ProductosNew from './views/ProductosNew/'
import FichaProducto from './views/Ficha/'
import Gallery from './views/Galeria/'

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="productos" name="Productos" component={Productos}/>
      <Route path="categorias" name="Categorias" component={Category}/>
      <Route path="familias" name="Familias" component={Family}/>
      <Route path="generos" name="Generos" component={Gender}/>
      <Route path="productos/new" name="Nuevo producto" component={ProductosNew}/>
      <Route path="product/:product" name="Ficha producto" component={FichaProducto}/>
      <Route path="product/gallery/:product" name="Galeria de producto" component={Gallery}/>
    </Route>
  </Router>
);
