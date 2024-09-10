import { useEffect } from "react";
import useUsers from "../hooks/useUsers";
import { CanceledError } from "../services/api-client";
import userService, { User } from "../services/user-service";

const Users = () => {
  //   const [users, setUsers] = useState<User[]>([]);
  //   const [error, setError] = useState("");
  //const [isLoading, setLoading] = useState(false);
  const { users, error, isLoading, setUsers, setError, setLoading } = useUsers();

  useEffect(() => {
    //aqui usamos o nosso novo hook useUsers

    //se quisermos utilizar chamadas async, não podemos declarar o useEffect como async, pois este não permite receber chamadas aasincronas, para isso temos de fazer o seguinte:
    //podemos colocar isto dentro de um block try catch para lidar com os erros
    // const fetchUsers = async () => {
    //   try {
    //     const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");

    //     setUsers(res.data);
    //   } catch (err) {
    //     !temos de fazer um cast para o error em baixo por que no catch não nos permite definir o tipo de erro que vamos ter
    //     setError((err as AxiosError).message);
    //   }
    // };

    //para efetuarmos a chamada, temos de a chamar dentro do useEffect
    //fetchUsers();

    //é sempre boas práticas criar uma função de clean up depois de ser feita uma chamada ao servidor, para isso, criamos em baixo uma função que vai tratar disso
    //o AbortController existe nos browsers mais recentes o qual ajuda a cancelar operações assincronas que podem demorar algum tempo a executar
    //const controller = new AbortController();

    // setLoading(true);
    //esta chamada vai retornar uma promise. (Promise: An object that holds the eventual result or failure of an asynchronous operation)
    //todas as promises têm um método chamado then()
    //no get do axios estamos a dizer que o tipo de dados vai ser do tipo User[]
    //O catch vai ser executado quando ocorrer um erro durante a execuçãop do get
    //o segundo parametro do get são configurações para a nossa chamada
    // apiClient
    //   .get<User[]>("/users", { signal: controller.signal })
    //   .then((res) => {
    //     setUsers(res.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     if (err instanceof CanceledError) return; //CanceledError é uma classe do axios
    //     setError(err.message);

    //     setLoading(false); //para não termos de usar isto duas vezes, teriamos que usar o finally, que podemos usar depois do catch. Mas, devido ao Strict mode do react, o finally não funciona, daí deixarmos desta forma
    //   });

    //aqui vamos chamar a nossa api
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);

        setLoading(false);
      });

    //aqui chamamos a função abort do AbortController (controller.abort()) para clean up do useEffect. Isto irá ser benéfico quando temos o strict mode ativo, visto que são feitas duas chamadas nesse modo.
    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Nuno Araújo" };
    setUsers([newUser, ...users]);

    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users])) //aqui fazemos o destructure da response (neste caso, teremos que ver qual é a resposta do backend). Quando fazemos { data: savedUser } estamos a dar um alias ao data
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const updatedUser = { ...user, name: user.name + " updated!" };
    const originalUsers = [...users];
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  //o {" "} significa que estamos a dar um espaço entre os dois componentes
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button
        className="btn btn-primary mb-3"
        onClick={() => addUser()}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between">
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}>
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Users;
