import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { chatData } from '../data/champion';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Chat = () => {
  const { currentColor } = useStateContext();

  const navigate = useNavigate()
  //  onClick={()=>{navigate(`/main/instantReply/${item.id}`)}}

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">


    </div>
  );
};

export default Chat;
