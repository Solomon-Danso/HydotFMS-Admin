import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import HydotTable from '../../data/HydotTable';

import { FaEye } from 'react-icons/fa6';




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




const [Explore, setExplore] = useState([])







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

  fetch(apiServer + "ViewBaggingList", {
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
              created_at: customDateFormat(item.created_at)
            };
          }
          return item;
        });
        setExplore(formattedData);
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



    
    const handleDelete = async (id) => {
    
     
    
      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("ProductId", id) 
      formData.append("AdminId",userInfo.UserId)
    
      
          const response = await fetch(apiServer+"DeleteProduct", {
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
    icon: <FaEye />,
    text: "View Details",
    type: "navigate",
    path: `/main/bagging/:OrderId/:BaggingId`, // Placeholder for the dynamic segment
  },


];



 const exploreGrid = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "UserId", header: "User ID" },
  { accessorKey: "OrderId", header: "Order ID" },
  { accessorKey: "BaggingId", header: "Bagging ID" },
  { accessorKey: "created_at", header: "Date Created" },

];

 const exploreMediaGrid = [

];

const sample = [
  {
    id: 1,
    UserId: "U1001",
    OrderId: "O5001",
    ReferenceId: "R10001",
    Phone: "123-456-7890",
    Email: "user1@example.com",
    created_at: customDateFormat("2024-12-01T08:30:00"),
  },
  {
    id: 2,
    UserId: "U1002",
    OrderId: "O5002",
    ReferenceId: "R10002",
    Phone: "987-654-3210",
    Email: "user2@example.com",
    created_at: customDateFormat("2024-12-01T08:30:00"),
  },
  {
    id: 3,
    UserId: "U1003",
    OrderId: "O5003",
    ReferenceId: "R10003",
    Phone: "555-111-2222",
    Email: "user3@example.com",
    created_at: customDateFormat("2024-12-01T08:30:00"),
  },
  {
    id: 4,
    UserId: "U1004",
    OrderId: "O5004",
    ReferenceId: "R10004",
    Phone: "333-444-5555",
    Email: "user4@example.com",
    created_at: customDateFormat("2024-12-01T08:30:00"),
  },
  {
    id: 5,
    UserId: "U1005",
    OrderId: "O5005",
    ReferenceId: "R10005",
    Phone: "666-777-8888",
    Email: "user5@example.com",
    created_at: customDateFormat("2024-12-01T08:30:00"),
  },
  
];







  return (
    <div>
      <Header category="E-commerce Mgmt" title="Bagging" />



      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        <span>
          <u
            style={{
              color: localStorage.getItem("colorMode"),
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
          Bagging List
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

