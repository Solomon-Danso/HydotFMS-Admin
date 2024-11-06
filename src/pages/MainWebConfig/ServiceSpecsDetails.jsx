import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from '../../data/Profile';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate, useParams } from 'react-router-dom';
import { TfiLayoutSlider } from 'react-icons/tfi';
import { FaCar, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import HydotTable from '../../data/HydotTable';
import {
  Stepper, Step, StepLabel, Button, Typography, Box
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { GiBookCover } from "react-icons/gi";




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

const {serviceId} = useParams()



const [Title, setTitle] = useState("")
const [SubTitle, setSubTitle] = useState("")

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





useEffect(()=>{

    const formData = new FormData();
    formData.append("AdminId",userInfo.UserId)
  
  fetch(apiServer+"ViewAllServicesDetails",{
    method: "POST",
        headers: {
          'UserId': userInfo.UserId,         
          'SessionId': userInfo.SessionId    
        },
        body:formData
  })
  .then(res=>res.json())
  .then(data=>{
    setExplore(data)
  })
  .catch(err=>console.error(err))
  
  
  },[userInfo])







const handleCreateAdmin = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()

formData.append("AdminId",userInfo.UserId)
formData.append("Description",SubTitle);
formData.append("ServiceID",serviceId);
formData.append("Title",Title);



    const response = await fetch(apiServer+"CreateServicesDetails", {
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




const handleDeleteAdmin = async (Id, ExploreID) => {

 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("ServiceID", ExploreID) 
  formData.append("Id", Id) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeletedServicesDetails", {
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




  const fileType = [
    {id:1, name:"External"},
    {id:2, name:"Internal"},
    {id:3, name:"Lighting"},
    {id:4, name:"Design"},
    {id:5, name:"Performance"},
]


// Define the menu items array
const menuItems = [

  {
    icon: <MdDelete />,
    text: "Delete Details",
    type: "function",
    onClick: (id, ServiceID) => {
      handleDeleteAdmin(id, ServiceID); // Assuming this function is defined in your component
    },
    columnNames: ['id','ServiceID'] // Specify the column name for the ID here
  },




];


 const exploreGrid = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "ServiceID", header: "Service ID" },
  { accessorKey: "Title", header: "Title" },
  { accessorKey: "Description", header: "Description" },
  ];

 const exploreMediaGrid = [
  { accessorKey: "Src", header: "Source" },
 ];




const [activeStep, setActiveStep] = useState(0);
const steps = [ 'Add Specification',  'Complete'];

const getStepIcon = (step) => {
  switch (step) {
    case 0:
      return <VideoLabelIcon />;
    case 1:
      return <CheckIcon />;
    case 2:
      return  <CheckIcon />;
    case 3:
      return <CheckIcon />;
    default:
      return <CheckIcon />;
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
      <Header category="Website Configuration" title="Explore Specifications" />




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
            <>
 <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Add Specification</div>
             
        <div>

        <FormLable style={{ color: localStorage.getItem("colorMode") }}> Title</FormLable>
          <FormInputStudent
            type="text"

            placeholder=""
            onChange={(e) => setTitle(e.target.value)}
            
          />

        </div>
                      
         <div>

         <FormLable style={{ color: localStorage.getItem("colorMode") }}> Description</FormLable>
            <FormInputStudent
             type="text"

             placeholder=""
             onChange={(e) => setSubTitle(e.target.value)}
             
            />

         </div>
            
      


            </>
          )}

        {activeStep === 1 && (
            <div>
              <Typography>
              <span style={{ color: localStorage.getItem("themeMode") === "Light" ? "orange" : "blue" }}> All steps completed. Ready to submit.</span> 
               </Typography>

              <AdmitButton3
                background={localStorage.getItem("colorMode")}
                color="white"
                border={localStorage.getItem("colorMode")}
                onClick={handleCreateAdmin}
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
          Service Specification List
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

