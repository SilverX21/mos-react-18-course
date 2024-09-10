import { ReactNode } from "react";

//a propriedade children é algo que todos os components têm, desta forma podemos passar HTML para dentro dos components, esta tem de ser do tipo ReactNode
interface Props {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ children, onClose }: Props) => {
  return (
    <div className={"alert alert-primary alert-dismissible"}>
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
