import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  //quando usamos o useQuery, do React Query, devemos passar um objeto com duas configurações:
  //queryKey -> é a key para a qual vamos usar para identificar a cache, de forma a podermos ir buscar dados. Passamos um array de um ou mais valores. O primeiro valor, normalmente, é uma uma string, a qual identifica qual os dados que vamos guardar na cache
  //queryFn -> recebe uma função a qual vai buscar os dados do backend, a qual deve devolver uma promise a qual devolve dados ou um erro. Aqui devemos guardar em cache os dados do backend (objeto concreto e não um objeto, pro exemplo do axios, o qual uma das propriedades é "data" com a resposta do servidor)
  //se a chamada para o servidor falhar, o React Query vai tentar algumas vezes automaticamente
  //Podemos tbm configurar o react Query para fazer refresh após algum tempo, ou seja, após algum tempo, ele vai limpar os dados
  //quando chamamos o hook useQuery, devemos especificar: qual o tipo de dados que esperamos do backend e de seguida qual o tipo de erro que vamos receber: useQuery<ReturnDataType, ErrorType>({...})
  //do useQuery podemos ir buscar algumas propriedades, como data (dados que pedimos na request), error e o isLoading
  // const { data: todos, error, isLoading } = useQuery<Todo[], Error>({ queryKey: ["todos"], queryFn: fetchTodos });

  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 10 * 1000, //aqui podemos definir que para esta query, o stale time é de 10 segundos, ou seja, passados 10 segundos o react query vai voltar a fazer o fetch dos dados
  });
};

export default useTodos;
