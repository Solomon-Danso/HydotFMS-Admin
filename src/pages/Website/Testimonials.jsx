import React, { useEffect, useState } from 'react'
import "./Website.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdmitButton, AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { contextMenuItems, emailData, emailGrid, TestimonialsGrid } from '../../data/champion';
import { ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-charts';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import { apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';



const Testimonials = () => {

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
  


  const [mt, smt] = useState("")


  const [Message, setMessage] = useState("")
  const [Fullname, setFullname] = useState("")
  const [Position, setPosition] = useState("")
  const [Id, setId] = useState("")
  
  

  

  
    const handleCreateTestimonials = async () => {

 

      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("Message", Message)
      formData.append("Fullname", Fullname)
      formData.append("Position", Position)
     
      
         
      formData.append("AdminId",userInfo.UserId)
     
          const response = await fetch(apiServer+"CreateTestimonials", {
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


      const handleUpdateTestimonials = async () => {

 

        Show.showLoading("Processing Data");
          try {
        
        const formData = new FormData()
        formData.append("Message", Message)
        formData.append("Fullname", Fullname)
        formData.append("Position", Position)
        formData.append("Id",Id)       
           
        formData.append("AdminId",userInfo.UserId)
       
            const response = await fetch(apiServer+"UpdateTestimonials", {
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
  


          const handleDeleteTestimonials = async (Id) => {

        

            Show.showLoading("Processing Data");
              try {
            
            const formData = new FormData()
         
          formData.append("Id", Id)
            
          
               
            formData.append("AdminId",userInfo.UserId)
           
                const response = await fetch(apiServer+"DeleteTestimonials", {
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
    







     

      const [TestimonialsList, setTestimonialsList] = useState([])

      useEffect(()=>{
        fetch(apiServer+"ViewTestimonials",{
          method:"POST",
          headers: {
            'UserId': userInfo.UserId,         
            'SessionId': userInfo.SessionId    
          },
        })
        .then(res => res.json())
        .then(data => setTestimonialsList(data))
        .catch(error => console.error(error))
      },[userInfo])
      




    
      const handleActionBegin = (args) => {
        if (args.requestType === 'save') {
          const updatedData = args.data;
          alert("Use The Forms To Edit")
        }
    
        if (args.requestType === 'delete') {
          const deletedData = args.data[0]; 
  
          handleDeleteTestimonials(deletedData.id);
        }
      };
    
    





  return (
    <div>

<Header category="Website" title="Testimonials" />



    <div className="wwd-column">



        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Add Testimony </div>

          <AdmitStudentRole>

    <div>
                <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Message</FormLable>
        <FormTextAreaStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setMessage(e.target.value)}
       
        />
     </div>

    <div>
                <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Full Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setFullname(e.target.value)}
       
        />
     </div>

     <div>
                <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Position</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setPosition(e.target.value)}
       
        />
     </div>




     


    </AdmitStudentRole>

          <AdmitButton3
        background={localStorage.getItem("colorMode")}
        color="white"
       border={localStorage.getItem("colorMode")}
        style={{marginBottom:"1rem"}}
        onClick={()=>{handleCreateTestimonials()}}
        
        >Add
        </AdmitButton3>

        <div>
                <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Enter Id</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setId(e.target.value)}
       
        />
     </div>

     <AdmitButton3
        background={localStorage.getItem("colorMode")}
        color="white"
       border={localStorage.getItem("colorMode")}
        style={{marginBottom:"1rem"}}
        onClick={()=>{handleUpdateTestimonials()}}
        
        >Edit
        </AdmitButton3>



        </div>

       

    </div>


    <div style={{ marginTop: "2rem",padding:"1rem"}}>
        
        <span>
          <u
            style={{
              color: localStorage.getItem("colorMode"),
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Testimonial List
          </u>
        </span>

        <GridComponent
           id="gridcomp"
      toolbar={['Search']}  // Add the search bar
 
          dataSource={TestimonialsList}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
           actionBegin={handleActionBegin}
          style={{backgroundColor: localStorage.getItem("colorMode")}}
        >
          <ColumnsDirective>
            {TestimonialsGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />

        </GridComponent>        
     
    </div>


    </div>
  )
}

export default Testimonials