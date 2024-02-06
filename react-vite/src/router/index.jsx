import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllProducts from '../components/AllProducts/AllProducts';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import ProductCategory from '../components/ProductCategory/ProductCategory';
import CreateProduct from '../components/CreateProduct/CreateProduct';
import UpdateProduct from '../components/UpdateProduct/UpdateProduct';
import ManageProducts from '../components/ManageProducts/ManageProducts';
import LandingPage from '../components/LandingPage/LandingPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products/category/:category",
        element: <ProductCategory />,
      },
      {
        path: "products/new",
        element: <CreateProduct />,
      },
      {
        path: "products/:productId/edit",
        element: <UpdateProduct />,
      },
      {
        path: "products/manage",
        element: <ManageProducts />,
      },
      {
        path: "*",
        element: <h2>Page Not Found</h2>
      }
    ],
  },
]);
