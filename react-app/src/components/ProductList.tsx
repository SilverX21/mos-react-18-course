import { useEffect, useState } from "react";

//se as nossas props forem muito simples, podemos defini-las como temos em baixo: { category }: { category: string }
const ProductList = ({ category }: { category: string }) => {
  //aqui definimos que o useState vai ter algo do tipo string[]
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetcing products in ", category);
    setProducts(["Clothing", "Household"]);
  }, [category]); //este segundo argumento é um array de dependências, pelo que vai ajudar a controlar o useEffect. Se não passarmos nada significa que não há depedências a controlar, pelo que o React vai apenas redenrizar uma vez o componente. Aqui estamos a passar o category, ou seja, sempre que o category alterar o React irá renderizar o componente
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product}>
            {product} for {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
