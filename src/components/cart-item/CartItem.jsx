import './CartItem.styles.scss';

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={`${name}`} />
      <div className="cart-item__item-details">
        <span className="cart-item__name">{name}</span>
        <span className="cart-item__price">
          {quantity} x ${price} = ${quantity * price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
