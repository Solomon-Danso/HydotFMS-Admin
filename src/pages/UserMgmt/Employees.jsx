import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import Select from 'react-select';
import styled from 'styled-components';
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { contextMenuItems, continentList, countryList, customers, customersData, customersGrid, emailData, emailGrid, employeeData, employeeGrid, paymentData, paymentGrid, paymentMethod, paymentReference, products } from '../../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';




const Employee = () => {
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

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, };

  const [continent, setContinent] = useState("")
  const [country, setCountry] = useState("")
  const [picture, setPicture] = useState("")
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [EmployeeUserId,setEmployeeUserId] = useState("")


  const [continentEdit, setContinentEdit] = useState("")
  const [countryEdit, setCountryEdit] = useState("")
  const [pictureEdit, setPictureEdit] = useState("")
  const [nameEdit, setNameEdit] = useState("")
  const [locationEdit, setLocationEdit] = useState("")
  const [phoneEdit, setPhoneEdit] = useState("")
  const [emailEdit, setEmailEdit] = useState("")
  const [EmployeeList, setEmployeeList] = useState([])



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

fetch(apiServer+"ViewAllEmployee",{
  method: "POST",
      headers: {
        'UserId': userInfo.UserId,         
        'SessionId': userInfo.SessionId    
      },
      body:formData
})
.then(res=>res.json())
.then(data=>setEmployeeList(data))
.catch(err=>console.error(err))


},[userInfo])



const handleCreateEmployee = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()
formData.append("Email", email)
formData.append("Location", location)
formData.append("Name", name)
formData.append("Picture", picture)

formData.append("Continent", continent)
formData.append("Country", country)
formData.append("Phone", phone)

formData.append("AdminId",userInfo.UserId)
//console.table(formData)

    const response = await fetch(apiServer+"CreateEmployee", {
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


const handleEditEmployee = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()
formData.append("Email", email)
formData.append("Location", location)
formData.append("Name", name)
formData.append("Picture", picture)

formData.append("Continent", continent)
formData.append("Country", country)
formData.append("Phone", phone)
formData.append("EmployeeUserId", EmployeeUserId)

formData.append("AdminId",userInfo.UserId)
//console.table(formData)

    const response = await fetch(apiServer+"UpdateEmployee", {
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

const handleDeleteEmployee = async (id) => {

 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("UserId", id) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeleteEmployee", {
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
      handleDeleteEmployee(deletedData.UserId);
    }
  };

  return (
    <div>
      <Header category="User Management" title="Employee" />

      <div className="wwd-row">

        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Add  Employee </div>

          <AdmitStudentRole>

          <Selector placeholder="Select Continent" dataList={continentList} dataKey="name" dataValue="name" setMethod={(method) => setContinent(method)} />
            <Selector placeholder="Select Country" dataList={countryList} dataKey="country" dataValue="country" setMethod={(method) => setCountry(method)} />


            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Employee Picture</FormLable>
              <FormInputStudent
               type="file"
               required
               placeholder=""
               accept=".jpg, .png, .jpeg, .ico, .webp"
               onChange={(e) => setPicture(e.target.files[0])}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Employee Name</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setName(e.target.value)}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Location</FormLable>
              <FormInputStudent
                type="text"
                required
                placeholder=""
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Employee Phone</FormLable>
              <FormInputStudent
                type="text"
                required
                placeholder=""
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Employee Email</FormLable>
              <FormInputStudent
                type="email"
                required
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>





           
         
          </AdmitStudentRole>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleCreateEmployee()}}       
            >Add
          </AdmitButton3>

          <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Enter  Employee Id</FormLable>
              <FormInputStudent
                type="text"
                required
                placeholder=""
                onChange={(e) => setEmployeeUserId(e.target.value)}
              />
            </div>

            <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleEditEmployee()}}
            
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
          Employee List
          </u>
        </span>

        <GridComponent
           id="gridcomp"
      toolbar={['Search']}  // Add the search bar
 
          dataSource={EmployeeList}
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
            {employeeGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />

        </GridComponent>
      </div>
    </div>
  );
}

export default Employee;
