import React from 'react';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
//import Cart from './pages/Cart';

import MainLayout from './layouts/MainLayout';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';

import './scss/app.scss';

// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
// пример исп-я 'react-loadable'
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div className="container">Идёт загрузка карзины ...</div>,
});
const NotFound = React.lazy(() => import(/* webpackChunkName:  "NotFound" */ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div className="container">Идёт загрузка ...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div className="container">Идёт загрузка ...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div className="container">Идёт загрузка ...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
