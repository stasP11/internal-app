import { useState } from "react";

const useDialogControls = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return {
    isOpen,
    openDialog,
    closeDialog,
  };
};

export default useDialogControls;
