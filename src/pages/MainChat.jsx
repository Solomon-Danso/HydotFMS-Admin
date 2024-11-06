import React, { useEffect, useState } from 'react';
import "./Website/Website.css";
import { Header } from '../components';
import Selector from '../data/Selector';
import { Show } from '../data/Alerts';
import { apiServer } from '../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { TfiLayoutSlider } from 'react-icons/tfi';
import { FaCar, FaEdit } from 'react-icons/fa';
import { MdDelete, MdPreview } from 'react-icons/md';
import HydotTable from '../data/HydotTable';
import {
  Stepper, Step, StepLabel, Button, Typography, Box
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { GiBookCover } from "react-icons/gi";
import { AdmitButton3, FormInputStudent, FormLable } from '../data/Profile';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';




const Explore = () => {
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      try {
        // Intentional empty block
      } catch (err) {
        if (err.message === 'ResizeObserver loop completed with undelivered notifications.') {
          console.warn('ResizeObserver loop error detected.');
        } else {
          throw err;
        }
      }
    });

    observer.observe(document.body); // Assuming observing the body for changes

    return () => observer.disconnect();
  }, []);







  const navigate = useNavigate()

const [userInfo, setUserInfo] = useState({});

useEffect(() => {
 try{


   const encryptedData = sessionStorage.getItem("userDataEnc");
   const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
   const decryptedData = AES.decrypt(encryptedData, encryptionKey);
   const decryptedString = decryptedData.toString(enc.Utf8);
   const parsedData = JSON.parse(decryptedString);
     setUserInfo(parsedData);


 }catch(error){
  navigate("/")
 }

}, []);




  const [Audit, setAudit] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "GetChat", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.chats !== undefined) {
            const formattedChats = data.chats.map(chat => ({
              ...chat,
              isReplied: chat.isReplied === 1 ? "Replied" : "Not Replied",
              created_at: new Date(chat.created_at).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              }).replace(',', '') // to remove the comma after the date
            }));
            setAudit(formattedChats);
          } else {
            console.error("Unexpected response format:", data);
          }
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);
  



const SourceViewer = (MessageLink) =>{
window.open(MessageLink)
}







// Define the menu items array
const menuItems = [
  {
    icon: <IoChatbubbleEllipsesOutline />,
    text: "Reply Now",
    type: "navigate",
    path: `/main/instantReply/:EmailId`, // Placeholder for the dynamic segment
  },

  {
    icon: <MdPreview />,
    text: "Visit URL",
    type: "function",
    onClick: (ExploreID) => {
      SourceViewer(ExploreID); // Assuming this function is defined in your component
    },
    columnNames: ['MessageLink'] // Specify the column name for the ID here
  },




];


 const exploreGrid = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "EmailId", header: "Email ID" },
  { accessorKey: "Purpose", header: "Purpose" },
  { accessorKey: "FullName", header: "FullName" },
  { accessorKey: "Email", header: "Email" },
  { accessorKey: "Message", header: "Message" },
  { accessorKey: "isReplied", header: "isReplied" },
  { accessorKey: "created_at", header: "Date" },
 ];

 const exploreMediaGrid = [
  { accessorKey: "Src", header: "Source" },
  { accessorKey: "DetailedPicture", header: "Detailed Picture" },
];









  return (
    <div>
      <Header category="Website Configuration" title="MainChat" />


      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        <span>
          <u
            style={{
              color: localStorage.getItem("colorMode"),
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
          All Messages
          </u>
        </span>

        <HydotTable 
  columns={exploreGrid} 
  data={Audit} 
  media={exploreMediaGrid} 
  colorMode={localStorage.getItem("colorMode")}
  menuItems={menuItems}

/>;

       
      </div>
    </div>
  );
}

export default Explore;

