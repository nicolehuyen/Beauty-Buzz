import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import AllProducts from '../components/AllProducts/AllProducts';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import ProductCategory from '../components/ProductCategory/ProductCategory';
import CreateProduct from '../components/CreateProduct/CreateProduct';
import UpdateProduct from '../components/UpdateProduct/UpdateProduct';
import ManageProducts from '../components/ManageProducts/ManageProducts';
import LandingPage from '../components/LandingPage/LandingPage';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import ShoppingBag from '../components/ShoppingBag/ShoppingBag';
import PurchaseHistory from '../components/PurchaseHistory/PurchaseHistory';
import OrderDetails from '../components/OrderDetails/OrderDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
        path: "bag",
        element: <ShoppingBag />,
      },
      {
        path: "purchases",
        element: <PurchaseHistory />,
      },
      {
        path: "purchases/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ],
  },
]);
