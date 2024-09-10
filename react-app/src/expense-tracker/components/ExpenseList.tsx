import "./ExpenseList.css";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              <button
                onClick={() => onDelete(expense.id)}
                className="btn btn-outline-danger">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            $
            {
              expenses
                .reduce((acc, expense) => expense.amount + acc, 0)
                .toFixed(
                  2
                ) /*o método reduce é um método que existe em todos os arrrays o qual podemos usar para fazer fazer somatórios. o primeiro parametro "acc" é o acumulador, ou seja, vai somando para aquela variável. O segundo "expense" é o objecto. A segunda parte é o valor inicial do somatório, neste caso vai ser zero */
            }
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
