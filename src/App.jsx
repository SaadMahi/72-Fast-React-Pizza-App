import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './starter/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';

const router = createBrowserRouter([
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
]);

/** USING REACT ROUTERS
 * 1) install:
 * * npm i react-router-dom
 *
 * 2) go to react router DOC,
 * i) there we will see different routers
 * ii) now as we want to work with data fetching in react router
 * we will require "createBroswerRouter" let's import it from react-router dom on top
 * * import { createBrowserRouter } from "react-router-dom";
 * iii) so we get a function where we will define our routes and we do that by passing an array of objects
 * where each object is one route, in here we will pass in path and element
 * a) path: '/' means current path
 * b) path: '/menu' means in URL it will show /menu
 * iv) once created save this in a variable called router
 * v) then place it down inside you App function and return a component
 * * <RouterProvider>
 * vi) and this component will take a prop of router we just created
 * v) save and check in output:
 * ! figure: 1, Home page
 * ! figure: 2, Menu page
 *
 * 3) Now let's quickly do a comparison the way this looks with the
 * more traditional approach we used previously in the world wise app
 * i) traditional method:
 * ! figure: 3
 * so here we declared routes in a declarative way
 * we used to browser router component
 * then routes
 * then route, where we defined the path as a prop.
 * This old way still works  even in the modern
 * react router, but this cannot be used to load data or
 * submit data using forms which is not the case in modern way
 *
 * i) modern way:
 * ! figure: 3.1
 * here we are doing it in more imparative way.
 * we are declaring the router outside of the jsx
 * and using a javascript array and doing this is necessary
 * in react router 6.4 in order to enable data fetching or data loading
 * with react router. All the new data loading capabilities are enabled
 * and only possible to be used when we create a 'createBrowserRouter' function
 */

function App() {
  // verification of eslint

  return <RouterProvider router={router}>Hello Vite</RouterProvider>;
}

export default App;
