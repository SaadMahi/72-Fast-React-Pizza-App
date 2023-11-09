/* eslint-disable no-unused-vars */
import { Form, redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

/** WRITE & MUTATE DATA ON SERVER
 * So the loader() we used previously are to read data
 * In a similar way Action's are used to write or mutate data that is stored on the server
 * So from the project requirements order's are made by sending a POST request with the order data to the Api
 * and so these actions and forms that we just talked about are ideal to create new order's.
 * So here we already have a form created below
 *
 * 1) So in order to make this form work nicely, we need to replace
 * this form tag with a Form component that React router gives us
 * * <Form></Form>
 * i) in this we need to specify a method which is going to be a POST request
 * * <Form method='POST' ></Form>
 * ii) we will also specify a action where we could write the path that this form should be submitted to
 * * <Form method='POST' action='/order/new' ></Form>
 * but this is not going to be necessary as React router simply matches the closest route so
 * let's remove action and continue but i have shown this here because doing this also works
 *
 * 2) Now only doing these won't do anything, so now we need to create an Action
 * i) this is similar to the loading() that we created earlier
 * ii) so we will be creating a function at the bottom that we will be exporting from here named
 * * action() // We call it by default action as a convention
 * iii) Now as soon as we submit this special Form that will then create a request that will basically be intercepted
 * by this action() as soon as we have connected with React Router(in the App.js route)
 * ! fig: 1
 * iv) so to sum up: as soon as this special Form is submitted behind the scenes React router will then call this
 * * action() function
 * and it will pass in the request that was submitted, and then here we can get access to that request
 * * action({request}){}
 * v) so in this function now let's create a variable formData
 * and inside we await for
 * * request.formData() //  formData() this is just a regular web api which is provided by the browser
 * vi) now make the whole function an async function, and one thing to be noted is it is compulsory to return
 * something, so for now let's return null
 *
 * 3) Now as a final step we need to connect this action to the route in App.js
 * ! fig: 1
 * i) first we need to import it and as it is a named export let's name it as we want
 * ! fig: 2
 *
 * ii) now let's specify the action property and we pass in value that we imported just
 * ! fig: 2.1
 * Now whenever there will be new form submission on this route /order/new then this action we specified will
 * be called let's try submitting form and check what we get
 * ! fig: 3
 * we have something here, but we cannot see it here, so let's convert it to an object so we can see,
 * ! fig: 3.1
 * now we can see, great!
 *
 * So it's a bit difficult to work with this formData object here but this part
 * * const data = Object.fromEntries(dormData)
 * is not so important! consider this as an standard receipe which we will be always need to follow
 * but what matters is it was really really easy to get all this data out of the form into this function\
 *
 * Also notice how this entire form works completely without any javascript and without any onSubmit handlers
 * So we only have this <Form> and react router takes care of the rest, we also didn't created any state variables
 * for each of these input fields so react-router do all of these automatically without us having to do anything
 *
 * 4) Now we need to get our cart data into this action()
 * * const cart = fakeCart;
 * we want to submit it into the form, so we can get access to it into the action
 * i) so there's a way to get data into action() with it being in a form field
 * ii) for that we require to use a hidden input, we need to use this anywhere in the form
 * * <input type='hidden' name='cart' value={JSON.stringify(cart)}
 * here we used stringify as cart is currently object so we need to convert this into a string
 * iii) So when we do this and submit, this will be shown in our formData as well in console if we logged, let's
 * fill and submit the form:
 * ! fig: 4, 4.1
 *
 * 5) Now what about this priority field ?
 * we need to check it and then again submit and we will get that too, so now our priority is on
 * ! fig: 5
 * i) now we want this priority to be in the data that we are going to submit and it should be true or false not 'on'
 * ! fig: 5.1
 * now our priority is true and ourcart data is in array now, so no we have the data into the shape in what we wanted
 * it to be, now we can use it to create new order, so we already have an api end point for that in apiRestaurant.js
 * in this we have createOrder function which receives new order object as an argument
 * ! fig: 6
 * now this createOrder function returns a newly created object, so the new order is actually returned. So the
 * nice thing about that is that we can now await that here using await and then what we want to do is immediately
 * redirect the page to the order/id, so basically showing the user all the information about that order.
 * But we cannot do this using the navigate function as it comes from calling the useNavigate hook but we cannot call
 * hooks inside the function it is only called inside the components, so here we will use another function
 * which is called
 * * redirect() function
 * this is another function provided to us by React router which basically will just create a new response or a new
 * request, im really not sure what it creates but it's not so really important, what matters is behind the scenes
 * these all works with the web api's standard request and response api's so if from here we will return a response
 * react router will automatically go to the URL that is contained in that new response so this redirect() will
 * actually create that response which we can see right here
 * ! fig: 7
 * So all we have to do is, specify the new URL, ${newOder.id} this id would have been created on the server by Api
 * ! fig: 7.1
 * Let's submit the form again
 * ! fig: 7.2
 * So here we just got our order
 *
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
          <button>Order now</button>
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

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
