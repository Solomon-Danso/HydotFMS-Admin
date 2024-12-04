import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import {  checkingGrid, contextMenuItems, deliveryGlobalGrid, deliveryGrid } from '../../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';





const DeliveryList = () => {
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

fetch(apiServer+"ViewGlobalDelivery",{
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



  return (
    <div>
      <Header category="Delivery" title="Delivery List" />


      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        
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
          style={{ backgroundColor: localStorage.getItem("colorMode") }}
        >
          <ColumnsDirective>
            {deliveryGlobalGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />

        </GridComponent>
      </div>
    </div>
  );
}

export default DeliveryList;
