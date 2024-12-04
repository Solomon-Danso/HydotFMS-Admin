import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import { AdmitButton3, AdmitStudentRole, FormInputDiscount, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile';
import { Header } from '../../components';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { TfiLayoutSlider } from 'react-icons/tfi';
import { MdAddTask, MdAssignmentAdd, MdDelete } from 'react-icons/md';
import HydotTable from '../../data/HydotTable';
import {
  Stepper, Step, StepLabel, Button, Typography, Box
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';





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
const [selectedProducts, setSelectedProducts] = useState([]);
const [percentage, setPercentage] = useState(0);
const [deadline, setDeadline] = useState(0);


useEffect(() => {
  console.log("Selected Products:", selectedProducts);
}, [selectedProducts]);

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
 
  })
  .catch(err=>console.error(err))
  
  
  },[userInfo])



// Define the menu items array
const menuItems = [
  {
    icon: <TfiLayoutSlider />,
    text: "Add Product Images",
    type: "navigate",
    path: `/main/product/:ProductId`, // Placeholder for the dynamic segment
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


const handleAssignProducts = async () => {
  Show.showLoading("Processing Data...");
  
  try {
    const productPromises = selectedProducts.map(async (product) => {
      const formData = new FormData();
      formData.append("DiscountPercentage", percentage);
      formData.append("ProductId", product.ProductId);
      formData.append("AdminId", userInfo.UserId);
      formData.append("ValidUntil", deadline);

      const response = await fetch(apiServer + "RunPromotion", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error has occurred");
      }

      return data.message;
    });

    const results = await Promise.all(productPromises);

    Show.hideLoading();

    results.forEach(message => Show.Success(message));

  } catch (error) {
    Show.hideLoading();
    Show.Attention(error.message || "An error has occurred");
  }
};

const handleRevertProducts = async () => {
  Show.showLoading("Processing Data...");
  
  try {
    const productPromises = selectedProducts.map(async (product) => {
      const formData = new FormData();
      formData.append("ProductId", product.ProductId);
      formData.append("AdminId", userInfo.UserId);

      const response = await fetch(apiServer + "RevertPromotion", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error has occurred");
      }

      return data.message;
    });

    const results = await Promise.all(productPromises);

    Show.hideLoading();

    results.forEach(message => Show.Success(message));

  } catch (error) {
    Show.hideLoading();
    Show.Attention(error.message || "An error has occurred");
  }
};


const handleConfirmation = () => {
  console.log("Assign Products Function:", handleAssignProducts);
  console.log("Revert Products Function:", handleRevertProducts);

  Show.ConfirmPro(
    "Select Your Action",
    handleAssignProducts, // Pass the reference
    handleRevertProducts // Pass the reference
  );
};




 const exploreGrid = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "ProductId", header: "Product ID" },
  { accessorKey: "Picture", header: "Picture" },
  { accessorKey: "Title", header: "Title" },
  { accessorKey: "Price", header: "Price" },
  { accessorKey: "Quantity", header: "Quantity" },
  { accessorKey: "ViewsCounter", header: "Views" },
  { accessorKey: "PurchaseCounter", header: "Purchases" },
  { accessorKey: "DiscountPrice", header: "Discounted Price" },
  { accessorKey: "DiscountPercentage", header: "Discount %" },
  { accessorKey: "ValidUntil", header: "ValidUntil" },
];

 const exploreMediaGrid = [
  { accessorKey: "Picture", header: "Picture" }
];







const [activeStep, setActiveStep] = useState(0);
const steps = ['Enter Details',  'Complete'];

const getStepIcon = (step) => {
  switch (step) {
    
    case 0:
      return  <MdAssignmentAdd size={"2rem"}/>;
    case 1:
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
      <Header category="E-commerce Mgmt" title="Discounts" />




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
             
              
             <div style={{ flex: 1, marginRight: "1rem" }}>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Discount Percentage</FormLable>
              <FormInputDiscount
                type="number"
                required
                placeholder=""
                onChange={(e)=>{setPercentage(e.target.value)}}
              />
            </div>

            <div style={{ flex: 1 }}>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Deadline</FormLable>
              <FormInputDiscount
                type="datetime-local"
                required
                placeholder=""
                onChange={(e)=>{setDeadline(e.target.value)}}
              />
            </div>



             
            </div>
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
                onClick={handleConfirmation}
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
          Product List
          </u>
        </span>

        <HydotTable 
  columns={exploreGrid} 
  data={Explore} 
  media={exploreMediaGrid} 
  colorMode={localStorage.getItem("colorMode")}
  menuItems={menuItems}
  RowSelector={(selectedRows) => {
    setSelectedProducts(selectedRows); // Update the selected products
  }}
/>;

       
      </div>
    </div>
  );
}

export default Explore;

