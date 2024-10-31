import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';


import { useNavigate } from 'react-router-dom';
import { chatData } from '../../data/champion';
import { useStateContext } from '../../contexts/ContextProvider';
import Button from '../../components/Button';

const FollowUp = () => {
  const { currentColor } = useStateContext();

  const navigate = useNavigate()

  return (
    <div className="mt-5 ">
    {chatData?.map((item, index) => (
      <div 
      key={index}
      onClick={()=>{navigate(`/instantReply/${item.id}`)}}
       className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer">
        <div className="relative">
         
          <span
            style={{ background: item.dotColor }}
            className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1"
          />
        </div>
        <div>
          <p className="font-semibold dark:text-gray-200 ">{item.name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{item.message}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{item.time}</p>
        </div>
      </div>
    ))}

  </div>
  );
};

export default FollowUp;
