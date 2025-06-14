import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Faded background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default Modal;