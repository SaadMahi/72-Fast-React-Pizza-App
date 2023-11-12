/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

/** UPDATING DATA WITHOUT NAVIGATION
 * Idea is to make this order a priority order if priorirty was not selected
 * before placing the order
 * ! fig: 1
 *
 * 1) Now to write data we won't use fetcher.load but instead we will use form component
 * that fetcher provides to us. So basically we will wrap this button into a form
 * * <fetcher.Form></fetcher.Form>
 * the syntax looks starnge but this is actually a component, it's just like this
 * react router form we worked with before
 * ! fig: 2
 * the only difference is that submitting that Form creates a new navigation
 * while fetcher.Form will not navigate away, it will simply submit the form
 * and revalidate the page.
 *
 * i) let's set the method in it to PATCH
 *  * <fetcher.Form method='PATCH'></fetcher.Form>
 * because we will update the order
 *
 * 2) Now let's write actual logic to update the order and to do that we require ACTION
 * i) so let's create and export a async function which should be called action by default
 * and so here we get access to the request and the params
 * ii) next we need to connect this action with the page and we need to wire everything
 * up into our route definition we need to connect this action we created to page
 * iii) so et's come to our toute defnitions
 * ! fig: 3
 * here we need to connect to this marked green route
 * iv) first we need to import this action here
 * ! fig: 4
 * v) then connect it to this route
 * ! fig: 4.1
 * Note form that we need to handle will work even though it's an child component of
 *  this Order component as react router is smart enough to figure this out
 *
 * 3) now our form is connect with the action we created, to verify that
 * ! fig: 5
 * i) now let's set the priority to true on the current order, So usually when we do
 * some kind of data updating we will then have a couple of inputs in this form,
 * but in our case all we have is a Button component, So in this case we do not require to
 * read any data from the request, so we don't need that request which we get in action
 * function
 * ii) So now we need to use this updateOrder function, and as we can see
 * it is a PATCH request, which is one of a two ways of updating data, so the two methods
 * are PUT request where we need to pass in the entire new updated object and then
 * there is PATCH which will only take in data that has been changed and add that to the
 * original object to the server
 * ! fig: 6
 * So long story short all we need to pass in this function is the id of the order
 * that should be updated and only the data that should be updated
 * i) So the data that should be updated is only the priority field
 * and it should be set to true always and the priority button should be
 * visible only if the priority is false so in this async function we turned that on
 * ! fig: 7
 * ii) then let's await updateOrder function which needs the current id
 * and the data, now from where do we get that id from, luckily we have this params obj
 * which is still able to give us the information about the current URL of order ID which
 * contains the order id
 * ! fig: 8
 * and that's it
 * ! fig: 9
 * iii) And as soon as we click the priority button
 * ! fig: 10
 * everything changes up, boom...
 *
 * 4) So this is the power of revalaidation, So revalidation basically means react router
 * knows that the data has changed as a result of this action we created and so when ever
 * this happens it automatically refetches the data in the background and then rerender the
 * page with that new data and that's how this is fetcher.Form is so helpful, so this
 * form can be used to update some data without causing a navigation and remember
 * this will be used when you will be building highly interactive applications you
 * will also be able to use some input fields in this fetcher.Form if we want
 */

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}
