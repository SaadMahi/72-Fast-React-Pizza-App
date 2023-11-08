import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

/** ERROR HANDLING IN THE MODERN REACT ROUTER
 * So with createBrowserRouter when there is some error that is
 * thrown in a loader, action or simply while rendering a component,
 * We can render an error element instead of these
 * <Home/>, <Menu /> or other components
 * exameple: some error happens in the <Menu/>
 * instead of rendering this <Menu/> we can render and
 * Error element.
 *
 * 1) So let's specify the error element up in
 * the parent route which is <AppLayout/>
 * because the error that will happen in the nested routes
 * they will bubble up to the parent route
 * i) so we use property errorElement and give it's
 * value the Error component(element) we have already made
 * * errorElement: <Error/>
 * make sure to save.
 * ii) now go to browser and try to render a path that doesn't exists
 * ! fig: 1
 * now we moved immediately to the error element, but here we have an temporary message
 * ! fig: 1.1
 * we can actually get the actual error msg that happened inside React router
 * by using yet another custom hook.
 *
 * So since we are using this error component inside this
 * errorElement property:
 * ! fig: 1.2
 * So this Error component(element) get's access to the error that has occured
 *
 * and we get that error using the:
 * * useRouteError() /hook
 * let's log this to console, reload the page and check error on log
 * ! fig: 1.3
 * here we have the status, error,  we have error message
 *
 * let's use the error message:
 * ! fig: 1.4
 *
 * 2) Now let's add an error into the loader
 * ? can you guess how are we going to add error into the Loader
 * yes! while fetching data if the URL is wrong we may land with an error
 * so let's mutate the URL, now as we will try to access this menu
 * ! fig: 2
 *
 * boom we will land to the error page, but here we didn't got the error msg:
 * ! fig: 2.1
 *
 * so in the Error component let's try to add another error and by adding
 * * error.message
 * we finally get the fetch error message
 * ! fig: 2.2
 *
 * 3) However the problem here is that our complete application has been replaced
 * with the whole Error page and that's really not what we want instead in this situation
 * we want the error to be appeared within the layout and so to do that we can place the same error
 * element inside of any of these child routes and in our case it only makes sense to place it
 * in Menu route because this component is the only one that is loading some data so only
 * here things can actually go wrong.
 *
 * So as we do this now you can see the error is nicely within the rest of the application layout
 * ! fig: 3
 */

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
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
