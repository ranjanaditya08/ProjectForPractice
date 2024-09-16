import React, { useEffect } from "react";

const Popup = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 1000); // Hide after 1 seconds
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [visible, onClose]);

  if (!visible) return null; // Do not render if not visible

  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
      style={{ position: "fixed", top: "50px", right: "30px", zIndex: 1000 }}
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Popup;
