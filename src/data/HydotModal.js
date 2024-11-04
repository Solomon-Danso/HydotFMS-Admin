import React, { useEffect, useState } from 'react';
import './DropdownModal.css';

const HydotModal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500); // Adjust duration to match your animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${isOpen ? 'open' : 'close'}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default HydotModal;
