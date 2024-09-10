import create from "./http-service";

export interface User {
  id: number;
  name: string;
}

//V1
// class UserService {
//   getAllUsers() {
//     const controller = new AbortController();
//     const request = apiClient.get<User[]>("/users", { signal: controller.signal });

//     //aqui, vamos devolver duas propriedades: uma request com o resultado da request feita, e um cancel token para que se possa fazer o cancelamento/abortar a request
//     return { request, cancel: () => controller.abort() };
//   }

//   deleteUser(id: number) {
//     return apiClient.delete("/users/" + id);
//   }

//   createUser(user: User) {
//     return apiClient.post("/users", user);
//   }

//   updateUser(user: User) {
//     //put => faz um replace de um objecto inteiro
//     //patch => faz update de uma ou mais propriedades do objecto
//     return apiClient.patch("/users/" + user.id, { user });
//   }
// }

export default create("/users");
