import { AnimatePresence, motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="relative"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
        className={`font-medium p-3 relative rounded-full cursor-pointer transition-all ease-in-out duration-200 ${
          isNotificationPanelOpen ? "bg-blue-500" : "bg-slate-100"
        }`}
      >
        <motion.div
          animate={{
            color: isNotificationPanelOpen ? "#ffffff" : "#374151",
            rotate: isNotificationPanelOpen ? 15 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={
              isNotificationPanelOpen
                ? "/icons/bell-icon-enabled.svg"
                : "/icons/bell-icon.svg"
            }
            alt="notifications"
          />
        </motion.div>

        <AnimatePresence>
          {notifications > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {notifications}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isNotificationPanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                Notifications
              </h3>
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 bg-blue-50 rounded-md"
                >
                  <p className="text-sm text-gray-700">New message received</p>
                  <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-3 bg-green-50 rounded-md"
                >
                  <p className="text-sm text-gray-700">
                    Task completed successfully
                  </p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationCenter;
