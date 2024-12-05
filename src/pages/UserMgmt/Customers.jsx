import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { TfiLayoutSlider } from 'react-icons/tfi';
import { FaCar, FaEdit } from 'react-icons/fa';
import { MdAddTask, MdAssignmentAdd, MdDelete } from 'react-icons/md';
import HydotTable from '../../data/HydotTable';
import {
  Stepper, Step, StepLabel, Button, Typography, Box
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { GiBookCover } from "react-icons/gi";
import { ImBlocked } from "react-icons/im";
import { FaUnlockKeyhole } from 'react-icons/fa6';



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



const [previewImage, setPreviewImage] = useState(null); // For image preview

const [Src, setSrc] = useState("")
const [Title, setTitle] = useState("")
const [Price, setPrice] = useState(0.0)
const [Explore, setExplore] = useState([])
const [MenuList, setMenuList] = useState([])
const [MenuId, setMenuId] = useState("")
const [CategoryList, setCategoryList] = useState("")
const [CategoryId, setCategoryId] = useState("")
const [ProductId, setProductId] = useState("")
const [Quantity, setQuantity] = useState("")
const [Size, setSize] = useState("")
const [Description, setDescription] = useState("")

const [picture, setPicture] = useState("")
const [name, setName] = useState("")
const [phone, setPhone] = useState("")
const [email, setEmail] = useState("")




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





  useEffect(() => {
    const formData = new FormData();
    formData.append("AdminId", userInfo.UserId);
  
    fetch(apiServer + "ViewAllCustomers", {
      method: "POST",
      headers: {
        'UserId': userInfo.UserId,
        'SessionId': userInfo.SessionId
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        // Check if data is an array and transform StartDate if it exists
        if (Array.isArray(data)) {
          const formattedData = data.map(item => {
            if (item.created_at) {
              return {
                ...item,
                created_at: customDateFormat(item.created_at),
                Status: item.IsBlocked === 1?"Blocked":"Active"
              };
            }
            return item;
          });
          setExplore(formattedData);
          console.log(formattedData);
        } else {
          setExplore(data);
        }
      })
      .catch(err => console.error(err));
  }, [userInfo]);
  
  // Custom date format function
  const customDateFormat = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };













  const handleCreate = async () => {

 

    Show.showLoading("Processing Data");
      try {
    
    const formData = new FormData()
    
    formData.append("Email", email)
    formData.append("Username", name)
    formData.append("Picture", Src)
    formData.append("Phone", phone)
    formData.append("AdminId",userInfo.UserId)
    
    
    
    
        const response = await fetch(apiServer+"CreateAdmin", {
          method: "POST",
          headers: {
            'UserId': userInfo.UserId,         
            'SessionId': userInfo.SessionId    
          },
          body:formData
        });
    
        const data = await response.json();
     
    
        if (response.ok) {
          
          Show.hideLoading();
    
          Show.Success(data.message);
           window.location.reload()
          
        } else {
          Show.Attention(data.message);
        }
      } catch (error) {
    
        Show.Attention("An error has occured");
       
      }
    
    }
    
    
    const handleEdit = async (Id) => {
    
     
    
    Show.showLoading("Processing Data");
      try {
    
    const formData = new FormData()
    formData.append("AdminId",userInfo.UserId)
    formData.append("Email", email)
    formData.append("Username", name)
    formData.append("Picture", Src)
    formData.append("Phone", phone)
    formData.append("UserId", Id)
    
    
        const response = await fetch(apiServer+"UpdateAdmin", {
          method: "POST",
          headers: {
            'UserId': userInfo.UserId,         
            'SessionId': userInfo.SessionId    
          },
          body:formData
        });
    
        const data = await response.json();
     
    
        if (response.ok) {
          
          Show.hideLoading();
    
          Show.Success(data.message);
           
          window.location.reload()
          
        } else {
          Show.Attention(data.message);
        }
      } catch (error) {
    
        Show.Attention("An error has occured");
       
      }
    
    }
    


    const handleBlock = async (id) => {
    
      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("UserId", id) 
      formData.append("AdminId",userInfo.UserId)
    
      
          const response = await fetch(apiServer+"BlockCustomer", {
            method: "POST",
            headers: {
              'UserId': userInfo.UserId,         
              'SessionId': userInfo.SessionId    
            },
            body:formData
          });
      
          const data = await response.json();
       
      
          if (response.ok) {
            
            Show.hideLoading();
      
            Show.Success(data.message);
             window.location.reload()
            
          } else {
            Show.Attention(data.message);
          }
        } catch (error) {
      
          Show.Attention("An error has occured");
         
        }
      
      }
    
    const handleUnBlock = async (id) => {
    
        Show.showLoading("Processing Data");
          try {
        
        const formData = new FormData()
        formData.append("UserId", id) 
        formData.append("AdminId",userInfo.UserId)
      
        
            const response = await fetch(apiServer+"UnBlockCustomer", {
              method: "POST",
              headers: {
                'UserId': userInfo.UserId,         
                'SessionId': userInfo.SessionId    
              },
              body:formData
            });
        
            const data = await response.json();
         
        
            if (response.ok) {
              
              Show.hideLoading();
        
              Show.Success(data.message);
               window.location.reload()
              
            } else {
              Show.Attention(data.message);
            }
          } catch (error) {
        
            Show.Attention("An error has occured");
           
          }
        
        }
      




// Define the menu items array
const menuItems = [
  {
    icon: <ImBlocked />,
    text: "Block Customer",
    type: "function",
    onClick: (UserId) => {
      handleBlock(UserId); // Assuming this function is defined in your component
    },
    columnNames: ['UserId'] // Specify the column name for the ID here
  },

  {
    icon: <FaUnlockKeyhole />,
    text: "UnBlock Customer",
    type: "function",
    onClick: (UserId) => {
      handleUnBlock(UserId); // Assuming this function is defined in your component
    },
    columnNames: ['UserId'] // Specify the column name for the ID here
  }



];




 const exploreGrid = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "UserId", header: "UserId" },
  { accessorKey: "Username", header: "Username" },
  { accessorKey: "Email", header: "Email" },
  { accessorKey: "Phone", header: "Phone" },
  { accessorKey: "Status", header: "Status" },
  { accessorKey: "created_at", header: "Date Created" },
];

 const exploreMediaGrid = [
 
];





  return (
    <div>
      <Header category="System Administration" title="Customer List" />




      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        <span>
          <u
            style={{
              color: localStorage.getItem("colorMode"),
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
          Customer List
          </u>
        </span>

        <HydotTable 
  columns={exploreGrid} 
  data={Explore} 
  media={exploreMediaGrid} 
  colorMode={localStorage.getItem("colorMode")}
  menuItems={menuItems}

/>;

       
      </div>
    </div>
  );
}

export default Explore;

