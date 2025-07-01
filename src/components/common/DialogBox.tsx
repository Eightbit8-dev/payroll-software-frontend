import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useClickOutside from "../../hooks/useClickOutside";

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

interface DialogBoxProps {
  children: React.ReactNode;

  setToggleDialogueBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  setToggleDialogueBox,
  children,
}) => {
  const [domReady, setDomReady] = useState(false);

  //handle tap outisde
  const [containerRef, isVisible] = useClickOutside(true);

  useEffect(() => {
    if (!isVisible) {
      setToggleDialogueBox(false);
    }
  }, [isVisible]);

  useEffect(() => {
    // Close dialog when Escape key is pressed
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleDialogueBox(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setDomReady(true);
    // Lock body scroll when dialog is open
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  // Early return before DOM is ready (for SSR compatibility)
  if (!domReady) return null;

  const DialogBoxContent = (
    <motion.div
      variants={popUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm"
      //didnnt use childrens direcly as exit animations didnt work i dont know why
      //top positipon is handled via motion variant props y distance
    >
      <div
        ref={containerRef}
        className="md:w[400px] flex w-[350px] flex-col items-center gap-4 rounded-[20px] bg-white p-8 outline-1 outline-gray-300 backdrop-blur-sm lg:w-[500px]"
      >
        {children}
      </div>
    </motion.div>
  );

  // Create portal to render the dialog at the document body level
  return ReactDOM.createPortal(DialogBoxContent, document.body);
};

export default DialogBox;
