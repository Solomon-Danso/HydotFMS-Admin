import React, { useEffect, useState } from 'react'
import "./Website.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdmitButton, AdmitButton3, AdmitStudentColumn, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaNotes, FormTextAreaStudent } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { contextMenuItems, emailData, emailGrid } from '../../data/champion';
import { ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-charts';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import { useNavigate } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import { apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';



const OurDifferences = () => {

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
  


  const [mt, smt] = useState("")
  const [sect, ssecmt] = useState("")

  const [lmt, slmt] = useState("")
  const [ldes, sldes] = useState("")

  const [rmt, srmt] = useState("")
  const [rdes, srdes] = useState("")

  const [mmt, smmt] = useState("")
  const [mdes, smdes] = useState("")


  

  

  
    const handleCreateOurDifferences = async () => {

 

      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("Main_Title", mt)
      formData.append("Secondary_Title", sect)
      formData.append("Left_Main_Title", lmt)
      formData.append("Left_Description", ldes)
      formData.append("Right_Main_Title", rmt)
      formData.append("Right_Description", rdes)
      formData.append("Middle_Main_Title", mmt)
      formData.append("Middle_Description", mdes)
    
         
      formData.append("AdminId",userInfo.UserId)
     
          const response = await fetch(apiServer+"CreateOurDifferences", {
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

      const [Viewer, setViewer] = useState([])

      useEffect(()=>{
        fetch(apiServer+"ViewAdminOurDifferences",{
          method:"POST",
          headers: {
            'UserId': userInfo.UserId,         
            'SessionId': userInfo.SessionId    
          },
        })
        .then(res => res.json())
        .then(data => setViewer(data[0] || {}))
        .catch(error => console.error(error))
      },[userInfo])
      





  return (
    <div>

<Header category="Website" title="Our Differences" />




<div className="Bigcard" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Our Differences </div>

          <AdmitStudentColumn>
     
     <div>
          <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Main Title</FormLable>
        <FormTextAreaNotes
        type="text"
        style={{ color: localStorage.getItem("colorMode")}}
    
        placeholder={Viewer.Main_Title}
        onChange={(e) => smt(e.target.value)}
       
        />
     </div>

     <div>
          <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Secondary Title</FormLable>
        <FormTextAreaNotes
       type="text"
        style={{ color: localStorage.getItem("colorMode")}}
       
        placeholder={Viewer.Secondary_Title}
        onChange={(e) => ssecmt(e.target.value)}
       
        />
     </div>


     <div className="wwd-row">
       
       <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
              <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Left Card </div>
    
              <AdmitStudentRole>
        <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Main Title</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Left_Main_Title}
        onChange={(e) => slmt(e.target.value)}
           
            />
         </div>
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Description</FormLable>
            <FormTextAreaStudent
            type="text"
            
            placeholder={Viewer.Left_Description}
            onChange={(e) => sldes(e.target.value)}
           
            />
         </div>
    
    
         
    
    
        </AdmitStudentRole>
    
    
    
            </div>
    
    
            <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
              <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Right Card </div>
    
              <AdmitStudentRole>
        <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Main Title</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Right_Main_Title}
        onChange={(e) => srmt(e.target.value)}
           
            />
         </div>
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Description</FormLable>
            <FormTextAreaStudent
            type="text"
            
            placeholder={Viewer.Right_Description}
            onChange={(e) => srdes(e.target.value)}
           
            />
         </div>
    
    
         
    
    
        </AdmitStudentRole>
    
    
            </div>
    
    
            <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
              <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Middle Card </div>
    
              <AdmitStudentRole>
        <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Main Title</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Middle_Main_Title}
        onChange={(e) => smmt(e.target.value)}
           
            />
         </div>
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Description</FormLable>
            <FormTextAreaStudent
            type="text"
            
            placeholder={Viewer.Middle_Description}
            onChange={(e) => smdes(e.target.value)}
           
            />
         </div>
    
    
         
    
    
        </AdmitStudentRole>
    
    
    
            </div>
    
    
    
        </div>

     
    </AdmitStudentColumn>



</div>












<AdmitStudentRole>


<AdmitButton3
        background={localStorage.getItem("colorMode")}
        color="white"
       border={localStorage.getItem("colorMode")}
        
       onClick={()=>{handleCreateOurDifferences()}}
      
      >Submit
</AdmitButton3>

</AdmitStudentRole>




    </div>
  )
}

export default OurDifferences