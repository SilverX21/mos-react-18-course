import styles from "./Button.module.css";

//adicionamos o "?" na propriedade "color" para dizer que ela é opcional
//os valores que colocamos no color, significa que quem tiver a usar este component apenas pode passar aqueles valores, ou seja, só pode escolher este valores. a "|" é um union, ou seja, ao fazer isto podemos passar os valores que pretendemos e damos assim mais opções
interface Props {
  children: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  onClick: () => void;
}

// a propriedade color tem um valor default de "primary"
const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button
      type="button"
      className={[styles.btn, styles["btn-" + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
