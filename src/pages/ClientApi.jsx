import React, { useEffect, useState } from 'react';
import "./Website/Website.css";
import Select from 'react-select';
import styled from 'styled-components';
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from './../data/Profile';
import { colors } from './../data/Colors';
import { clientApiGrid, contextMenuItems, countryList, customers, emailData, emailGrid, paymentGrid, paymentMethod, paymentReference, products } from './../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from './../components';
import Selector from './../data/Selector';
import { Show } from '../data/Alerts';
import { apiServer } from '../data/Endpoint';
import { useNavigate } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';



const ClientApi = () => {
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

  const editing = { allowDeleting: true, allowEditing: true };
  


  const [CustomerId, setCustomerId] = useState("")
  const [ApiServerURL, setApiServerURL] = useState("")
  const [ApiMediaURL, setApiMediaURL] = useState("")
  const [Id, setId] = useState(0)


  const [CustomersList, setCustomersList] = useState([])



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

fetch(apiServer+"ViewAllCustomers",{
  method: "POST",
      headers: {
        'UserId': userInfo.UserId,         
        'SessionId': userInfo.SessionId    
      },
      body:formData
})
.then(res=>res.json())
.then(data=>setCustomersList(data))
.catch(err=>console.error(err))


},[userInfo])



const handleCreateClientApiServerURL= async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()
formData.append("CustomerId", CustomerId)
formData.append("ApiServerURL", ApiServerURL)
formData.append("ApiMediaURL", ApiMediaURL)


formData.append("AdminId",userInfo.UserId)


    const response = await fetch(apiServer+"CreateClientApiServerURL", {
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


const handleUpdateClientApiServerURL = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()
formData.append("CompanyId", CustomerId)
formData.append("ApiServerURL", ApiServerURL)
formData.append("ApiMediaURL", ApiMediaURL)
formData.append("Id", Id)

formData.append("AdminId",userInfo.UserId)


    const response = await fetch(apiServer+"UpdateClientApiServerURL", {
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

const handleDeleteClientApiServerURL = async (id, CompanyId) => {

 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("Id", id)
  formData.append("CompanyId", CompanyId)
    formData.append("AdminId",userInfo.UserId)


  
      const response = await fetch(apiServer+"DeleteClientApiServerURL", {
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
      handleDeleteClientApiServerURL(deletedData.id,deletedData.CompanyId);
    }
  };


  const [ClientApiList, setClientApiList] = useState([])

  useEffect(()=>{
    fetch(apiServer+"ViewAllClientApiServerURL",{
      method:"POST",
      headers: {
        'UserId': userInfo.UserId,         
        'SessionId': userInfo.SessionId    
      },
    })
    .then(res => res.json())
    .then(data => setClientApiList(data))
    .catch(error => console.error(error))
  },[userInfo])



  return (
    <div>
      <Header category="Apps" title="ClientApi" />

      <div className="wwd-column">
        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Register Client API </div>

          <AdmitStudentRole>

    
          <Selector placeholder="Select Customer" dataList={CustomersList} dataKey="UserId" dataValue="Name" setMethod={(method) => setCustomerId(method)} />


                     <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Enter ApiServer</FormLable>
              <FormInputStudent
                type="text"
                required
                placeholder=""
                onChange={(e) => setApiServerURL(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Enter ApiServer</FormLable>
              <FormInputStudent
                type="text"
                required
                placeholder=""
                onChange={(e) => setApiMediaURL(e.target.value)}
              />
            </div>
          </AdmitStudentRole>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleCreateClientApiServerURL()}}       
            >Add
          </AdmitButton3>

          <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Enter Api Id</FormLable>
              <FormInputStudent
                type="number"
                required
                placeholder=""
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleUpdateClientApiServerURL()}}       
            >Edit
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
           Client Api List
          </u>
        </span>

        <GridComponent
           id="gridcomp"
      toolbar={['Search']}  // Add the search bar
 
          dataSource={ClientApiList}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
          actionBegin={handleActionBegin}
          style={{ backgroundColor: localStorage.getItem("colorMode") }}
        >
          <ColumnsDirective>
            {clientApiGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />

        </GridComponent>
      </div>
    </div>
  );
}

export default ClientApi;
