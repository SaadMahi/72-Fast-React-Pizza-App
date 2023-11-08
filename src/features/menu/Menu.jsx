/* eslint-disable no-unused-vars */
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

/** CREATING THE LOADER FUNCTION
 * 1) convention is to call this function a loader
 * * function loader(){}
 * Next this function needs to fetch data and then return it.
 *
 * ? Now where are we going to get the data from
 * i) that's where the apiRestaurant.js file comes into play.
 * ! refer ApiResturant component data // to see code of this page below
 * a) in this file you can see we have multiple functions,
 * getMenu
 * get order // based on id
 * createOrder
 * updateOrder
 * b) But here what matter's is that the company as already given us their URL
 * which is on the top you can see
 * c) so we have abstracted the function right in this file, so now we can use this
 * into our loader function, ofcourse we could have placed the logic of getMenu()
 * directly in the loader as well instead of keeping it in apiRestaurant.js file,
 * but it's alot better to have this kind of logic into a central place also because this might
 * be necessary in some different places and also because we centralise the API_URL, so
 * it's definitely nice to abstract the logic away here.
 *
 * 2) Now in loader function we just need to call that function.
 * i) so let's save the result into variable called menu
 * ii) and then we await calling the getMenu()
 * iii) as we await for calling the menu, this
 * loader function will have to be now async function,
 * which we also need to export. So we will use a named export
 * on this function
 * iv) return the menu at the end
 *
 * 3) Now let's move towards the second step
 * i) we need to connect the loader function to the route,
 * So now get back to App.jsx where we have our Menu used in route, (continue.. rest over there)
 *
 * 4) Now all we have to do is get that fetched data into this component
 * for that we need to use customer hook called:
 * * useLoaderData()
 * i) in this we don't have to pass in anything into the function
 * because React router will automatically know that the data that we want here
 * is the one that is associated to this page and that data is coming from loadMenu we
 * used in createBrowserRouter object in menu route
 * *  loader: menuLoader,
 * ii) let's log this to the console and check so we need to store it in variable to do that
 * * const menu = useLoaderData();
 * ! refer figure 1
 * as soon as we click the menu data is fetched
 * ! refer figure 1.1 // see data fetching
 *
 * So a new fetch request fired up automatically and on console we can see our menu data
 * ! fig: 2
 *
 * 5) So everything worked and we have successfully connected our loader function to this menu page
 * i) so what we have done here is to render as you fetch strategy and the nice thing about it is that
 * React router will start fetching data at the same time as it starts rendering the correct route,
 * So these things really happen at the same time, while what we used to do with useEffect was always fetch data
 * on render approach, we basically we rendred the component first, then after the component was already rendred
 * is when we started to fetch the data so that would create something called data loading waterfall, but
 * that case is not here. But that's not the case here and it's really a modern way to do.
 * ii) So now react router is no longer only responsible for matching component to URL's
 * in the browser but also provide data that is necessary for each page , and in this case to provide menu data
 * using the menuLoader to the Menu page
 */

function Menu() {
  const menu = useLoaderData();
  console.log(menu);

  return <h1>Menu</h1>;
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
