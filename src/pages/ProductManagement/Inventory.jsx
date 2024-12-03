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
  
  fetch(apiServer+"ViewProductAdmin",{
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
    console.log(data)
  })
  .catch(err=>console.error(err))
  
  
  },[userInfo])

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
    
    formData.append("AdminId",userInfo.UserId)
    formData.append("MenuId",MenuId);
    formData.append("CategoryId",CategoryId);
    formData.append("Picture",Src);
    formData.append("Title",Title);
    formData.append("Price",Price);
    formData.append("Quantity",Quantity);
    formData.append("Size",Size);
    formData.append("ProductId",ProductId);
    formData.append("Description",Description);
    
    
    
    
        const response = await fetch(apiServer+"CreateProduct", {
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
    formData.append("MenuId",MenuId);
    formData.append("CategoryId",CategoryId);
    formData.append("Picture",Src);
    formData.append("Title",Title);
    formData.append("Price",Price);
    formData.append("Quantity",Quantity);
    formData.append("Size",Size);
    formData.append("ProductId",Id);
    formData.append("Description",Description);
    
    
        const response = await fetch(apiServer+"UpdateProduct", {
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
    icon: <TfiLayoutSlider />,
    text: "Add Product Images",
    type: "navigate",
    path: `/main/product/:ProductId`, // Placeholder for the dynamic segment
  },

  {
    icon: <FaEdit />,
    text: "Edit Product",
    type: "function",
    onClick: (ProductId) => {
      handleEdit(ProductId); // Assuming this function is defined in your component
    },
    columnNames: ['ProductId'] // Specify the column name for the ID here
  },


  {
    icon: <MdDelete color='#f06040'/>,
    text: "Delete Product",
    type: "function",
    onClick: (ProductId) => {
      handleConfirmation(ProductId); // Assuming this function is defined in your component
    },
    columnNames: ['ProductId'] // Specify the column name for the ID here
  },


];

const handleConfirmation = (ProductId) =>{

  Show.Confirm("Do you want to Delete, Action cannot be reversed ", () => handleDelete(ProductId)  );
}


 const exploreGrid = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "ProductId", header: "Product ID" },
  { accessorKey: "Picture", header: "Picture" },
  { accessorKey: "Title", header: "Title" },
  { accessorKey: "Price", header: "Price" },
  { accessorKey: "Quantity", header: "Quantity" },
  { accessorKey: "Description", header: "Description" },
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
      <Header category="E-commerce Mgmt" title="Inventory" />



      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        <span>
          <u
            style={{
              color: localStorage.getItem("colorMode"),
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
          Product List
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

