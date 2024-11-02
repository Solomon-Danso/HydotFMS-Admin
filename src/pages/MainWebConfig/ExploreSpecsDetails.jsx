import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import Select from 'react-select';
import styled from 'styled-components';
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { categoryGrid, contextMenuItems, continentList, countryList, customers, customersData, customersGrid, emailData, emailGrid, employeeData, employeeGrid, exploreGrid, otherGrid, paymentData, paymentGrid, paymentMethod, paymentReference, productGrid, productImageGrid, products, specsDetails } from '../../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';




const ExploreSpecsDetails = () => {
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
const [CategoryList, setCategoryList] = useState("")
const [CategoryId, setCategoryId] = useState("")
const [picture, setPicture] = useState("")
const [ProductId, setProductId] = useState("")
const [Title, setTitle] = useState("")
const [Price, setPrice] = useState("")
const [Quantity, setQuantity] = useState("")
const [Size, setSize] = useState("")
const [Description, setDescription] = useState("")
const [previewImage, setPreviewImage] = useState(null); // For image preview
 





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
.then(data=>setAdminList(data))
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




const handleCreateAdmin = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()

formData.append("AdminId",userInfo.UserId)
formData.append("MenuId",MenuId);
formData.append("CategoryId",CategoryId);
formData.append("Picture",picture);
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


const handleEditAdmin = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()
formData.append("AdminId",userInfo.UserId)
formData.append("MenuId",MenuId);
formData.append("CategoryId",CategoryId);
formData.append("Picture",picture);
formData.append("Title",Title);
formData.append("Price",Price);
formData.append("Quantity",Quantity);
formData.append("Size",Size);
formData.append("ProductId",ProductId);
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

const handleDeleteAdmin = async (id) => {

 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("UserId", id) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeleteAdmin", {
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



  const handleActionBegin = (args) => {
    if (args.requestType === 'save') {
      const updatedData = args.data;
      handleEdit(updatedData);
    }

    if (args.requestType === 'delete') {
      const deletedData = args.data[0]; 
      handleDeleteAdmin(deletedData.UserId);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
const fileType = [
    {id:1, name:"External"},
    {id:2, name:"Internal"},
    {id:3, name:"Lighting"},
    {id:4, name:"Design"},
    {id:5, name:"Performance"},
]


  return (
    <div>
      <Header category="Website Configuration" title="Explore" />

      <div className="wwd-row">

        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Add  Explore Specification</div>

          <AdmitStudentRole>

          <Selector placeholder="Select Section Type" dataList={fileType} dataKey="name" dataValue="name" setMethod={(method) => setCategoryId(method)} />
            
          <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Title</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setProductId(e.target.value)}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> SubTitle</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setTitle(e.target.value)}
               
              />
            </div>
           
         
          </AdmitStudentRole>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleCreateAdmin()}}       
            >Add
          </AdmitButton3>

         



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
          Explore List
          </u>
        </span>

        <GridComponent
           id="gridcomp"
      toolbar={['Search']}  // Add the search bar
 
          dataSource={AdminList}
          enableHover={true}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          actionBegin={handleActionBegin}
          style={{ backgroundColor: localStorage.getItem("colorMode") }}
        >
          <ColumnsDirective>
            {specsDetails.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />

        </GridComponent>
      </div>
    </div>
  );
}

export default ExploreSpecsDetails;
