import React, { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  // const [userId, setUserId] = useState<number>();
  // const { data, error, isLoading } = usePosts(userId);

  //versão com paginação normal
  const pageSize = 10;
  // const [page, setPage] = useState(1);
  // const { data, error, isLoading } = usePosts({ page, pageSize });

  //versão com paginação infinita
  //o fetchNextPage irá chamar o getNextPageParam ppara calcular as páginas e de seguida executa o fetch dos dados
  //o isFetchingNextPage diz se o react query está a ir  buscar a próxima página, é para ajudar a previnir chamadas múltiplas enquanto está a executar a função
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {/* <select
        onChange={(event) => setUserId(parseInt(event.target.value))}
        value={userId}
        className="form-select mb-3"
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select> 
      <ul className="list-group">
        {data?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-primary my-3"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary my-3 ms-1"
      >
        Next
      </button>
      */}

      <ul className="list-group">
        {data.pages.map(
          (
            page, //fazemos desta forma porque o data, neste momento, é um objeto de InfinteQuery, o qual lá dentro tem o objeto pages, que tem os dados que pretendemos. Depois disso fazemos o map novamente para podermos iterar sobre a pagina. usamos um React.Fragment porque não queremos renderizar html desnecessário
            index
          ) => (
            <React.Fragment key={index}>
              {page.map((post) => (
                <li key={post.id} className="list-group-item">
                  {post.title}
                </li>
              ))}
            </React.Fragment>
          )
        )}
      </ul>

      <button
        className="btn btn-primary my-3 ms-1"
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;
