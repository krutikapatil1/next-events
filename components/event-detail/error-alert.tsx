import classes from "./error-alert.module.css";

interface ErrorAlertProps {
  children: any;
}

const ErrorAlert: React.FC<ErrorAlertProps> = (props: ErrorAlertProps) => {
  return <div className={classes.alert}>{props.children}</div>;
};

export default ErrorAlert;
