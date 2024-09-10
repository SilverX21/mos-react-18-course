interface Props {
  cartItems: string[];
  //esta função vai notificar o component pai que deve ser feito um update do estado, ou seja, apenas o component que define o estado é que deve ser responsável por o atualizar :)
  onClear: () => void;
}

const Cart = ({ cartItems, onClear }: Props) => {
  return (
    <>
      <div>Cart</div>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button>
    </>
  );
};

export default Cart;
