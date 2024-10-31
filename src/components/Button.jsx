import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, click }) => {
  const { setIsClicked, initialState } = useStateContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (click) {
      navigate(`/${click}`);
    } else {
      setIsClicked(initialState);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
