import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import Select from 'react-select';
import styled from 'styled-components';
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { contextMenuItems, countryList, customers, emailData, emailGrid, paymentData, paymentGrid, paymentMethod, paymentReference, PriceConfigGrid, pricingType, products } from '../../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';




const PriceConfiguration = () => {


  const [Picture, setPicture] = useState("")
  const [Link, setLink] = useState("")
  const [ProjectName, setProjectName] = useState("")
  const [ProjectId, setProjectId] = useState("")



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

  const handleDelete = (id) => {
    console.log('Delete entry ID:', id);
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





  const [ProductId, setProductId] = useState("")
  const [PricingType, setPricingType] = useState("")
  const [Amount, setAmount] = useState(0.0)
  

  const handleConfigurePrice = async () => {

 

    Show.showLoading("Processing Data");
      try {
    
    const formData = new FormData()

    formData.append("ProductId", ProductId)

    formData.append("PricingType", PricingType)
    formData.append("Amount", Amount)

    
  
       
    formData.append("AdminId",userInfo.UserId)
   
        const response = await fetch(apiServer+"ConfigurePrice", {
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



      const handleDeletePrice = async (Id) => {



        Show.showLoading("Processing Data");
          try {
        
        const formData = new FormData()

        formData.append("ProductId", Id)
        
      
           
        formData.append("AdminId",userInfo.UserId)
       
            const response = await fetch(apiServer+"DeletePrice", {
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


        const [PriceList, setPriceList] = useState([])

        useEffect(()=>{
          fetch(apiServer+"GetAllPrice",{
            method:"POST",
            headers: {
              'UserId': userInfo.UserId,         
              'SessionId': userInfo.SessionId    
            },
          })
          .then(res => res.json())
          .then(data => setPriceList(data))
          .catch(error => console.error(error))
        },[userInfo])

        const handleActionBegin = (args) => {
            if (args.requestType === 'save') {
              const updatedData = args.data;
              alert("Use The Forms To Edit")
            }
        
            if (args.requestType === 'delete') {
              const deletedData = args.data[0]; // assuming single delete
              handleDeletePrice(deletedData.ProductId);
            }
          };
        
        


  return (
    <div>
      <Header category="Financial" title="PriceConfiguration" />

      <div className="wwd-column">
        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Configure Price </div>

          <AdmitStudentRole>

          <Selector placeholder="Select Products" dataList={PortfolioList} dataKey="ProjectId" dataValue="ProjectName" setMethod={(method) => setProductId(method)} />


        
            <Selector placeholder="Select Pricing Type" dataList={pricingType} dataKey="ref" dataValue="ref" setMethod={(method) => setPricingType(method)} />


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
            onClick={()=>{handleConfigurePrice()}}
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
           Payment History
          </u>
        </span>

        <GridComponent
           id="gridcomp"
      toolbar={['Search']}  // Add the search bar
 
          dataSource={PriceList}
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
            {PriceConfigGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />

        </GridComponent>
      </div>
    </div>
  );
}

export default PriceConfiguration;
