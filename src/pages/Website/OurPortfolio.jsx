import React, { useEffect, useState } from 'react'
import "./Website.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdmitButton, AdmitButton3, AdmitStudentColumn, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaNotes, FormTextAreaStudent } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { contextMenuItems, emailData, emailGrid, employeeGrid, PortfolioGrid } from '../../data/champion';
import { ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-charts';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import { apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import defaultImage from "../../data/default.jpeg";
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';



const OurPortfolio = () => {

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
  const [sect, ssecmt] = useState("")

  const [Picture, setPicture] = useState("")
  const [Link, setLink] = useState("")
  const [ProjectName, setProjectName] = useState("")
  const [ProjectId, setProjectId] = useState("")


  

  

  
    const handleCreateOurPortfolioHeader = async () => {

 

      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("Main_Title", mt)
      formData.append("Secondary_Title", sect)
      
         
      formData.append("AdminId",userInfo.UserId)
     
          const response = await fetch(apiServer+"CreateOurPortfolioHeader", {
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


      const handleCreateOurPortfolioProjects = async () => {

 

        Show.showLoading("Processing Data");
          try {
        
        const formData = new FormData()
        formData.append("Picture", Picture)
        formData.append("Link", Link)
        formData.append("ProjectName", ProjectName)
        
      
           
        formData.append("AdminId",userInfo.UserId)
       
            const response = await fetch(apiServer+"CreateOurPortfolioProjects", {
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
  
        const handleUpdateOurPortfolioProjects = async () => {

 

          Show.showLoading("Processing Data");
            try {
          
          const formData = new FormData()
          formData.append("Picture", Picture)
          formData.append("Link", Link)
          formData.append("ProjectName", ProjectName)
          formData.append("ProjectId", ProjectId)
          
        
             
          formData.append("AdminId",userInfo.UserId)
         
              const response = await fetch(apiServer+"UpdateOurPortfolioProjects", {
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

          const handleDeleteOurPortfolioProjects = async (Id) => {

 

            Show.showLoading("Processing Data");
              try {
            
            const formData = new FormData()
            formData.append("Picture", Picture)
            formData.append("Link", Link)
            formData.append("ProjectName", ProjectName)
            formData.append("ProjectId", Id)
            
          
               
            formData.append("AdminId",userInfo.UserId)
           
                const response = await fetch(apiServer+"DeleteOurPortfolioProjects", {
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
        fetch(apiServer+"ViewAdminOurPortfolioHeader",{
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
      
    




    
      const handleActionBegin = (args) => {
        if (args.requestType === 'save') {
          const updatedData = args.data;
          alert("Use The Forms To Edit")
        }
    
        if (args.requestType === 'delete') {
          const deletedData = args.data[0]; // assuming single delete
          handleDeleteOurPortfolioProjects(deletedData.ProjectId);
        }
      };
    
    



  return (
    <div>

<Header category="Website" title="Our Portfolio" />


<div className="Bigcard" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Our Portfolio </div>

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

     
    </AdmitStudentColumn>
</div>

<AdmitStudentRole>
<AdmitButton3
        background={localStorage.getItem("colorMode")}
        color="white"
       border={localStorage.getItem("colorMode")}
        
       onClick={()=>{handleCreateOurPortfolioHeader()}}
        >Submit
</AdmitButton3>
</AdmitStudentRole>



    <div className="wwd-column">



        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Add Project </div>

          <AdmitStudentRole>


          <div>
        <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Project Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setProjectName(e.target.value)}
       
        />
     </div>


    <div>
                <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Picture</FormLable>
        <FormInputStudent
         type="file"
         required
         placeholder=""
         accept=".jpg, .png, .jpeg, .ico, .webp"
         onChange={(e) => setPicture(e.target.files[0])}
        
        />
     </div>

     <div>
        <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Link</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setLink(e.target.value)}
       
        />
     </div>


     


          </AdmitStudentRole>

          <AdmitButton3
        background={localStorage.getItem("colorMode")}
        color="white"
       border={localStorage.getItem("colorMode")}
        style={{marginBottom:"1rem"}}
        onClick={()=>{handleCreateOurPortfolioProjects()}}
        
        >Add
        </AdmitButton3>


        <div>
        <FormLable
        style={{ color: localStorage.getItem("colorMode")}}>Enter Project Id</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setProjectId(e.target.value)}
       
        />
     </div>

     <AdmitButton3
        background={localStorage.getItem("colorMode")}
        color="white"
       border={localStorage.getItem("colorMode")}
        style={{marginBottom:"1rem"}}
        onClick={()=>{handleUpdateOurPortfolioProjects()}}
        
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
          Project List
          </u>
        </span>

        <GridComponent
           id="gridcomp"
      toolbar={['Search']}  // Add the search bar
 
          dataSource={PortfolioList}
          enableHover={true}
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
            {PortfolioGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />

        </GridComponent>
      </div>

    </div>
  )
}

export default OurPortfolio