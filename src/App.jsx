import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';

/** ROUTERS LOADERS
 * So the idea behind the loader is that, somewhere in our code
 * we create a function that fetches us some data from Api.
 * we then provide that loader function to one of our routes
 * and then that route will fetch data as soon as the application
 * goes to that route and then in the end once the data has arrived.
 * It will be provided to the page component itselfs using a custom hook
 *
 * Let's implement and try this for a better understanding, it is done in 3 steps
 * 1) We create a loader
 * 2) We provide a loader
 * 3) We provide the data to the page
 *
 * Now this data loader can be placed anywhere in our page,
 * but the convention seems to be to place the loader for the data of a certain page
 * inside the file of that page, So in our case as we need to load all the Menu data,
 * So we will do this work in the Menu Component.
 *
 * 3) Once you are now back from Menu (continuation....)
 * i) So we need to connect the loader function to the route,
 * So in order to import the named export we do it like this and also rename it:
 * * import Menu, {loader as menuLoader} from './features/menu/Menu';
 * ii) now in createBrowserRouter, in menu object now we can specify the
 * loader property and then specify the menuLoader as value:
 * *  loader: menuLoader,
 * give it a save and step no. 2 is complete.
 * So now we have successfully provided loader function to the menu route
 * iii) now all we have to do is get that data into the component
 *
 * 4)For that go back to Menu component (continue.. rest over there)
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
        loader: menuLoader,
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
