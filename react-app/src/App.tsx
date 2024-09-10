//para usarmos um componente, podemos fazer o import:
import { useEffect, useState } from "react";
// import { BsFillCalendarFill } from "react-icons/bs";
// import Alert from "./components/Alert";
// import Button from "./components/Button/Button";
// import Like from "./components/Like";
// import ListGroup from "./components/ListGroup"; //podemos fazer desta forma porque criamos o index.ts no
import axios from "axios";
import produce from "immer";
import Users from "./components/Users";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  const items = ["Braga", "Porto", "Lisboa"];
  const [selectedItem, SetSelectedItem] = useState("");
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);
  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });
  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const handleClick = () => {
    // setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
    //aqui vamos usar o método produce, do immer, o qual recebe uma arrow function
    //chamamos draft ao objecto que vamos usar. Este vai tar a par das alterações que vamos fazer ao objecto que queremos
    setBugs(
      produce((draft) => {
        //aqui usamos o draft.find() para encontrar o objecto que queremos
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  const handleClickGame = () => {
    const newgame = {
      ...game,
      player: {
        ...game.player, //fazemos isto caso no futuro se adicione ou remova propriedades deste objecto
        name: "Bob",
      },
    };

    setGame(newgame);
  };

  const handleClickPizza = () => {
    const newPizza = {
      ...pizza,
      toppings: [...pizza.toppings, "Cheese"],
    };

    setPizza(newPizza);
  };

  const handleClickCart = () => {
    // setCart(
    //   produce((draft) => {
    //     const newCart = draft.items.find((cart) => cart.id === 1);
    //     if (newCart) newCart.quantity++;
    //   })
    // );

    setCart({ ...cart, items: cart.items.map((item) => (item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item)) });
  };

  const [expenses, setExpenses] = useState([
    { id: 1, amount: 10, category: "Groceries", description: "teste aaa" },
    { id: 2, amount: 2, category: "Utilities", description: "teste bbb" },
    { id: 3, amount: 7.5, category: "Entertainment", description: "teste ccc" },
    { id: 4, amount: 4.99, category: "Entertainment", description: "teste ddd" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  //aqui não usamos uma variável de state porque se torna redundante. Da forma que temos atualmente podemos calcular isso a partir da selectedCategory
  const visibleExpenses = selectedCategory ? expenses.filter((e) => e.category === selectedCategory) : expenses;

  // const ref = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   if (ref.current) ref.current.focus();
  // });

  // useEffect(() => {
  //   document.title = "My App";
  // });

  // const [category, setCategory] = useState("");

  // const connect = () => console.log("Connecting");
  // const disconnect = () => console.log("Disconnecting");
  // useEffect(() => {
  //   connect();

  //   return () => disconnect();
  // });

  //para utilizar um componente, utilizamos como se fosse uma tag HTML, tanto assim '<Message />' ou assim '<Message></Message>'
  return (
    <div>
      <Users />
      {/* <select
        name=""
        id=""
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}>
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} /> */}
      {/* <input
        ref={ref}
        type="text"
        className="form-control"
      /> */}
      {/* <div className="mb-5">
        <ExpenseForm onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])} />
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)} />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      /> */}
      {/* <Form /> */}
      {/* {bugs.map((bug) => (
        <p key={bug.id}>
          {bug.title} {bug.fixed ? "Fixed" : "New"}
        </p>
      ))}
      <button onClick={handleClick}>Click Me</button>

      <p>Player name: {game.player.name}</p>
      <button onClick={handleClickGame}>Change name</button> */}
      {/* {alertVisible && <Alert onClose={() => setAlertVisibility(false)}>teste</Alert>}
      <Button
        color="primary"
        onClick={() => setAlertVisibility(true)}
      >
        My Button
      </Button>
      <BsFillCalendarFill
        color="red"
        size="40"
      />
      <ListGroup
        heading="Portugal Cities"
        items={items}
        onSelectItem={SetSelectedItem}
      />
      <Like onClick={() => console.log("Clicked!")} /> */}
      {/* <NavBar cartItemsCount={cartItems.length} />
      <Cart
        cartItems={cartItems}
        onClear={() => setCartItems([])}
      />

      <p>Pizza topings:</p>
      <ul>
        {pizza.toppings.map((topping) => (
          <li key={pizza.toppings.indexOf(topping)}>{topping}</li>
        ))}
      </ul>
      <button onClick={handleClickPizza}>Add toppings</button>

      <div>
        <p>Products we have:</p>
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              Name: {item.title} Quantity: {item.quantity}
            </li>
          ))}
        </ul>

        <button onClick={handleClickCart}>Updated quantity</button>
      </div>
      <ExpandableText maxChars={20}>Hello World</ExpandableText> */}
    </div>
  );
}

export default App;
