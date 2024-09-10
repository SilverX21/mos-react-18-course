import { useState } from "react";
//ao fazermos desta forma em vez de um import normal, é que cada classe que tiver dentro do ListGroup.module.css irá ser como que um objecto dentro do styles, o qual depois podemos aceder
// import styles from "./ListGroup.module.css";
import styled from "styled-components";
import "./ListGroup.css";

//para usarmos os styled components, usamos da forma que está em baixo. Isto irá retornar um component React, o qual poderemos usar em baixo na versão V2
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

//para fazermos como estavamos a fazer na v1, onde viamos o que távamos a receber para aplicar a class css, temos de criar uma interface e depois passamos as propriedades que pretendemos
interface ListItemProps {
  active: boolean;
}

//aqui passamos as props para depois podermos utilizar as propriedades deste component e aplicar os estilos
const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background: ${(props) => (props.active ? "blue" : "none")};
`;

//aqui definimos um interface para o nosso component ListGroup, isto vai permitir que depois, sempre que se queira usar este componente em algum lado, será necessário passar o que está dentro para o mesmo
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void; //aqui definimos uma função
}

//o que fazemos nos parametros é destructuring, basicamente pega nas propriedades do objeto e coloca-as devidamente em cada parametro
function ListGroup({ items, heading, onSelectItem }: Props) {
  //isto é um event handler, o que este deve fazer é tratar de eventos, neste caso é um evento Click
  //const handleClick = (event: MouseEvent) => console.log(event);

  //isto é um hook, o que nos permite aceder a algumas features do React
  //o useState deveolve um array e vamos precisar de duas coisas
  //a primeira posição do array vai ser a nossa variável com o state -> selectedIndex
  //a segunda posição do array será uma função para fazer o update do valor da variável
  //o valor que vai dentro do setState é o valor inicial para a propriedade
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found 😱</p>}
      {/* para podermos aceder depois à propriedades do styles, temos que usar [] se a classe tiver separada por "-", senão acedemos como se fosse uma propriedade */}
      {/* se quisermos utilizar mais do que uma classe aqui, teriamos que usar [] e passar lá dentro as propriedades que queremos aplicar e depois fazemos o join separado por um espaço " , algo deste género: <ul className={[styles.listGroup, styles.container].join(" ")}>*/}
      {/*para aplicarmos styling inline, teremos que fazer style={{...}} e passar o nome das propriedades. Estas terão o nome delas em camel case*/}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );

  //V2
  // return (
  //   <>
  //     <h1>{heading}</h1>
  //     {items.length === 0 && <p>No items found 😱</p>}
  //     <List className="list-group">
  //       {items.map((item, index) => (
  //         <ListItem
  //           active={index === selectedIndex}
  //           key={item}
  //           onClick={() => {
  //             setSelectedIndex(index);
  //             onSelectItem(item);
  //           }}
  //         >
  //           {item}
  //         </ListItem>
  //       ))}
  //     </List>
  //   </>
  // );
}

//quando utilizamos react nas nossas apps, passamos a usar "className" para definir as classes de css. A keyword "class" está reservada para algumas  coisas do React
//utilizamos o Fragment para não termos de renderizar mais elementos, para isso temos de importar do react o "Fragment" outra forma de fazermos isso, sem importar o Fragment, é usar o <> ... </>
//se renderizarmos uma lista de elementos sem uma key, o react vai-se queixar e vai pedir para colocar uma "key" para cada elemento na lista, isto porque assim é mais fácil conseguir perceber que cada elemento é único. Par aisso, utilizamos a key (exemplo em cima)
//em cima, usamos o && porque é um truque muito usado por devs de react. Basicamente, em JS, se a primeira expressão for verdadeira, irá dar o resultado do que vem a seguir, senão vai dar false:
//true && 1 -> 1
//true && "Test" -> "Test"
//false && "Test" -> false

export default ListGroup;
