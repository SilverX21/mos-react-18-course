function Message() {
  //JSX: JavaScript XML
  const name = "Araújo";

  //ao utilizarmos os {} podemos colocar qualquer expressão (pedaço de código que produz um valor) em javascript
  if (name) return <h1>Hello, {name}!</h1>;
  return <h1>Hello, World!</h1>;
}

//para podermos utilizar noutros locaus, fazemos o export da seguinte forma:
export default Message;
