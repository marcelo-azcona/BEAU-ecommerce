import { useSelector } from 'react-redux';
import { RootState } from '../../store-redux-toolkit/store';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import './CheckOut.styles.scss';

const CheckOut = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const calculateTotal = () => {
    return cartItems.length > 0
      ? cartItems.reduce((accumulator, item) => {
          return accumulator + item.price * item.quantity;
        }, 0)
      : '';
  };

  return (
    <div className="checkout">
      <div className="checkout__header">
        <div className="checkout__column">
          <span>Product</span>
        </div>
        <div className="checkout__column">
          <span>Description</span>
        </div>
        <div className="checkout__column">
          <span>Quantity</span>
        </div>
        <div className="checkout__column">
          <span>Price</span>
        </div>
        <div className="checkout__column">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <span className="checkout__total">Total: ${calculateTotal()}</span>
      {/* <PaymentForm /> */}
    </div>
  );
};

export default CheckOut;
