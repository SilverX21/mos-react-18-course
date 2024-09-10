import "./Table.css";

interface Props {
  categoryItems: {
    id: number;
    description: string;
    amount: number;
    category: string;
  }[];
  onClick: (event: React.MouseEvent) => void;
}

const Table = ({ categoryItems, onClick }: Props) => {
  let total = 0;
  const sum = categoryItems.map((item) => (total += item.amount));

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Category</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {categoryItems.map((item) => (
          <tr key={item.id}>
            <td>{item.description}</td>
            <td>{item.amount}</td>
            <td>{item.category}</td>
            <td>
              <button
                onClick={onClick}
                className="btn btn-outline-danger">
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>{total}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
