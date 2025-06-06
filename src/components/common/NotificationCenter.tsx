import React from "react";

interface NotificationCenterProps {
  notifications?: number;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = 1,
}) => {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] =
    React.useState(false);

  return (
    <button
      onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
      className={` font-medium p-3 relative rounded-full cursor-pointer   transition-all ease-in-out duration-200 ${
        isNotificationPanelOpen ? "bg-blue-500" : "bg-slate-100"
      } `}
    >
      <img
        src={
          isNotificationPanelOpen
            ? "/icons/bell-icon-enabled.svg"
            : "/icons/bell-icon.svg"
        }
        alt="notifications"
      />
      {notifications >= 0 && (
        <div className="absolute top-[-6px] right-[-6px] bg-red-500 rounded-full w-5 h-5 flex justify-center items-center text-white text-sm font-medium">
          {notifications}
        </div>
      )}
    </button>
  );
};

export default NotificationCenter;
