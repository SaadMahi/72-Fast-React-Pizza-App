/* eslint-disable no-unused-vars */
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

/** Error handling in Form Action
 * So we want to disable this button as we click on it
 * ! figure 1
 * So we can do that once again with the help of useNavigation hook because earlier remeber we we played
 * with useNavigation and we found that the navigation state can either be idle, loading or submitting
 * and so we can do something very similar to what we did here,
 * ! figure 2
 * here we showed loading indicator whenever the navigation state was loading, let's do something similar to
 * navigatio.submitting, let's do it in here createOrder component
 * ! figure 3
 * now all we have to do is use it inside the button
 * ! figure 4
 * Okay good...
 *
 * 1) Now let's work on the error handling part, by error handling i mean that there might happen some error
 * while submitting these forms, eg:
 * phone number might have alphabets, so it will pass but that's not a valid phone number, So we can
 * check for this number right here in our action
 * ! fig: 5
 * then if it is not correct then we can tell our form that the error is right in the field of tel input
 * i) So let's create an errors object first
 * ! fig: 6
 * so if there is some errors here, we will return immediately and no new order is created on the server
 * and we also don't get redirected to the other order page and if everything is okay we will be redirected
 * ii) now there might be question what is this isValidPhone ?
 * well that was not answered in the lecture
 * ! fig: 7
 * ok so now within this CreateOrder component
 * ! fig: 8
 * is connected with this action
 * ! fig: 8.1
 * and therefore in this component
 * ! fig: 8
 * we can get access to the data that is returned from that action, so it is another custom hook
 * that we will need here that is
 * * useActionData()
 * notice this hook is not called something like useActionError's as it is used for any data, but the
 * most common use case of this hook is what we are about to do now, so to return some errors that we can
 * display on the form Ui
 * ! fig: 9
 * Now let's display something immediately after tel input and let's test it
 * ! fig: 10
 * that works....
 *
 * 2) So to recap and sum up what we just did
 * * if (!isValidPhone(order.phone))
 * this above was clearly not valid and therefore we added phone property to the error object
 * which was empty
 * ii) next as object length or key length was greater than 0 that means error exists now so then the error
 * object was returned immediately, so new order was then not created.
 * iii) then in the compoent that is connected to the Action we can get access to whatever was returned
 * from that action incase there was no submission.
 * iv) So this is how we do error handling in forms using this technique i just showed, so basically that's
 * returning something from the actions and receiving that here in the form in order to display the error msg
 * like this and with this we actually wrap up this initial react router data loading section
 */

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      <Form method='POST'>
        <div>
          <label>First Name</label>
          <input type='text' name='customer' required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type='tel' name='phone' required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type='text' name='address' required />
          </div>
        </div>

        <div>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>Want to yo give your order priority?</label>
        </div>
        <input type='hidden' name='cart' value={JSON.stringify(cart)} />
        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = ` Please give us your correct phone number. We
  might need it to contact you`;

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
