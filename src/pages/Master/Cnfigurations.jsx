import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import Select from 'react-select';
import styled from 'styled-components';
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { categoryGrid, contextMenuItems, continentList, countryList, customers, customersData, customersGrid, DeliveryConfigGrid, emailData, emailGrid, employeeData, employeeGrid, otherGrid, paymentData, paymentGrid, paymentMethod, paymentMethodGrid, paymentReference, productGrid, products } from '../../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';
import HydotTable from '../../data/HydotTable';
import { FaEdit } from 'react-icons/fa';
import { ImBlocked } from 'react-icons/im';




const Configurations = () => {
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


const [MenuList, setMenuList] = useState([])
const [MenuId, setMenuId] = useState("")
const [CategoryId, setCategoryId] = useState("")
const [location, setLocation] = useState("")
const [PricePerKm, setPricePerKm] = useState(0)







  const [AdminList, setAdminList] = useState([])



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
    if (userInfo) {
      const formData = new FormData();
      formData.append("AdminId", userInfo.UserId);
  
      fetch(apiServer + "PaymentMethodsList", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          // Map the data to have MenuId and MenuName
          const transformedData = data.map((item, index) => ({
            MenuId: index + 1,    // Create unique IDs based on the index
            MenuName: item        // The item itself is the MenuName
          }));
  
          setMenuList(transformedData); // Set the transformed data

        })
        .catch(err => console.error(err));
    }
  }, [userInfo]);
  

const [deliverConfigList, setdeliverConfigList] = useState([])

useEffect(() => {
    if (userInfo) {
      const formData = new FormData();
      formData.append("AdminId", userInfo.UserId);
  
      fetch(apiServer + "ViewDeliveryConfig", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => {
         setdeliverConfigList(data); 
         console.log(data)
        })
        .catch(err => console.error(err));
    }
  }, [userInfo]);
  
  const [ViewPaymentMethods, setViewPaymentMethods] = useState([])

  useEffect(() => {
      if (userInfo) {
        const formData = new FormData();
        formData.append("AdminId", userInfo.UserId);
    
        fetch(apiServer + "ViewPaymentMethods", {
          method: "POST",
          headers: {
            'UserId': userInfo.UserId,
            'SessionId': userInfo.SessionId
          },
          body: formData
        })
          .then(res => res.json())
          .then(data => {
           setViewPaymentMethods(data); 
          })
          .catch(err => console.error(err));
      }
    }, [userInfo]);
    






const handleSetPayment = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()

formData.append("AdminId",userInfo.UserId)
formData.append("PaymentMethod",MenuId);


    const response = await fetch(apiServer+"PaymentMethods", {
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


const handleDeliveryConfig = async () => {

 

    Show.showLoading("Processing Data");
      try {
    
    const formData = new FormData()
    
    formData.append("AdminId",userInfo.UserId)
    formData.append("PricePerKm",PricePerKm);
    formData.append("Location",location);
    
    
    
        const response = await fetch(apiServer+"DeliveryConfig", {
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



const handleDeleteAdmin = async (id) => {

 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("Id", id) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeletePaymentMethods", {
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







  const handleEdit = (id) => {
    console.log('Edit entry ID:', id);
  };



  

  const configurationType = [

    {"CategoryId":"Payment Options", "CategoryName":"Payment Options"},
    {"CategoryId":"Delivery Configuration", "CategoryName":"Delivery Configuration"},


  ]

  const paymentMethodGridmenuItems = [
    {
      icon: <FaEdit />,
      text: "Delete Payment",
      type: "function",
      onClick: (id) => {
        handleDeleteAdmin(id); // Assuming this function is defined in your component
      },
      columnNames: ['id'] // Specify the column name for the ID here
    },
  
  ];
  
  const DeliveryGridmenuItems = [
    
  
  
  ];
  
  
  
  
   const paymentMethodGrid = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "PaymentMethod", header: "PaymentMethod" },
    
  ];
  

  const DeliveryConfigGrid = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "Location", header: "Location" },
    { accessorKey: "PricePerKm", header: "PricePerKm" },
  
  ];
  


   const exploreMediaGrid = [
    { accessorKey: "Picture", header: "Picture" }
  ];
  





  return (
    <div>
      <Header category="System Operations" title="Configurations" />

      <div className="wwd-row">

        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Add  Configurations </div>

          <AdmitStudentRole>

          <Selector placeholder="Select Configuration Type" dataList={configurationType} dataKey="CategoryId" dataValue="CategoryName" setMethod={(method) => setCategoryId(method)} />
          
          {
            CategoryId=="Payment Options"?<>
            
            <Selector placeholder="Select Payment Method" dataList={MenuList} dataKey="MenuName" dataValue="MenuName" setMethod={(method) => setMenuId(method)} />
            
            </>:<></>
          }

        {
            CategoryId=="Delivery Configuration"?<>
            
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Your Location</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setLocation(e.target.value)}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Price Per Kilometer</FormLable>
              <FormInputStudent
               type="number"

               placeholder=""
               onChange={(e) => setPricePerKm(e.target.value)}
               
              />
            </div>



            
            </>:<></>
          }
          
          

           
         
          </AdmitStudentRole>


 
          {
            CategoryId=="Payment Options"?<>
            
            <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleSetPayment()}}       
            >Add
          </AdmitButton3>            
            </>:<></>
          }

{
            CategoryId=="Delivery Configuration"?<>
            
            <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleDeliveryConfig()}}       
            >Add
          </AdmitButton3>            
            </>:<></>
          }





         

        </div>

     

      </div>


{
     CategoryId=="Payment Options"?<>
           <div style={{ marginTop: "2rem", padding: "1rem" }}>
        <span>
          <u
            style={{
              color: localStorage.getItem("colorMode"),
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
          Payment Options List
          </u>
        </span>

        <HydotTable 
  columns={paymentMethodGrid} 
  data={ViewPaymentMethods} 
  media={exploreMediaGrid} 
  colorMode={localStorage.getItem("colorMode")}
  menuItems={paymentMethodGridmenuItems}

/>
      </div>
     </>:<></>
}


{
     CategoryId=="Delivery Configuration"?<>
           <div style={{ marginTop: "2rem", padding: "1rem" }}>
        <span>
          <u
            style={{
              color: localStorage.getItem("colorMode"),
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
          Delivery Configuration List
          </u>
        </span>

        <HydotTable 
  columns={DeliveryConfigGrid} 
  data={deliverConfigList} 
  media={exploreMediaGrid} 
  colorMode={localStorage.getItem("colorMode")}
  menuItems={DeliveryGridmenuItems}

/>
      </div>
     </>:<></>
}


    </div>
  );
}

export default Configurations;
