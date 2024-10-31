import React, { useState, useRef, useEffect } from 'react';
import "./Website.css";
import defaultImage from "../../data/default.jpeg";
import { HtmlEditor, Inject, Toolbar, RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort } from '@syncfusion/ej2-react-grids';
import { emailData, emailGrid, contextMenuItems } from '../../data/champion';
import { ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-charts';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdmitButton, AdmitButton3, AdmitStudentColumn, AdmitStudentRole, FormInputStudent, FormInputStudent2, FormLable, FormTextAreaNotes, FormTextAreaStudent, HeroImgInput } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { Header } from '../../components';
import { Show } from '../../data/Alerts';
import { apiMedia, apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { Search} from '@syncfusion/ej2-react-grids';



const Hero = () => {

const navigate = useNavigate()


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


  const editing = { allowDeleting: true, };

  
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
  

  const [Picture1, setPicture1] = useState("")
  const [Picture2, setPicture2] = useState("")
  const [Picture3, setPicture3] = useState("")
  const [Picture4, setPicture4] = useState("")
  const [Picture5, setPicture5] = useState("")
  const [Picture6, setPicture6] = useState("")

  const [Section1, setSection1] = useState("")
  const [Section2, setSection2] = useState("")
  const [Section3, setSection3] = useState("")
  const [Section4, setSection4] = useState("")

  const [HeroPic, setHeroPic] = useState([])

useEffect(()=>{
  fetch(apiServer+"ViewAdminHero",{
    method:"POST",
    headers: {
      'UserId': userInfo.UserId,         
      'SessionId': userInfo.SessionId    
    },
  })
  .then(res => res.json())
  .then(data => setHeroPic(data[0] || {}))
  .catch(error => console.error(error))
},[userInfo])



  const handleCreateHero = async () => {

 

    Show.showLoading("Processing Data");
      try {
    
    const formData = new FormData()
    formData.append("Picture1", Picture1)
    formData.append("Picture2", Picture2)
    formData.append("Picture3", Picture3)
    formData.append("Picture4", Picture4)
    formData.append("Picture5", Picture5)
    formData.append("Picture6", Picture6)
    formData.append("Section1", Section1)
    formData.append("Section2", Section2)
    formData.append("Section3", Section3)
    formData.append("Section4", Section4)
   
    formData.append("AdminId",userInfo.UserId)
   
        const response = await fetch(apiServer+"CreateHero", {
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

  



  return (
    <div>

<Header category="Website" title="Hero" />

      <div className="hero-features">

        <div className="hero-feature">
          {
            HeroPic.Picture1==null?<>
            <img src={defaultImage} alt="feature" />
            </>:<>
            <img src={apiMedia+HeroPic.Picture1} alt="feature" />
            </>
          }
          

          <HeroImgInput
     type="file"
     required
     placeholder=""
     accept=".jpg, .png, .jpeg, .ico, .webp"
     onChange={(e) => setPicture1(e.target.files[0])}
     
    />   
    
     </div>

        <div className="hero-feature">
        {
            HeroPic.Picture2==null?<>
            <img src={defaultImage} alt="feature" />
            </>:<>
            <img src={apiMedia+HeroPic.Picture2} alt="feature" />
            </>
          }
          
          <HeroImgInput
     type="file"
     required
     placeholder=""
     accept=".jpg, .png, .jpeg, .ico, .webp"
     onChange={(e) => setPicture2(e.target.files[0])}
     
    />   
    
        </div>
        <div className="hero-feature">
        {
            HeroPic.Picture3==null?<>
            <img src={defaultImage} alt="feature" />
            </>:<>
            <img src={apiMedia+HeroPic.Picture3} alt="feature" />
            </>
          }
          
          <HeroImgInput
     type="file"
     required
     placeholder=""
     accept=".jpg, .png, .jpeg, .ico, .webp"
     onChange={(e) => setPicture3(e.target.files[0])}
     
    />   
    
        </div>
        <div className="hero-feature">
        {
            HeroPic.Picture4==null?<>
            <img src={defaultImage} alt="feature" />
            </>:<>
            <img src={apiMedia+HeroPic.Picture4} alt="feature" />
            </>
          }
          
          <HeroImgInput
     type="file"
     required
     placeholder=""
     accept=".jpg, .png, .jpeg, .ico, .webp"
     onChange={(e) => setPicture4(e.target.files[0])}
     
    />   
    
        </div>
        <div className="hero-feature">
        {
            HeroPic.Picture5==null?<>
            <img src={defaultImage} alt="feature" />
            </>:<>
            <img src={apiMedia+HeroPic.Picture5} alt="feature" />
            </>
          }
          
          <HeroImgInput
     type="file"
     required
     placeholder=""
     accept=".jpg, .png, .jpeg, .ico, .webp"
     onChange={(e) => setPicture5(e.target.files[0])}
     
    />   
    
        </div>
        <div className="hero-feature">
        {
            HeroPic.Picture6==null?<>
            <img src={defaultImage} alt="feature" />
            </>:<>
            <img src={apiMedia+HeroPic.Picture6} alt="feature" />
            </>
          }
          
          <HeroImgInput
     type="file"
     required
     placeholder=""
     accept=".jpg, .png, .jpeg, .ico, .webp"
     onChange={(e) => setPicture6(e.target.files[0])}
     
    />   
    
        </div>
      </div>


      <div className="Bigcard" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Hero Messages </div>

          <AdmitStudentColumn>
     
     <div>
          <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Section 1</FormLable>
        <FormTextAreaNotes
        type="text"
        style={{ color: localStorage.getItem("colorMode")}}
    
        placeholder={HeroPic.Section1}
        onChange={(e) => setSection1(e.target.value)}
       
        />
     </div>

     <div>
          <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Section 2</FormLable>
        <FormTextAreaNotes
       type="text"
        style={{ color: localStorage.getItem("colorMode")}}
       
        placeholder={HeroPic.Section2}
        onChange={(e) => setSection2(e.target.value)}
       
        />
     </div>

     <div>
          <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Section 3</FormLable>
        <FormTextAreaNotes
       type="text"
        style={{ color: localStorage.getItem("colorMode")}}
        
        placeholder={HeroPic.Section3}
        onChange={(e) => setSection3(e.target.value)}
       
        />
     </div>

     <div>
          <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Section 4</FormLable>
        <FormTextAreaNotes
       type="text"
        style={{ color: localStorage.getItem("colorMode")}}
        
        placeholder={HeroPic.Section4}
        onChange={(e) => setSection4(e.target.value)}
       
        />
     </div>


     


    </AdmitStudentColumn>



        </div>



<AdmitStudentRole>
<AdmitButton3
        background={localStorage.getItem("colorMode")}
        color="white"
       border={localStorage.getItem("colorMode")}
       style={{padding:"2rem"}}
        onClick={()=>{handleCreateHero()}}
        >Submit
</AdmitButton3>
</AdmitStudentRole>
      
    


    </div>
  );
};

export default Hero;
