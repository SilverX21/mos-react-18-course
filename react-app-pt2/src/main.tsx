import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//QueryClient -> é o objeto principal que usar para fazer cache e gerir dados remotos no React Query
//esta classe QueryClient recebe um objeto para configurar o react query globalmente
//existem 3 momentos em que o raect query faz um auto refresh dos dados que tem em cache:
//1. Quando há um reconnect da internet
//2. Quando um component é montado (mount)
//2. quando o user sai e volta à janela do browser da app
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2, //número de vezes que  react query tenta caso o fetch não esteja a funcionar (default = 3)
//       cacheTime: 300_000, //equivale a 5 minutos, após isto a cache vai ser limpa graças à garbage collection
//       staleTime: 10 * 1000, //equivale a 10 segundos, isto quer dizer quanto tempo é que os dados são considerados atualizados (default = 0, isto quer dizer que o react query vai fazer um fetch na próxima chamada porque considera que os dados já não se encontram atualizados)
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//       refetchOnMount: true,
//     },
//   },
// });
const queryClient = new QueryClient();

//QueryClientProvider ->

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* devemos passar o queryClient desta forma para podermos utilizar o React Query na nossa app */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/*devemos adicionar os devtools do React Query depois do componente App, se fizermos o build para prod, este component não será incluído*/}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
