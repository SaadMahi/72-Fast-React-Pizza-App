import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

/** IMPLEMENTING LOADER
 * Let's integrate the loading functionality, that should appear
 * when we go into menu and till the data fetches loading should appear.
 * But as we haven't implemented the loading effect what happens is
 * when we click the menu page a small delay appears between the click and the actual data arriving
 * So during this time we want to display a loading spinner
 *
 * 1) Now before we display the spinner  we need to make sure
 * i) if the application is currently idle
 * ii) whether it is loading
 * iii) if it is submitting
 * Now to get information about these we can use the
 * * useNavigation() /hook
 * And this information will be for the entire application, not just for a particular page,
 * It will be for this entire router:
 * ! fig: 1
 * So if one of these pages are loading, then the navigation state will become loading,
 * no matter which of these pages is actually being loaded.
 *
 * 2) Therefore creating loading indicator for only fetching menu items doesn't makes sense.
 * ? Now where should we create this loader
 * So let's create a one big generic loader right in the <AppLayout/>
 * * const navigation = useNavigation()
 * let's log it to console and check:
 * ! fig: 2
 * you will find the state as 'idle' in log
 *
 * But as soon as we click the menu button the state goes into 'loading'
 * ! fig: 2.1
 * and as soon as page finished loading the state become 'idle' again
 * ! fig: 2.2
 *
 * 3) So using the above information, we can now basically create our own isLoading
 * variable
 * * const isLoading = navigation.state === 'loading';
 * so now whenever this isLoading is true, we now want to render that loading indicator
 * i) create a Loader.jsx component in ui folder
 * ii) now to display that loading indicator, it will be a big loader
 * that will overlay the entire page
 * iii) we will cover the loader on entire page later, for now
 * let's give a condition where we display loader if that state is in loading condition
 * and let's try that by click the menu where we fetch pizza's data.
 * So as we click
 * ! figure 3, ! figure 3.1
 * And boom!!!! that's it....
 */

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className='layout'>
      {isLoading && <Loader />}

      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
};

export default AppLayout;
