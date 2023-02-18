import './Checkout.css';

export default function Checkout() {

  return (
    <>
    <h1>Checkout</h1>
    <p>Where do you want us to send the order?</p>
    <form>
      <label for='fname'>First name</label><br/>
      <input name='fname'></input><br/>
      <label for='lname'>Last name</label><br/>
      <input name='lname'></input><br/>
      <label for='street'>Street</label><br/>
      <input name='street'></input><br/>
      <label for='nr'>Number</label><br/>
      <input name='nr'></input><br/>
      <label for='zip'>Postal code</label><br/>
      <input name='zip'></input><br/>
      <label for='town'>Town</label><br/>
      <input name='town'></input><br/>
    </form>
    <button className='checkout-button-stripe'>Check out with Stripe</button>
    </>
  ); 
};
        