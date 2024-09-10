import axios, { CanceledError } from "axios";

//aqui estamos a criar o nosso objecto base para as chamadas http com o axios.
//o create vai definir as regras para todos os pedidos que utilizarmos para as chamadas em que se use o objecto em baixo
//em baixo estamos a definir o baseURL, assim não precisamos de estar sempre a passar o url todo sempre que estamos a fazer uma chamada
export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export { CanceledError };
