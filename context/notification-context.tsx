import { createContext, useState, useEffect } from "react";

interface NotificationContextProps {
  children: any;
}

interface NotificationProps {
  title: string;
  message: string;
  status: string;
}

const NotificationContext = createContext({
  notification: null,
  showNotification: (noticationData: any) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider: React.FC<NotificationContextProps> = (
  props: NotificationContextProps
) => {
  const [activeNotification, setActiveNotification] = useState<any>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: any) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
