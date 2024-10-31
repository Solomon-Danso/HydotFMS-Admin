import React, { useEffect, useState } from 'react'
import "./Website.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdmitButton, AdmitButton3, AdmitStudentColumn, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaNotes } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { contextMenuItems, emailData, emailGrid } from '../../data/champion';
import { ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-charts';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import { Show } from '../../data/Alerts';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { apiServer } from '../../data/Endpoint';



const WhatWeDo = () => {

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

  const [mt, smt] = useState("")
  const [sect, ssecmt] = useState("")

  const [lmt, slmt] = useState("")
  const [lsect, slsecmt] = useState("")
  const [ltxt1, sltxt1] = useState("")
  const [ltxt2, sltxt2] = useState("")
  const [ltxt3, sltxt3] = useState("")

  const [rmt, srmt] = useState("")
  const [rsect, srsecmt] = useState("")
  const [rtxt1, srtxt1] = useState("")
  const [rtxt2, srtxt2] = useState("")
  const [rtxt3, srtxt3] = useState("")

  const [mmt, smmt] = useState("")
  const [msect, smsecmt] = useState("")
  const [mtxt1, smtxt1] = useState("")
  const [mtxt2, smtxt2] = useState("")
  const [mtxt3, smtxt3] = useState("")







  
    const handleCreateWhatWeDo = async () => {

 

      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("Main_Title", mt)
      formData.append("Secondary_Title", sect)
      formData.append("Left_Main_Title", lmt)
      formData.append("Left_Secondary_Title", lsect)
      formData.append("Left_Text1", ltxt1)
      formData.append("Left_Text2", ltxt2)
      formData.append("Left_Text3", ltxt3)

      formData.append("Right_Main_Title", rmt)
      formData.append("Right_Secondary_Title", rsect)
      formData.append("Right_Text1", rtxt1)
      formData.append("Right_Text2", rtxt2)
      formData.append("Right_Text3", rtxt3)

      formData.append("Middle_Main_Title",mmt)
      formData.append("Middle_Secondary_Title",msect)
      formData.append("Middle_Text1",mtxt1)
      formData.append("Middle_Text2",mtxt2)

    
    
         
      formData.append("AdminId",userInfo.UserId)
     
          const response = await fetch(apiServer+"CreateWhatWeDo", {
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
  
    const handleDelete = (id) => {
      console.log('Delete entry ID:', id);
    };
  
    const handleActionBegin = (args) => {
      if (args.requestType === 'save') {
        const updatedData = args.data;
        handleEdit(updatedData);
      }
  
      if (args.requestType === 'delete') {
        const deletedData = args.data[0]; // assuming single delete
        handleDelete(deletedData.Id);
      }
    };

    const [Viewer, setViewer] = useState([])

useEffect(()=>{
  fetch(apiServer+"ViewAdminWhatWeDo",{
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

<Header category="Website" title="What We Do" />







<div className="Bigcard" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>What We Do </div>

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
            style={{ color: localStorage.getItem("colorMode")}}>Secondary Title</FormLable>
            <FormInputStudent
            type="text"
            
            placeholder={Viewer.Left_Secondary_Title}
           onChange={(e) => slsecmt(e.target.value)}
           
            />
         </div>
    
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Text 1</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Left_Text1}
           onChange={(e) => sltxt1(e.target.value)}
           
            />
         </div>
    
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Text 2</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Left_Text2}
            onChange={(e) => sltxt2(e.target.value)}
           
            />
         </div>
    
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Text 3</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Left_Text3}
            onChange={(e) => sltxt3(e.target.value)}
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
            style={{ color: localStorage.getItem("colorMode")}}>Secondary Title</FormLable>
            <FormInputStudent
            type="text"
            
            placeholder={Viewer.Right_Secondary_Title}
           onChange={(e) => srsecmt(e.target.value)}
           
            />
         </div>
    
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Text 1</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Right_Text1}
           onChange={(e) => srtxt1(e.target.value)}
           
            />
         </div>
    
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Text 2</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Right_Text2}
            onChange={(e) => srtxt2(e.target.value)}
           
            />
         </div>
    
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Text 3</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Right_Text3}
            onChange={(e) => srtxt3(e.target.value)}
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
            style={{ color: localStorage.getItem("colorMode")}}>Secondary Title</FormLable>
            <FormInputStudent
            type="text"
            
            placeholder={Viewer.Middle_Secondary_Title}
           onChange={(e) => smsecmt(e.target.value)}
           
            />
         </div>
    
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Text 1</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Middle_Text1}
           onChange={(e) => smtxt1(e.target.value)}
           
            />
         </div>
    
         <div>
                    <FormLable
            style={{ color: localStorage.getItem("colorMode")}}>Text 2</FormLable>
            <FormInputStudent
            type="text"
            required
            placeholder={Viewer.Middle_Text2}
            onChange={(e) => smtxt2(e.target.value)}
           
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
        onClick={()=>{handleCreateWhatWeDo()}}
        
        >Submit
</AdmitButton3>

</AdmitStudentRole>



    </div>
  )
}

export default WhatWeDo