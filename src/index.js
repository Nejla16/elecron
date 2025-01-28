import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

//pages
import ProductPage from './pages/ProductPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartProductsPage from './pages/CartProductsPage';
import FavoriteProductsPage from './pages/FavoriteProductsPage';

const router = createBrowserRouter([
  //mainRouter
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProductPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/productDetails/:id',
        element: <ProductDetailsPage />
      },
      {
        path: '/cartProducts',
        element: <CartProductsPage />
      },
      {
        path: '/favoriteProducts',
        element: <FavoriteProductsPage />
      }
    ],
  }
  //deshboard example

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
