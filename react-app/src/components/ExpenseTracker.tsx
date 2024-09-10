import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

interface FormProps {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const schema = z.object({
  description: z.string().min(3, { message: "Description should be at least 3 characters." }),
  amount: z.number({ invalid_type_error: "Amount field is required." }).min(0, { message: "Amount must be at least 0." }),
  category: z.number({ invalid_type_error: "Category field is required." }),
});

type FormData = z.infer<typeof schema>;
// const [categoryItems, setCategoryItems] = useState([
//   {
//     id: 0,
//     description: "",
//     amount: 0,
//     category: "",
//   },
// ]);
const ExpenseTracker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    //categoryItems.push({id: parseInt(data.id), description: });
    //setCategoryItems(categoryItems);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label
          htmlFor="description"
          className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>

      <div className="mb-3">
        <label
          htmlFor="amount"
          className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      </div>

      <div className="mb-3">
        <label
          htmlFor="category"
          className="form-label">
          Category
        </label>
        <select
          {...register("category", { valueAsNumber: true })}
          className="form-select"
          id="category">
          <option></option>
          <option value="1">Groceries</option>
          <option value="2">Utilities</option>
          <option value="3">Entertainment</option>
        </select>
        {errors.category && <p className="text-danger">{errors.category.message}</p>}
      </div>
      <button
        type="submit"
        className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseTracker;
