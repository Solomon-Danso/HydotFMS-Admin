import React, { useEffect, useState } from 'react';
import "./Website/Website.css";
import Select from 'react-select';
import styled from 'styled-components';
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from './../data/Profile';
import { colors } from './../data/Colors';
import { auditTrialGrid, clientApiGrid, contextMenuItems, countryList, customers, emailData, emailGrid, paymentGrid, paymentMethod, paymentReference, products, visitorsGrid } from './../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from './../components';
import Selector from './../data/Selector';
import { Show } from '../data/Alerts';
import { apiServer } from '../data/Endpoint';
import { useNavigate } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';



const Visitors = () => {


  
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

  

  const [Audit, setAudit] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "GetVisitors", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
          if (data.visitors !== undefined) {
            setAudit(data.visitors);
          } else {
            console.error("Unexpected response format:", data);
          }
         
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);



  return (
    <div>
      <Header category="APPS" title="Visitors" />


     
<div style={{marginTop:"5rem"}}>

<GridComponent
       id="gridcomp"
      toolbar={['Search']}  // Add the search bar
      dataSource={Audit}
      allowPaging
      allowSorting
      allowExcelExport
      allowPdfExport
      contextMenuItems={contextMenuItems}
      editSettings={editing}
      style={{ backgroundColor: localStorage.getItem("colorMode") }}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {visitorsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>
      <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />
    </GridComponent>

</div>
     

    </div>
  );
}

export default Visitors;
