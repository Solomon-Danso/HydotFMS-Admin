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
  
    fetch(apiServer + "ViewAllAdmin", {
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








  useEffect(()=>{

    const formData = new FormData();
    formData.append("AdminId",userInfo.UserId)
  
  fetch(apiServer+"ViewMenu",{
    method: "POST",
        headers: {
          'UserId': userInfo.UserId,         
          'SessionId': userInfo.SessionId    
        },
        body:formData
  })
  .then(res=>res.json())
  .then(data=>setMenuList(data))
  .catch(err=>console.error(err))
  
  
  },[userInfo])



  useEffect(()=>{

    const formData = new FormData();
    formData.append("AdminId",userInfo.UserId)
  
  fetch(apiServer+"ViewCategory",{
    method: "POST",
        headers: {
          'UserId': userInfo.UserId,         
          'SessionId': userInfo.SessionId    
        },
        body:formData
  })
  .then(res=>res.json())
  .then(data=>setCategoryList(data))
  .catch(err=>console.error(err))
  
  
  },[userInfo])





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


    const handleBlock = async (id) => {
    
      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("UserId", id) 
      formData.append("AdminId",userInfo.UserId)
    
      
          const response = await fetch(apiServer+"BlockAdmin", {
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
      
        
            const response = await fetch(apiServer+"UnBlockAdmin", {
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
      



    
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSrc(file);
  
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };




// Define the menu items array
const menuItems = [
  {
    icon: <FaEdit />,
    text: "Edit Admin",
    type: "function",
    onClick: (UserId) => {
      handleEdit(UserId); // Assuming this function is defined in your component
    },
    columnNames: ['UserId'] // Specify the column name for the ID here
  },

  {
    icon: <ImBlocked />,
    text: "Block Admin",
    type: "function",
    onClick: (UserId) => {
      handleBlock(UserId); // Assuming this function is defined in your component
    },
    columnNames: ['UserId'] // Specify the column name for the ID here
  },

  {
    icon: <FaUnlockKeyhole />,
    text: "UnBlock Admin",
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
  { accessorKey: "Picture", header: "Picture" },
  { accessorKey: "Username", header: "Username" },
  { accessorKey: "Email", header: "Email" },
  { accessorKey: "Phone", header: "Phone" },
  { accessorKey: "Status", header: "Status" },
  { accessorKey: "created_at", header: "Date Created" },
];

 const exploreMediaGrid = [
  { accessorKey: "Picture", header: "Picture" }
];







const [activeStep, setActiveStep] = useState(0);
const steps = ['Upload Media', 'Enter Details',  'Complete'];

const getStepIcon = (step) => {
  switch (step) {
    case 0:
      return <VideoLabelIcon />;
    case 1:
      return  <MdAssignmentAdd size={"2rem"}/>;
    case 2:
      return <MdAddTask size={"2rem"} />;
    default:
      return <CheckIcon size={"2rem"} />;
  }
};



const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleReset = () => {
  setActiveStep(0);
};


  return (
    <div>
      <Header category="System Administration" title="Admin" />




<div className="wwd-row">
      <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white", padding: "2rem" }}>
        
       <Stepper activeStep={activeStep} alternativeLabel sx={{ padding: '2rem 0' }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel sx={{ color: localStorage.getItem("themeMode") === "Light" ? "orange" : "blue" }} StepIconComponent={() => getStepIcon(index)} >
               <span style={{ color: localStorage.getItem("themeMode") === "Light" ? "orange" : "blue" }}>{label}</span> 
                
                </StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ padding: 3 }}>
          

          {activeStep === 0 && (
            <div> 

              {previewImage && (
                    <div style={{ marginTop: "1rem" }}>
                      <img src={previewImage} alt="Preview" style={{ width: "auto", height: "40vh" }} />
                    </div>
                  )}
                  <FormLable style={{ color: localStorage.getItem("colorMode") }}>Main Picture</FormLable>
                  <FormInputStudent
                    type="file"
                    required
                    placeholder=""
                    accept=".jpg, .png, .jpeg, .ico, .webp"
                    onChange={handleImageChange}
                  />
            </div>
          )}

          {activeStep === 1 && (
            <div>
             
             <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Name</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setName(e.target.value)}
               
              />
            </div>

           
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Phone</FormLable>
              <FormInputStudent
                type="text"
                required
                placeholder=""
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Email</FormLable>
              <FormInputStudent
                type="email"
                required
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
             
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <Typography>
              <span style={{ color: localStorage.getItem("themeMode") === "Light" ? "orange" : "blue" }}> All steps completed. Ready to submit.</span> 
               </Typography>
              <AdmitButton3
                background={localStorage.getItem("colorMode")}
                color="white"
                border={localStorage.getItem("colorMode")}
                onClick={handleCreate}
              >
                Submit
              </AdmitButton3>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mt: 2, mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
              sx={{ mt: 2 }}
            >
              {activeStep === steps.length - 1 ? 'Reset' : 'Next'}
            </Button>
          </div>
        </Box>
      </div>
    </div>


      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        <span>
          <u
            style={{
              color: localStorage.getItem("colorMode"),
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
          Admin List
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

