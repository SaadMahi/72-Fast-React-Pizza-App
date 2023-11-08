import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order, { loader as orderLoader } from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

/** FETCHING ORDERS
 * So here we will be now working on this route over here:
 * * path: '/order/:orderId',
 * and on this order page
 * * <Order />
 * Okay so in URL if we go to /order/randomtext
 * we will get a dummy order on the Ui
 * ! fig: 1
 *
 * So here in <Order/> component we have these fake order
 * ! fig: 2
 * So this order object here is being displayed on the Ui
 *
 * But we want to make this dynamic, so we want to read the order id from here in the URL
 * ! fig: 3
 * then display all the data regarding exact this order on the Ui
 *
 * 1) So first we need to do is implement a way in which we can search for the order
 * So basically we would require a search filed inside the header so we can always
 * access the search functionality from every where.
 * i) now create a search component which will be made in order folder, as it is related to orders
 * ii) once created use that component in header.
 * ? now what do we want to happen when we type something in this search query and hit enter
 * we will want to move to order/userEnteredIdinSearchQuery
 * ! fig: 4
 *
 * ii) So to do the above, let's add condition in handleSubmit
 * a) first if there is no query simply return, else we want to navigate to that page
 * b) for that we will require the navigate function, so for that we will use useNavigate() hook
 * c) let's try entering id now
 * ! fig: 5
 * Hit Enter
 * ! fig 5.1
 * Boom that works...
 * iii) But the data is still dummy, so next up we would have to fetch the data from Api
 * using the getOrder() function that we already have in our apiRestaurant, which will receive exactly that id
 * Also take a note that
 * * path: '/order/:orderId',
 * :orderId. This means that the route will match any URL that follows the pattern "/order/" followed by some value
 * and render us the <Order/> component where we currently have our dummy data's displaying.
 * iv) So what we will be going to do is in <Order/> component, we will get the fetched data of getOrder()
 * by using
 * * loader() function
 * then we will connect this loader function with the Order route
 * then in the Order page we will get that data using  :
 * * useLoaderData()
 *
 * 2) okay so let's do the discussed steps now!
 * i) in <Order/> let's use asyn function to get data with getOrder()
 * ? Now how do we pass in ID to this getOrder() that is passed by user in search input
 * ii) well we can get that using useParams() hook, but problem is that this only works components as it is a hook
 * it won't work in regular function, so let's remove this, but luckily for us React Touter already thought this
 * situation for us, therefore we can pass in some data into the loader function and one of the properties
 * of the object that the laoder function receives is exactly the params, so just destructure that object
 * and get params out of it, then now we pass in the
 * * params.orderId
 * and it is called orderId because that's exactly the name we gave in route
 *  ! fig: 6
 * now just return this order
 * ! fig: 6.1
 *
 * 3) Now our next step is to connect this loading() function in the route
 * i) first we import the loader and rename this as orderLoader as it is a named export so we can name anything
 * * import Order, { loader as orderLoader } from './features/order/Order';
 * ! fig: 7
 * ii) next we connect it
 * ! fig 7.1
 * iii) also let's use the Error handling component in this which we learned and used before
 * ! fig: 7.2
 * Good till here, we got an error on the page, so something is working...
 *
 * ii) Now as a final step we need to get the data from the Loader using
 * * useLoaderData()
 * in order function in <Order/> component
 * ! fig: 8
 * So here we are now getting the data from the Api, highlighted green is the data from api, which is an
 * actual fetched data.
 *
 * So let's try with some other id
 * ! fig: 8.1, 8.2
 * and boom... that's all
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
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  // verification of eslint

  return <RouterProvider router={router}>Hello Vite</RouterProvider>;
}

export default App;
