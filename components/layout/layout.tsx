import { Fragment } from "react";
import MainHeader from "./main-header";

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
