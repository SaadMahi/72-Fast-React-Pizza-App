import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';

/** NESTING ROUTE
 * 1) import the AppLayout
 * 2) create a new object in createBrowserRouter, and use the imported AppLayout
 * 3) do not give any path, doing so will make it a layout route. A route with only
 * purpose of providing a layout to the application
 ** {
 **   element: <AppLayout/>
 ** }
 * 4) Now to make all of the routes below AppLayout's child route(nested route)
 * i) we define children property, and pass in a new array of routes
 ** {
 **   element: <AppLayout/>
 **   children: []
 ** }
 * ii) pass in all routes which needs to be nested inside the AppLayout
 * 5) Now we need to render the content of nested routes
 * i) So in Applayout we have, CartOverview contents and we see a
 * link Open cart ->, which will Cart component, so how do we now render the
 * Cart component Ui ?
 * ! figure 1, 1.1
 * in these figure you can see nothing happpens !
 * ii) So to bring output, we will use the <Outlet/> component in App layout:
 * ! figure 2
 *
 * 6) So to sum up,
 * i) we created the <AppLayout/> component, which we want to use as a parent route
 * of our every single other other route that we have in our application, that's why
 * we placed <AppLayout/> at the top and then we made all the other routes, child routes
 * of the App layout, so they are all nested routes now.
 * ii) So then inside the the parent route which is <AppLayout/>, we used the <Outlet/>
 * component to render what ever is the current nested route.
 */

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
      },
    ],
  },
]);

function App() {
  // verification of eslint

  return <RouterProvider router={router}>Hello Vite</RouterProvider>;
}

export default App;
