import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import AddItems from './components/AddItems/AddItems.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import AllProduct from './components/AllProduct/AllProduct.jsx';
import Earbuds from './components/Earbuds/Earbuds.jsx';
import SmartWatch from './components/SmartWatch/SmartWatch.jsx';
import Earphone from './components/Earphone/Earphone.jsx';
import Adapter from './components/Adapter/Adapter.jsx';
import PowerBank from './components/PowerBank/PowerBank.jsx';
import Speaker from './components/Speaker/Speaker.jsx';
import Microphone from './components/Microphone/Microphone.jsx';
import Fan from './components/Fan/Fan.jsx';
import Cover from './components/Cover/Cover.jsx';
import { HelmetProvider } from 'react-helmet-async';
import Search from './components/Search/Search.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import AuthProvider from './components/Providers/AuthProvider.jsx';
import PrivateRoute from './components/Routes/PrivateRoute.jsx';
import Profile from './components/Profile/Profile.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Cart from './components/Cart/Cart.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import UpdateItem from './components/UpdateItem/UpdateItem.jsx';
import ManageItem from './components/ManageItem/ManageItem.jsx';
import UnauthorizedPage from './components/UnauthorizedPage/UnauthorizedPage.jsx';
import Payment from './components/Payment/Payment.jsx';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess.jsx';
import PaymentFail from './components/PaymentFail/PaymentFail.jsx';
import Ordered from './components/Ordered/Ordered.jsx';
import ManageOrder from './components/ManageOrder/ManageOrder.jsx';
import OrderDetails from './components/OrderDetails/OrderDetails.jsx';
import AllUser from './components/AllUser/AllUser.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/product/:id', element: <ProductDetails /> },
      { path: '/all-product', element: <AllProduct /> },
      { path: '/earbuds', element: <Earbuds /> },
      { path: '/smartwatch', element: <SmartWatch /> },
      { path: '/earphone', element: <Earphone /> },
      { path: '/adapter', element: <Adapter /> },
      { path: '/power-bank', element: <PowerBank /> },
      { path: '/speaker', element: <Speaker /> },
      { path: '/microphone', element: <Microphone /> },
      { path: '/fan', element: <Fan /> },
      { path: '/cover', element: <Cover /> },
      { path: '/search', element: <Search /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/payment/success/:tranId', element: <PrivateRoute><PaymentSuccess /></PrivateRoute> },
      { path: '/payment/fail/:tranId', element: <PrivateRoute><PaymentFail /></PrivateRoute> },
      { path: '/profile', element: <PrivateRoute><Profile /></PrivateRoute> },
      { path: '/order', element: <PrivateRoute><Ordered /></PrivateRoute> },
      { path: '/cart', element: <PrivateRoute><Cart /></PrivateRoute> },
      { path: '/payment', element: <PrivateRoute><Payment /></PrivateRoute> },
      { path: '/add', element: <PrivateRoute><AddItems /></PrivateRoute> },
      {
        path: '/update/:id',
        element: <PrivateRoute><UpdateItem /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://server-6685.onrender.com/product/${params.id}`),
      },
      { path: '/manage', element: <PrivateRoute><ManageItem /></PrivateRoute> },
      { path: '/order/:tran_id', element: <PrivateRoute><OrderDetails /></PrivateRoute> },
      { path: '/all-users', element: <PrivateRoute><AllUser /></PrivateRoute> },
      { path: '/manage-order', element: <PrivateRoute><ManageOrder /></PrivateRoute> },
      { path: '/unauthorized', element: <UnauthorizedPage /> }, 
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <div className='bg-[#59C6D2]/10'>
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
