import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

//aqui usamos o zod para definir algumas regras no schema do form, aqui estamos a passar os tipos de dados e requisitos para cada propriedade
//conseguimos passar mensagens de erro custom e muito mais, podemos ver aqui a documentação: https://zod.dev/
const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  age: z.number({ invalid_type_error: "Age field is required." }).min(18, { message: "Age must be at least 18." }),
});

//aqui estamos a dizer ao zod que o tipo de dados vai sero que está no schema que definimos anteriormente
type FormData = z.infer<typeof schema>;

const Form = () => {
  //o useRef é mais um hook do React, o qual referencia um elemento da DOM. As boas práticas é dar o valor inicial de null
  //guardamos o valor numa constante e temos de fazer com que este esteja associado a um elemento do nosso HTML, o qual é o input "name". Para isso referenciamos ao colocar o ref={nameRef} como temos no HTML
  //este useRef tem de ser do tipo HTMLInputElement, isto porque temos que indicar que tipo de elemento HTML é que este está a fazer a referência
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };

  // !version - useRef
  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault();

  //aqui, não podemos referenciar diretamente o value se usermos o useRef normal, senão dá o erro seguinte: Property 'value' does not exist on type 'never'
  //   if (nameRef.current !== null) person.name = nameRef.current.value;
  //   if (ageRef.current !== null) person.age = parseInt(ageRef.current.value); //aqui temos de converter o value para um number

  //   console.log(person);
  // };

  // !version - useState
  //version - useState
  // const [person1, setPerson1] = useState({
  //   name: "",
  //   age: 0,
  // });

  // !version - useForm library
  //aqui estamos a pegar nas funções register e hadleSubmit. O register teremos que lhe passar o nome da variável que se quer seguir, ou seja, poderemos criar um register para cada campo input do form. O handleSubmit irá tratar do que vai acontecer quando o usar fizer submit do form
  //o formState é um objecto com vários detalhes sobre o form, como erros e outros tantos. Dentro deste estamos a fazer o destructor do objecto (nested destructuring) da seguinte forma: formState: {errors}
  //passamos o FormData ao useForm para que este possa depois saber que propriedades irão existir para o form e para ter intellisense
  //dentro do useForm, passamos um objecto o qual vai ter o resolver, o qual vai receber o nosso schema. Isto vai ajudar a fazer as validações
  //também podemos usar o isValid, o qual diz se o formulário está válido ou não
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => console.log(data);

  // !version - useForm library
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label
          htmlFor="name"
          className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label
          htmlFor="age"
          className="form-label">
          Age
        </label>
        <input
          {
            ...register("age", {
              valueAsNumber: true,
            }) /*visto que os values do inputs são sempre string, aqui estamos a dizer que este campo vai ser do tipo number */
          }
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button
        disabled={!isValid}
        className="btn btn-primary"
        type="submit">
        Submit
      </button>
    </form>
  );

  // !version - useRef
  // !para os forms temos o onSubmit, o qual funciona tal como o onClick event
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div className="mb-3">
  //       <label
  //         htmlFor="name"
  //         className="form-label">
  //         Name
  //       </label>
  //       <input
  //         ref={nameRef}
  //         id="name"
  //         type="text"
  //         className="form-control"
  //       />
  //     </div>
  //     <div className="mb-3">
  //       <label
  //         htmlFor="age"
  //         className="form-label">
  //         Age
  //       </label>
  //       <input
  //         ref={ageRef}
  //         id="age"
  //         type="number"
  //         className="form-control"
  //       />
  //     </div>
  //     <button
  //       className="btn btn-primary"
  //       type="submit">
  //       Submit
  //     </button>
  //   </form>
  // );

  //!version - useState
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <div className="mb-3">
  //         <label
  //           htmlFor="name"
  //           className="form-label">
  //           Name
  //         </label>
  //         <input
  //           onChange={(event) => setPerson1({ ...person, name: event.target.value })}
  //           value={person.name}
  //           id="name"
  //           type="text"
  //           className="form-control"
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label
  //           htmlFor="age"
  //           className="form-label">
  //           Age
  //         </label>
  //         <input
  //           onChange={(event) => setPerson1({ ...person, age: parseInt(event.target.value) })}
  //           value={person.age}
  //           id="age"
  //           type="number"
  //           className="form-control"
  //         />
  //       </div>
  //       <button
  //         className="btn btn-primary"
  //         type="submit">
  //         Submit
  //       </button>
  //     </form>
  //   );
};
export default Form;
