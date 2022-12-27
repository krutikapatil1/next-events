import Link from "next/link";
import classes from "./button.module.css";

interface ButtonProps {
  link: string;
  children: any;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <Link href={props.link} className={classes.btn}>
      {props.children}
    </Link>
  );
};

export default Button;
