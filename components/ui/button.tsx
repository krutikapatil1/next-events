import Link from "next/link";
import classes from "./button.module.css";

interface ButtonProps {
  link?: string;
  children: any;
  onClick: any;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  );
};

export default Button;
