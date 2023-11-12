// Test ID: IIDSAT

import OrderItem from './OrderItem';

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';

function Order() {
  const order = useLoaderData();

  /** FETCHING DATA WITHOUT NAVIGATION
   * So sometimes we need to fetch data from another routes,
   * data that is not associated with the current page or any page we want it on
   * but we want to do that without causing the navigation sometimes.
   *
   * For example lets say here in the order page, we need to fetch
   * data of menu fetch which we did before, So we have already written all the
   * logic of fetching data but it is associated to another route (Menu route).
   *
   * So we want to fetch that data on order page using something and as we already
   * wrote that logic there's no point writing that logic again. So in other
   * words we want to use the data from menu route but without the user going there and
   * for that we will be using
   * * useFetcher() // hook
   *
   * now what we want to do is that from that data which we will fetch
   * we need to get ingredients from there and use it here:
   * ! fig: 1
   *
   * So we can get that data from the menu route.
   * i) So as soon as this Order component mounts, we want to fetch that
   * menu data using our fetcher
   * ii) and to do this on component mount, we will have to use the useEffect hook
   * iii) so the way we use this fetcher is simply by calling
   * * fetcher.load('./menu'); //with name of the route
   * So this will load the data and store it in the fetcher object and then later
   * we can retrieve the data from there when we want
   * iv) and also remember to provide condition, fetch this data only when
   * data is not there, so remember same like navigation we did before
   * this fetcher also has 3 states: idle, loading and submitting. So by default
   * its state is idle. So only start fetching it's data when ever the fetcher is
   * in idle state
   * * if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
   * v) and also include the fetcher in the dependencies array.
   * vi) now our data has started fetching let's check in network tab
   * ! fig: 2
   * Also let's log our fetched data
   * ! fig: 3
   * Now we want to pass ingredients data from here to these each orders
   * ! fig: 4
   * Let's also add the loading state
   * ! fig: 5
   *
   * vii) now as we have passed in the props let's use these two in that
   * component
   * ! fig: 6
   * done...
   *
   * 2) but a problem occurs when we search for the order id
   * ! fig: 7
   *
   * i) so the solution to this is that if this highlighted part doesn't exists
   * let's return an empty array, so this will fix the problem
   * ! fig: 8
   * That's because this join trying to join undefined
   * ! fig: 9
   */

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex  flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2 ">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex  flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
