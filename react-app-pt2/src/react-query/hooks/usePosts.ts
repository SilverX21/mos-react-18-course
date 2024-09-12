import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
//versão com paginação normal
// interface PostQuery {
//   page: number;
//   pageSize: number;
// }

//versão com paginação infinita
interface PostQuery {
  pageSize: number;
}

//versão com filtro de users
// const usePosts = (userId: number | undefined) => {
//   const fetchPosts = () =>
//     axios
//       .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
//         params: { userId },
//       })
//       .then((res) => res.data);

//   return useQuery<Post[], Error>({
//     queryKey: userId ? ["users", userId, "posts"] : ["posts"], //a nossa key tem este aspeto porque estamo-nos a gerir pela hierarquia, tendo que vai depender dos users que posts (dados) vão aparecer. É o mesmo design dos padrões dos urls, seria algo deste género: users/1/posts. à medida que vamos avançando, fica mais especifico do que se trata. Sempre que este id mudar, o código é executado novamente
//     queryFn: fetchPosts,
//     staleTime: 1 * 60 * 1000,
//   });
//};

//versão com paginação normal: botão de andar para a frente e para trás
// const usePosts = (query: PostQuery) => {
//   return useQuery<Post[], Error>({
//     queryKey: ["posts", query],
//     queryFn: () =>
//       axios
//         .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
//           params: {
//             _start: (query.page - 1) * query.pageSize,
//             _limit: query.pageSize,
//           },
//         })
//         .then((res) => res.data),
//     staleTime: 1 * 60 * 1000,
//     keepPreviousData: true, //isto ajuda a melhorar a usabilidade, com a lista, quando carregavamos em next, ele saltava para cima e tirava o user do fundo, assim isso não acontece
//   });

//versão com query infinita
const usePosts = (query: PostQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: (
      {
        pageParam = 1,
      } /* como boa prática, inicializamos para 1, para quando precisamos da primeira página */
    ) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true, //isto ajuda a melhorar a usabilidade, com a lista, quando carregavamos em next, ele saltava para cima e tirava o user do fundo, assim isso não acontece
    getNextPageParam: (lastPage, allPages) => {
      //lastPage => contém um array de posts
      //allPages é um array de arrays, ou seja, cada elemento dentro deste objeto é um array com arrays lá dentro
      //aqui, devemos retornar a próxima página, ou seja, se tivermos na página 1, temos de retornar a página 2
      return lastPage.length > 0 ? allPages.length + 1 : undefined; //aqui vai depender de um backend para outro, para o json placeholder, podemos fazer desta forma
      //o react query, quando carrega no botão para carregar mais páginas, ele vai chamar esta função e depois vai devolver para a queryFn que definimos em cima. Aí devemos passar o número da páginaa
    },
  });

export default usePosts;
