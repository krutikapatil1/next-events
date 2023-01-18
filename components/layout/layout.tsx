import { Fragment, useContext } from "react";
import NotificationContext from "../../context/notification-context";
import Notification from "../ui/notification";
import MainHeader from "./main-header";

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification: any = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
