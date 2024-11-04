import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import Select from 'react-select';
import styled from 'styled-components';
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile';
import { colors } from '../../data/Colors';
import { categoryGrid, contextMenuItems, continentList, countryList, customers, customersData, customersGrid, emailData, emailGrid, employeeData, employeeGrid, exploreGrid, exploreMediaGrid, otherGrid, paymentData, paymentGrid, paymentMethod, paymentReference, productGrid, products } from '../../data/champion';
import { GridComponent, ContextMenu, Edit, ExcelExport, Filter, Page, PdfExport, Resize, Sort, ColumnDirective, ColumnsDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../../components';
import Selector from '../../data/Selector';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { TfiLayoutSlider } from 'react-icons/tfi';
import { FaCar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import HydotTable from '../../data/HydotTable';




const Explore = () => {
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



const [CategoryId, setCategoryId] = useState("")
const [previewImage, setPreviewImage] = useState(null); // For image preview
const [preview1Image, setPreview1Image] = useState(null); // For image preview


const [Src, setSrc] = useState("")
const [DetailedPicture, setDetailedPicture] = useState("")
const [CoverType, setCoverType] = useState("")
const [Title, setTitle] = useState("")
const [SubTitle, setSubTitle] = useState("")
const [YearModel, setYearModel] = useState("")
const [Price, setPrice] = useState(0.0)
const [GearType, setGearType] = useState("")
const [FuelType, setFuelType] = useState("")
const [Explore, setExplore] = useState([])
const [ExploreID, setExploreID] = useState("")


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

fetch(apiServer+"ViewProductAdmin",{
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

const [ExploreIDExt, setExploreIDExt] = useState(""); // Ensure ExploreID is initialized



useEffect(()=>{

    const formData = new FormData();
    formData.append("AdminId",userInfo.UserId)
  
  fetch(apiServer+"ViewAllExplore",{
    method: "POST",
        headers: {
          'UserId': userInfo.UserId,         
          'SessionId': userInfo.SessionId    
        },
        body:formData
  })
  .then(res=>res.json())
  .then(data=>{
    setExplore(data)
    setExploreIDExt(data.ExploreID)
  })
  .catch(err=>console.error(err))
  
  
  },[userInfo])







const handleCreateAdmin = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()

formData.append("AdminId",userInfo.UserId)
formData.append("Src",Src);
formData.append("DetailedPicture",DetailedPicture);
formData.append("CoverType",CoverType);
formData.append("Title",Title);
formData.append("Price",Price);
formData.append("SubTitle",SubTitle);
formData.append("YearModel",YearModel);
formData.append("GearType",GearType);
formData.append("FuelType",FuelType);




    const response = await fetch(apiServer+"CreateExplore", {
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


const handleEditAdmin = async () => {

 

Show.showLoading("Processing Data");
  try {

const formData = new FormData()
formData.append("AdminId",userInfo.UserId)
formData.append("Src",Src);
formData.append("DetailedPicture",DetailedPicture);
formData.append("CoverType",CoverType);
formData.append("Title",Title);
formData.append("Price",Price);
formData.append("SubTitle",SubTitle);
formData.append("YearModel",YearModel);
formData.append("GearType",GearType);
formData.append("FuelType",FuelType);


    const response = await fetch(apiServer+"UpdateProduct", {
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

const handleDeleteAdmin = async (id) => {

 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("UserId", id) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeleteAdmin", {
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
      handleDeleteAdmin(deletedData.UserId);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSrc(file);
  
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDImageChange = (e) => {
    const file = e.target.files[0];
    setDetailedPicture(file);
  
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview1Image(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
const fileType = [
    {id:1, name:"Image"},
    {id:2, name:"Video"},
]


// Define the menu items array
const menuItems = [
  {
    icon: <TfiLayoutSlider />,
    text: "Add Sources",
    type: "navigate",
    path: `/main/explore/:ExploreID`, // Placeholder for the dynamic segment
  },
  {
    icon: <FaCar />,
    text: "Add Specifications",
    type: "navigate",
    path: `/main/explore/specs/:ExploreID`, // Placeholder for the dynamic segment
  },
  {
    icon: <MdDelete />,
    text: "Delete",
    type: "function",
    onClick: (id, ExploreID) => {
      testFunction(id, ExploreID); // Assuming this function is defined in your component
    },
    columnNames: ['id', 'ExploreID'] // Specify the column name for the ID here
  },
];

const testFunction = (id, ExploreID) =>{
alert("Params Captured : "+id+" and "+ExploreID)
}



  return (
    <div>
      <Header category="Website Configuration" title="Explore" />

      <div className="wwd-row">

        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Add  Explore </div>

          <AdmitStudentRole>

          <Selector placeholder="Select CoverType" dataList={fileType} dataKey="name" dataValue="name" setMethod={(method) => setCoverType(method)} />
            
            {
                CoverType=="Image"?<>
                
                
                {previewImage && (
              <div style={{ marginTop: "1rem" }}>
                <img src={previewImage} alt="Preview" style={{ width: "auto", height: "40vh" }} />
              </div>
            )}
      
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Cover</FormLable>
              <FormInputStudent
               type="file"
               required
               placeholder=""
               accept=".jpg, .png, .jpeg, .ico, .webp"
               onChange={handleImageChange}
               
              />
            </div>

                
                
                </>:<></>
            }


            {
                CoverType=="Video"?<>
                
                
                {previewImage && (
              <video
              controls
              width="200"
              height="200"
              src={previewImage}
              style={{ width: "auto", height: "40vh" }}
            >
              Your browser does not support the video tag.
            </video>
            )}
      
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Cover</FormLable>
              <FormInputStudent
               type="file"
               required
               placeholder=""
               accept=".mp4, .mov"
               onChange={handleImageChange}
               
              />
            </div>

                
                
                </>:<></>
            }


            
            
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Title</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setTitle(e.target.value)}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> SubTitle</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setSubTitle(e.target.value)}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Year Model</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setYearModel(e.target.value)}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Price</FormLable>
              <FormInputStudent
               type="number"

               placeholder=""
               onChange={(e) => setPrice(e.target.value)}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Gear Type</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setGearType(e.target.value)}
               
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Fuel Type</FormLable>
              <FormInputStudent
               type="text"

               placeholder=""
               onChange={(e) => setFuelType(e.target.value)}
               
              />
            </div>

            {preview1Image && (
              <div style={{ marginTop: "1rem" }}>
                <img src={preview1Image} alt="Preview" style={{ width: "auto", height: "40vh" }} />
              </div>
            )}
      
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Detailed Picture</FormLable>
              <FormInputStudent
               type="file"
               required
               placeholder=""
               accept=".jpg, .png, .jpeg, .ico, .webp"
               onChange={handleDImageChange}
               
              />
            </div>

           
           
         
          </AdmitStudentRole>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleCreateAdmin()}}       
            >Add
          </AdmitButton3>

          <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Enter Explore Id</FormLable>
              <FormInputStudent
                type="text"
                required
                placeholder=""
                onChange={(e) => setExploreID(e.target.value)}
              />
            </div>

            <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleEditAdmin()}}
            
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
          Explore List
          </u>
        </span>

        <HydotTable 
  columns={exploreGrid} 
  data={Explore} 
  media={exploreMediaGrid} 
  colorMode={localStorage.getItem("colorMode")}
  menuItems={menuItems}
/>;

       
      </div>
    </div>
  );
}

export default Explore;

