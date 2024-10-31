import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import Select from 'react-select';
import styled from 'styled-components';
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { contextMenuItems, countryList, customers, emailData, emailGrid, formattedGrid, paymentData, paymentGrid, paymentMethod, paymentReference, products } from '../../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';




const Sales = () => {


  
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
  const handleEdit = (id) => {
    console.log('Edit entry ID:', id);
  };

  

  const handleActionBegin = (args) => {
    if (args.requestType === 'save') {
      const updatedData = args.data;
      handleEdit(updatedData);
    }

    if (args.requestType === 'delete') {
      const deletedData = args.data[0]; // assuming single delete
   
    }
  };


  const [PortfolioList, setPortfolioList] = useState([])

  useEffect(()=>{
    fetch(apiServer+"ViewOurPortfolioProjects",{
      method:"POST",
      headers: {
        'UserId': userInfo.UserId,         
        'SessionId': userInfo.SessionId    
      },
    })
    .then(res => res.json())
    .then(data => setPortfolioList(data))
    .catch(error => console.error(error))
  },[userInfo])


  const [CustomersList, setCustomersList] = useState([])
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

  const [CustomerId, setCustomerId] = useState("")
  const [ProductId, setProductId] = useState("")
  const [PaymentMethod, setPaymentMethod] = useState("")
  const [PaymentReference, setPaymentReference] = useState("")
  const [Amount, setAmount] = useState(0.0)
  

  const handleCreateSales = async () => {

 

    Show.showLoading("Processing Data");
      try {
    
    const formData = new FormData()
    formData.append("CustomerId", CustomerId)
    formData.append("ProductId", ProductId)
    formData.append("PaymentMethod", PaymentMethod)
    formData.append("PaymentReference", PaymentReference)
    formData.append("Amount", Amount)

    
  
       
    formData.append("AdminId",userInfo.UserId)
   
        const response = await fetch(apiServer+"CreateSales", {
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

  const handleRegenerateTransactionId = async () => {

 

      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("CustomerId", CustomerId)
      formData.append("ProductId", ProductId)
      formData.append("PaymentMethod", PaymentMethod)
      formData.append("PaymentReference", PaymentReference)
      formData.append("Amount", Amount)
  
      
    
         
      formData.append("AdminId",userInfo.UserId)
     
          const response = await fetch(apiServer+"RegenerateTransactionId", {
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

    const [SalesList, setSalesList] = useState([])

    useEffect(()=>{
      fetch(apiServer+"ViewSales",{
        method:"POST",
        headers: {
          'UserId': userInfo.UserId,         
          'SessionId': userInfo.SessionId    
        },
      })
      .then(res => res.json())
      .then(data => setSalesList(data))
      .catch(error => console.error(error))
    },[userInfo])



  return (
    <div>
      <Header category="Financial" title="Sales" />

      <div className="wwd-column">
        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Add Sales </div>

          <AdmitStudentRole>

          <Selector placeholder="Select Products" dataList={PortfolioList} dataKey="ProjectId" dataValue="ProjectName" setMethod={(method) => setProductId(method)} />


            <Selector placeholder="Select Customer" dataList={CustomersList} dataKey="UserId" dataValue="Name" setMethod={(method) => setCustomerId(method)} />

            <Selector placeholder="Select Payment Method" dataList={paymentMethod} dataKey="method" dataValue="method" setMethod={(method) => setPaymentMethod(method)} />

            <Selector placeholder="Select Payment Reference" dataList={paymentReference} dataKey="ref" dataValue="ref" setMethod={(method) => setPaymentReference(method)} />


            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Enter Amount (₵)</FormLable>
              <FormInputStudent
                type="number"
                required
                placeholder=""
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </AdmitStudentRole>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{handleCreateSales()}}
            >Add
          </AdmitButton3>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{handleRegenerateTransactionId()}}
            >Regenerate
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
           Payment History
          </u>
        </span>

        <GridComponent
           id="gridcomp"
      toolbar={['Search']}  // Add the search bar
 
          dataSource={SalesList}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          
          actionBegin={handleActionBegin}
          style={{ backgroundColor: localStorage.getItem("colorMode") }}
        >
          <ColumnsDirective>
            {paymentGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />

        </GridComponent>
      </div>
    </div>
  );
}

export default Sales;
