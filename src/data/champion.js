import React,{useState,useEffect} from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoIosPeople, IoMdContacts } from 'react-icons/io';
import { RiAdminLine, RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdDeleteForever, MdElectricBike, MdMenuOpen, MdOutlineAccountBalance, MdOutlineDashboard, MdOutlineDiscount, MdOutlineInventory, MdOutlineKeyOff, MdOutlineLocalPolice, MdOutlineSecurity, MdOutlineSupervisorAccount, MdWork, MdWorkspaces } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { TiTick } from 'react-icons/ti';
import { GiConverseShoe, GiExpense, GiFireworkRocket, GiLouvrePyramid, GiMoneyStack, GiPublicSpeaker, GiReceiveMoney, GiSpanner, GiSunkenEye, GiTakeMyMoney, GiWarlockEye } from 'react-icons/gi';
import { GrConfigure, GrDeliver, GrLocation, GrShieldSecurity } from 'react-icons/gr';
import avatar from './avatar.jpg';
import avatar2 from './avatar2.jpg';
import avatar3 from './avatar3.png';
import avatar4 from './avatar4.jpg';
import product1 from './product1.jpg';
import product2 from './product2.jpg';
import product3 from './product3.jpg';
import product4 from './product4.jpg';
import product5 from './product5.jpg';
import product6 from './product6.jpg';
import product7 from './product7.jpg';
import { IoCarSportOutline, IoChatbubbleEllipsesOutline, IoEyeSharp } from "react-icons/io5";
import { FcGlobe, FcProcess } from "react-icons/fc";
import { FaAmazonPay, FaBasketShopping, FaClipboardCheck, FaKey, FaPeoplePulling } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { SiApacherocketmq, SiBloglovin, SiSecurityscorecard } from "react-icons/si";
import { apiMedia, apiServer } from './Endpoint';
import { isEditable } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom';
import { Show } from './Alerts';
import { AES, enc } from 'crypto-js';
import { LiaCarSideSolid, LiaServerSolid } from "react-icons/lia";
import { TbCategory2, TbTruckDelivery } from 'react-icons/tb';
import "../pages/Delivery/modal.css"
import { FormInputStudent } from './Profile';
import { MdShoppingCart } from "react-icons/md";
import { TfiLayoutSlider } from "react-icons/tfi";













export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const kanbanGrid = [
  { headerText: 'To Do',
    keyField: 'Open',
    allowToggle: true },

  { headerText: 'In Progress',
    keyField: 'InProgress',
    allowToggle: true },

  { headerText: 'Testing',
    keyField: 'Testing',
    allowToggle: true,
    isExpanded: false },

  { headerText: 'Done',
    keyField: 'Close',
    allowToggle: true },
];

export const EditorData = () => (
  <div>
    <h3>
      Try React
      React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started.

      Online Playgrounds
      If you’re interested in playing around with React, you can use an online code playground. Try a Hello World template on CodePen, CodeSandbox, or Stackblitz.

      If you prefer to use your own text editor, you can also download this HTML file, edit it, and open it from the local filesystem in your browser. It does a slow runtime code transformation, so we’d only recommend using this for simple demos.

      Add React to a Website
      You can add React to an HTML page in one minute. You can then either gradually expand its presence, or keep it contained to a few dynamic widgets.

      Create a New React App
      When starting a React project, a simple HTML page with script tags might still be the best option. It only takes a minute to set up!

      We recommend going through this JavaScript overview to check your knowledge level. It will take you between 30 minutes and an hour but you will feel more confident learning React.
    </h3>
  </div>
);

const customerGridImage = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
    <img
      className="rounded-full w-10 h-10"
      src={props.CustomerLogo}
      alt="employee"
    />
    <div style={{ width: "calc(100% - 60px)" }}>
      <p className="font-semibold">{props.CustomerName}</p>
      <p className="text-sm text-gray-600">{props.CustomerEmail}</p>
    </div>
  </div>
);

const employeeGridImage = (props) => (
  <div className="image flex gap-1 items-center" style={{ width: "100%" }}>
    <img
      className="rounded-full w-10 h-10"
      src={apiMedia+props.Picture}
      alt="employee"
    />
  </div>
);


const categoryGridImage = (props) => (
  <div style={{ width: "100%" }}>
    <img
      className="rounded-full w-15 h-12"
      src={apiMedia+props.CategoryPicture}
      alt="employee"
    />
  </div>
);

const productGridImage = (props) => (
  <div style={{ width: "100%" }}>
    <img
      className="rounded-full w-15 h-15"
      src={apiMedia+props.Picture}
      alt="employee"
    />
  </div>
);

const productDGridImage = (props) => (
  <div >
    <img
       style={{ width: "100px", height: "50px", }}
      src={apiMedia+props.DetailedPicture}
      alt="employee"
    />
  </div>
);

const ImageAndVideoGrid = (props) => (
  <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
    {props.CoverType === "Video" ? (
      <video
        style={{ width: "auto", height: "100px", }}
        controls
      >
        <source src={apiMedia + props.Src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        style={{ width: "100px", height: "50px", }}
        src={apiMedia + props.Src}
        alt="employee"
      />
    )}
  </div>
);




const portfolioGridImage = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
    <img
      className=" w-25 h-20"
      src={apiMedia+props.Picture}
      alt="employee"
    />
    <div style={{ width: "calc(100% - 60px)" }}>
      <p className="font-semibold">{props.ProjectName}</p>
    </div>
  </div>
);

const auditGridImage = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
    <img
      className="rounded-full w-10 h-10"
      src={apiMedia+props.userPic}
      alt="employee"
    />
    <div style={{ width: "calc(100% - 60px)" }}>
    <br/><p className="font-semibold">{props.userName}</p><br/>
      <p className="text-sm text-gray-600">Id: {props.userId}</p>
      <p className="text-sm text-gray-600">Device: {props.device}</p>
      <p className="text-sm text-gray-600">OS: {props.os}</p>

    </div>
  </div>
);

const custauditGridImage = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }}>

    <div style={{ width: "calc(100% - 60px)" }}>
    <br/><p className="font-semibold">{props.userName}</p><br/>
      <p className="text-sm text-gray-600">Id: {props.userId}</p>
      <p className="text-sm text-gray-600">Device: {props.device}</p>
      <p className="text-sm text-gray-600">OS: {props.os}</p>

    </div>
  </div>
);


const prdAssGridImage = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
    <img
      className="rounded-full w-10 h-10"
      src={apiMedia+props.productPic}
      alt="employee"
    />
    <div style={{ width: "calc(100% - 60px)" }}>
    <br/><p className="font-semibold">{props.productName}</p><br/>
      <p className="text-sm text-gray-600">Id: {props.productId}</p>
      <p className="text-sm text-gray-600">Device: {props.device}</p>
      <p className="text-sm text-gray-600">OS: {props.os}</p>

    </div>
  </div>
);




const priceGridImage = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
    <img
      className=" w-25 h-20"
      src={apiMedia+props.Picture}
      alt="employee"
    />
    <div style={{ width: "calc(100% - 60px)" }}>
      <p className="font-semibold">{props.ProductName}</p>
    </div>
  </div>
);

const handleUnBlockAdmin = async (userId) => {

  let userInfo = {}

  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);

  userInfo = parsedData; 


 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("UserId", userId) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"UnBlockAdmin", {
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
        window.location.reload();
        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }

const Status = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
  
    <div style={{ width: "calc(100% - 60px)" }}>
      {
        props.IsBlocked==true?<>
         <p onClick={() => {handleUnBlockAdmin(props.UserId)}} className="text-sm text-red-600">Blocked (Click to Unblock)</p>
        </>:<>
        <p className="text-sm text-green-600">Active</p>
        </>
      }
     
    </div>
  </div>
);


const handleBlockAdmin = async (userId) => {



  let userInfo = {}

  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);

  userInfo = parsedData; 


 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("UserId", userId) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"BlockAdmin", {
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
        window.location.reload();
        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }

  const handleBlockCustomer = async (userId) => {



    let userInfo = {}
  
    const encryptedData = sessionStorage.getItem("userDataEnc");
    const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
    const decryptedData = AES.decrypt(encryptedData, encryptionKey);
    const decryptedString = decryptedData.toString(enc.Utf8);
    const parsedData = JSON.parse(decryptedString);
  
    userInfo = parsedData; 
  
  
   
  
    Show.showLoading("Processing Data");
      try {
    
    const formData = new FormData()
    formData.append("UserId", userId) 
    formData.append("AdminId",userInfo.UserId)
  
    
        const response = await fetch(apiServer+"BlockCustomer", {
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
          window.location.reload();
          
        } else {
          Show.Attention(data.message);
        }
      } catch (error) {
    
        Show.Attention("An error has occured");
       
      }
    
    }

  const handleUnBlockCustomer = async (userId) => {



      let userInfo = {}
    
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
    
      userInfo = parsedData; 
    
    
     
    
      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
      formData.append("UserId", userId) 
      formData.append("AdminId",userInfo.UserId)
    
      
          const response = await fetch(apiServer+"UnBlockCustomer", {
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
            window.location.reload();
            
          } else {
            Show.Attention(data.message);
          }
        } catch (error) {
      
          Show.Attention("An error has occured");
         
        }
      
      }
 
const StatusUnBlock = (props) => (
        <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
        
          <div style={{ width: "calc(100% - 60px)" }}>
            {
              props.IsBlocked==true?<>
               <p onClick={() => {handleUnBlockCustomer(props.UserId)}} className="text-sm text-red-600">Blocked (Click to Unblock)</p>
              </>:<>
              <p className="text-sm text-green-600">Active</p>
              </>
            }
           
          </div>
        </div>
      );



const BlockUsers = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }} onClick={() => {handleBlockAdmin(props.UserId)}} >
   
    <div style={{ width: "calc(100% - 60px)" }} >
      <p className="text-sm text-red-600">Click to Block</p>
    </div>

  </div>
);

const BlockCustomer = (props) => (
  <div className="image flex gap-4 items-center" style={{ width: "100%" }} onClick={() => {handleBlockCustomer(props.UserId)}} >
   
    <div style={{ width: "calc(100% - 60px)" }} >
      <p className="text-sm text-red-600">Click to Block</p>
    </div>

  </div>
);


{/*All the Grids */}


export const otherGrid =  [
  { field: 'UserId', headerText: 'UserId', width: '150', textAlign: 'Center' },
  { headerText: 'Profile', width: '80', template: employeeGridImage, textAlign: 'Center' },
  { field: 'Username', headerText: 'Name', width: '150', textAlign: 'Center' },
  { field: 'Email', headerText: 'Email', width: '150', textAlign: 'Center' },
  { field: 'Phone', headerText: 'Phone', width: '120', textAlign: 'Center', isPrimaryKey: true },
  { headerText: 'Status', width: '130', template: Status, textAlign: 'Center' },
  { headerText: 'Control Access', width: '150', template: BlockUsers, textAlign: 'Center' },
];

export const customerGrid =  [
  { field: 'UserId', headerText: 'UserId', width: '150', textAlign: 'Center' },
  { field: 'Username', headerText: 'Name', width: '150', textAlign: 'Center' },
  { field: 'Email', headerText: 'Email', width: '150', textAlign: 'Center' },
  { field: 'Phone', headerText: 'Phone', width: '120', textAlign: 'Center', isPrimaryKey: true },
  { headerText: 'Status', width: '130', template: StatusUnBlock, textAlign: 'Center' },
  { headerText: 'Control Access', width: '150', template:BlockCustomer, textAlign: 'Center' },
];


const handleDeleteMenu = async (MenuId) => {



  let userInfo = {}

  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);

  userInfo = parsedData; 


 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("MenuId", MenuId) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeleteMenu", {
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
        window.location.reload();
        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }

const DeleteMenu = (props) => (
  <div onClick={() => {handleDeleteMenu(props.MenuId)}} >
   
    <div>
      <p style={{color: localStorage.getItem("colorMode"), fontSize:"1.3rem" }}><MdDeleteForever /></p>
    </div>

  </div>
);



const handleCategory = async (MenuId) => {



  let userInfo = {}

  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);

  userInfo = parsedData; 


 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("CategoryId", MenuId) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeleteCategory", {
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
        window.location.reload();
        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }

const DeleteCategory = (props) => (
  <div onClick={() => {handleCategory(props.CategoryId)}} >
   
    <div>
      <p style={{color: localStorage.getItem("colorMode"), fontSize:"1.3rem" }}><MdDeleteForever /></p>
    </div>

  </div>
);




const handleDeleteProduct = async (MenuId) => {



  let userInfo = {}

  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);

  userInfo = parsedData; 


 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("ProductId", MenuId) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeleteProduct", {
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
        window.location.reload();
        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }



const DeleteProduct = (props) => (
  <div onClick={() => {handleDeleteProduct(props.ProductId)}} >
   
    <div>
      <p style={{color: localStorage.getItem("colorMode"), fontSize:"1.3rem" }}><MdDeleteForever /></p>
    </div>

  </div>
);



const handleDeletePaymentMethods = async (MenuId) => {



  let userInfo = {}

  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);

  userInfo = parsedData; 


 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("Id", MenuId) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeletePaymentMethods", {
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
        window.location.reload();
        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }



const DeleteProductPayMethod = (props) => (
  <div onClick={() => {handleDeletePaymentMethods(props.id)}} >
   
    <div>
      <p style={{color: localStorage.getItem("colorMode"), fontSize:"1.3rem" }}><MdDeleteForever /></p>
    </div>

  </div>
);




const handleDeleteImageProduct = async (MenuId) => {



  let userInfo = {}

  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);

  userInfo = parsedData; 


 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("ProductId", MenuId) 
  formData.append("AdminId",userInfo.UserId)

  
      const response = await fetch(apiServer+"DeleteProductImage", {
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
        window.location.reload();
        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }

const DeleteImageProduct = (props) => (
  <div onClick={() => {handleDeleteImageProduct(props.id)}} >
   
    <div>
      <p style={{color: localStorage.getItem("colorMode"), fontSize:"1.3rem" }}><MdDeleteForever /></p>
    </div>

  </div>
);





export const menuGrid =  [
  { field: 'MenuId', headerText: 'Menu Id', width: '150', textAlign: 'Center' },
  { field: 'MenuName', headerText: 'Name', width: '150', textAlign: 'Center' },
   { headerText: 'Delete',width: '25', template:DeleteMenu, textAlign: 'Center' },
];

export const categoryGrid =  [
  { field: 'CategoryId', headerText: 'Category Id', width: '150', textAlign: 'Center' },
  { headerText: 'Picture', width: '50', template: categoryGridImage, textAlign: 'Center' },
  { field: 'Section', headerText: 'Section', width: '150', textAlign: 'Center' },
  { field: 'CategoryName', headerText: 'Name', width: '150', textAlign: 'Center' },
  
  { headerText: 'Delete',width: '50', template:DeleteCategory, textAlign: 'Center' },
];


const ProductImage = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/explore/${props.ProductId}`)} className="text-sm text-green-600">
           Manage Slides
       </p>
      </div>
    </div>
  );
};

const ManageSlides = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/explore/${props.ExploreID}`)} >
       <IoEyeSharp Size={"4rem"}/>
       </p>
      </div>
    </div>
  );
};

const ManageSpecs = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/explore/specs/${props.ExploreID}`)} >
      <IoEyeSharp Size={"4rem"}/>
       </p>
      </div>
    </div>
  );
};

const ManageServiceSpecs = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/services/specs/${props.ProductId}`)} className="text-sm text-green-600">
           Manage Specs
       </p>
      </div>
    </div>
  );
};

const ManageBlogSpecs = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/blogs/specs/${props.ProductId}`)} className="text-sm text-green-600">
           Manage Specs
       </p>
      </div>
    </div>
  );
};


const ManageRentACarSlides = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/rentACar/${props.ProductId}`)} className="text-sm text-green-600">
           Manage Slides
       </p>
      </div>
    </div>
  );
};

const ManageRentACarSpecs = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/rentACar/specs/${props.ProductId}`)} className="text-sm text-green-600">
           Manage Specs
       </p>
      </div>
    </div>
  );
};



export const productGrid =  [
  { field: 'ProductId', headerText: 'Product Id', width: '150', textAlign: 'Center' },
  { headerText: 'Picture', width: '100', template: productGridImage, textAlign: 'Center' },
  { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
  { field: 'Price', headerText: 'Price', width: '150', textAlign: 'Center' },
  { field: 'Quantity', headerText: 'Quantity', width: '150', textAlign: 'Center' },
  { field: 'Size', headerText: 'Size', width: '150', textAlign: 'Center' },
  { field: 'Description', headerText: 'Description', width: '150', textAlign: 'Center' },

  { headerText: 'Add',width: '150', template: ProductImage, textAlign: 'Center' },

  { headerText: 'Delete',width: '50', template:DeleteProduct, textAlign: 'Center' },
];


export const exploreGrid1 =  [
  { field: 'ExploreID', headerText: 'Explore Id', width: '150', textAlign: 'Center' },
  { headerText: 'Src', width: '100', template: ImageAndVideoGrid, textAlign: 'Center' },
  { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
  { field: 'SubTitle', headerText: 'SubTitle', width: '150', textAlign: 'Center' },
  { field: 'Price', headerText: 'Price', width: '150', textAlign: 'Center' },
  { field: 'YearModel', headerText: 'Year', width: '150', textAlign: 'Center' },
  { field: 'GearType', headerText: 'Gear', width: '150', textAlign: 'Center' },
  { field: 'FuelType', headerText: 'Fuel', width: '150', textAlign: 'Center' },
  { headerText: 'DetailedPicture', width: '100', template: productDGridImage, textAlign: 'Center' },


  { headerText: 'Add Slides',width: '150', template: ManageSlides, textAlign: 'Center' },
  { headerText: 'Add Specs',width: '150', template: ManageSpecs, textAlign: 'Center' },

  ];




  

  export const rentACarGrid =  [
    { field: 'ExploreId', headerText: 'Explore Id', width: '150', textAlign: 'Center' },
    { headerText: 'Src', width: '100', template: ImageAndVideoGrid, textAlign: 'Center' },
    { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
    { field: 'SubTitle', headerText: 'SubTitle', width: '150', textAlign: 'Center' },
    { field: 'Price', headerText: 'Price', width: '150', textAlign: 'Center' },
    { field: 'Year', headerText: 'Year', width: '150', textAlign: 'Center' },
    { field: 'Gear', headerText: 'Gear', width: '150', textAlign: 'Center' },
    { field: 'Fuel', headerText: 'Fuel', width: '150', textAlign: 'Center' },
    { headerText: 'MainPic', width: '150', template: ImageAndVideoGrid, textAlign: 'Center' },
  
    { headerText: 'Add Slides',width: '150', template: ManageRentACarSlides, textAlign: 'Center' },
    { headerText: 'Add Specs',width: '150', template: ManageRentACarSpecs, textAlign: 'Center' },
  
    ];
  


export const serviceGrid =  [
  { field: 'ServiceId', headerText: 'Explore Id', width: '150', textAlign: 'Center' },
  { headerText: 'Src', width: '100', template: ImageAndVideoGrid, textAlign: 'Center' },
  { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
  { field: 'SubTitle', headerText: 'SubTitle', width: '150', textAlign: 'Center' },
  { headerText: 'MainPic', width: '150', template: ImageAndVideoGrid, textAlign: 'Center' },
  { headerText: 'Add Details',width: '150', template: ManageServiceSpecs, textAlign: 'Center' },

  ];

  export const blogGrid =  [
    { field: 'BlogId', headerText: 'Explore Id', width: '150', textAlign: 'Center' },
    { headerText: 'Src', width: '100', template: ImageAndVideoGrid, textAlign: 'Center' },
    { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
    { field: 'SubTitle', headerText: 'SubTitle', width: '150', textAlign: 'Center' },
    { headerText: 'MainPic', width: '150', template: ImageAndVideoGrid, textAlign: 'Center' },
    { headerText: 'Add Details',width: '150', template: ManageBlogSpecs, textAlign: 'Center' },
  
    ];


export const paymentMethodGrid =  [
  { field: 'id', headerText: 'Method Id', width: '150', textAlign: 'Center' },
  { field: 'PaymentMethod', headerText: 'PaymentMethod', width: '150', textAlign: 'Center' },
  { headerText: 'Delete',width: '50', template:DeleteProductPayMethod, textAlign: 'Center' },
];


export const DeliveryConfigGrid =  [
  { field: 'id', headerText: 'Method Id', width: '150', textAlign: 'Center' },
  { field: 'Location', headerText: 'Location', width: '150', textAlign: 'Center' },
  { field: 'PricePerKm', headerText: 'PricePerKm', width: '150', textAlign: 'Center' },
 ];


export const productImageGrid =  [
   { headerText: 'Src', width: '120', template: ImageAndVideoGrid, textAlign: 'Center' },
  
  { headerText: 'Delete',width: '100', template:DeleteImageProduct, textAlign: 'Center' },
];


export const specsDetails =  [
  { field: 'Section', headerText: 'Section', width: '150', textAlign: 'Center' },
  { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
  { field: 'Description', headerText: 'Description', width: '150', textAlign: 'Center' },

 { headerText: 'Delete',width: '100', template:DeleteImageProduct, textAlign: 'Center' },
];


export const inventoryGrid =  [
  { field: 'ProductId', headerText: 'Product Id', width: '150', textAlign: 'Center' },
  { headerText: 'Picture', width: '100', template: productGridImage, textAlign: 'Center' },
  { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
  { field: 'Price', headerText: 'Price', width: '150', textAlign: 'Center' },
  { field: 'Quantity', headerText: 'Quantity', width: '150', textAlign: 'Center' },
  { field: 'Size', headerText: 'Size', width: '150', textAlign: 'Center' },
  { field: 'Description', headerText: 'Description', width: '150', textAlign: 'Center' },
];

export const discountGrid =  [
  { field: 'ProductId', headerText: 'Product Id', width: '150', textAlign: 'Center' },
  { headerText: 'Picture', width: '100', template: productGridImage, textAlign: 'Center' },
  { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
  { field: 'Price', headerText: 'Price', width: '150', textAlign: 'Center' },
  { field: 'Quantity', headerText: 'Quantity', width: '150', textAlign: 'Center' },
  { field: 'Size', headerText: 'Size', width: '150', textAlign: 'Center' },
  { field: 'Description', headerText: 'Description', width: '150', textAlign: 'Center' },
];



export const paymentsGrid =  [
  { field: 'ProductId', headerText: 'Product Id', width: '150', textAlign: 'Center' },
  { headerText: 'Picture', width: '100', template: productGridImage, textAlign: 'Center' },
  { field: 'Title', headerText: 'Title', width: '150', textAlign: 'Center' },
  { field: 'Price', headerText: 'Price', width: '150', textAlign: 'Center' },
  { field: 'Quantity', headerText: 'Quantity', width: '150', textAlign: 'Center' },
  { field: 'Size', headerText: 'Size', width: '150', textAlign: 'Center' },
  { field: 'Description', headerText: 'Description', width: '150', textAlign: 'Center' },
];


export const employeeGrid =  [
  { field: 'UserId', headerText: 'UserId', width: '150', textAlign: 'Center' },
  { headerText: 'Name', width: '250', template: employeeGridImage, textAlign: 'Center' },
  { field: 'Continent', headerText: 'Continent', width: '150', textAlign: 'Center' },
  { field: 'Country', headerText: 'Country', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
  { field: 'Phone', headerText: 'Phone', width: '120', textAlign: 'Center', isPrimaryKey: true },
  { field: 'Location', headerText: 'Location', width: '150', textAlign: 'Center' },
];

export const PortfolioGrid =  [
  { field: 'ProjectId', headerText: 'Project Id', width: '150', textAlign: 'Center' },
  { headerText: 'Project Name', width: '250', template: portfolioGridImage, textAlign: 'Center' },
  { field: 'Link', headerText: 'Link', width: '150', textAlign: 'Center' },
 ];

 export const PriceConfigGrid =  [
  { field: 'ProductId', headerText: 'Product Id', width: '150', textAlign: 'Center' },
  { headerText: 'Product Name', width: '250', template: priceGridImage, textAlign: 'Center' },
  { field: 'Amount', headerText: 'Amount', width: '150', textAlign: 'Center' },
  { field: 'PricingType', headerText: 'PricingType', width: '150', textAlign: 'Center' },
 ];




export const areaPrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  majorGridLines: { width: 0 },
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  labelStyle: { color: 'gray' },
};

export const areaPrimaryYAxis = {
  labelFormat: '{value}%',
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: 'gray' },

};
export const barPrimaryXAxis = {
  valueType: 'Category',
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: 'transparent' },
};
const areaChartData = [
  [
    { x: new Date(2002, 0, 1), y: 2.2 },
    { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 },
    { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 },
    { x: new Date(2011, 0, 1), y: 3.1 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 2 },
    { x: new Date(2003, 0, 1), y: 1.7 },
    { x: new Date(2004, 0, 1), y: 1.8 },
    { x: new Date(2005, 0, 1), y: 2.1 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 1.5 },
    { x: new Date(2009, 0, 1), y: 2.8 },
    { x: new Date(2010, 0, 1), y: 1.5 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
  [
    { x: new Date(2002, 0, 1), y: 0.8 },
    { x: new Date(2003, 0, 1), y: 1.3 },
    { x: new Date(2004, 0, 1), y: 1.1 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2 },
    { x: new Date(2007, 0, 1), y: 1.7 },
    { x: new Date(2008, 0, 1), y: 2.3 },
    { x: new Date(2009, 0, 1), y: 2.7 },
    { x: new Date(2010, 0, 1), y: 1.1 },
    { x: new Date(2011, 0, 1), y: 2.3 },
  ],
];

export const areaCustomSeries = [
  {
    dataSource: areaChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'USA',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',

  },
  {
    dataSource: areaChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'France',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',
  },
  {
    dataSource: areaChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Germany',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',
  },
];

export const barChartData = [
  [
    { x: 'USA', y: 46 },
    { x: 'GBR', y: 27 },
    { x: 'CHN', y: 26 },
  ],
  [
    { x: 'USA', y: 37 },
    { x: 'GBR', y: 23 },
    { x: 'CHN', y: 18 },
  ],
  [
    { x: 'USA', y: 38 },
    { x: 'GBR', y: 17 },
    { x: 'CHN', y: 26 },
  ],
];

export const barCustomSeries = [
  {
    dataSource: barChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Gold',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Silver',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: barChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'Bronze',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
];
export const colorMappingData = [
  [
    { x: 'Jan', y: 6.96 },
    { x: 'Feb', y: 8.9 },
    { x: 'Mar', y: 12 },
    { x: 'Apr', y: 17.5 },
    { x: 'May', y: 22.1 },
    { x: 'June', y: 25 },
    { x: 'July', y: 29.4 },
    { x: 'Aug', y: 29.6 },
    { x: 'Sep', y: 25.8 },
    { x: 'Oct', y: 21.1 },
    { x: 'Nov', y: 15.5 },
    { x: 'Dec', y: 9.9 },
  ],
  ['#FFFF99'],
  ['#FFA500'],
  ['#FF4040'],
];

export const rangeColorMapping = [
  { label: '1°C to 10°C',
    start: '1',
    end: '10',
    colors: colorMappingData[1] },

  { label: '11°C to 20°C',
    start: '11',
    end: '20',
    colors: colorMappingData[2] },

  { label: '21°C to 30°C',
    start: '21',
    end: '30',
    colors: colorMappingData[3] },

];

export const ColorMappingPrimaryXAxis = {
  valueType: 'Category',
  majorGridLines: { width: 0 },
  title: 'Months',
};

export const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}°C',
  title: 'Temperature',
};

export const FinancialPrimaryXAxis = {
  valueType: 'DateTime',
  minimum: new Date('2016, 12, 31'),
  maximum: new Date('2017, 9, 30'),
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 },
};

export const FinancialPrimaryYAxis = {
  title: 'Price',
  minimum: 100,
  maximum: 180,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
};

export const LinePrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  majorGridLines: { width: 0 },
  background: 'white',
};

export const LinePrimaryYAxis = {
  labelFormat: '{value}%',
  rangePadding: 'None',
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};





export const links = [
  //Dashboard
  {
    title: 'Dashboard',
    icon: <MdOutlineDashboard />,
    links: [
      {
        name: 'DashBoard',
        icon: <FiShoppingBag />,
        roles:[
          {role: "Can_Access_Dashboard"},
          {role: "SuperAdmin"}
        
        ]
      },
    ],
    permissions:[
     {role: "Can_Access_Dashboard"},
     {role: "SuperAdmin"}

    ],
  },


//Website Configuration

{
  title: 'Website Configuration',
  links: [

    {
      name: 'websiteSetup',
      icon: <FcGlobe/>,
      roles:[
        {role:"Can_Create_Admin"}, 
        {role: "Can_Update_Admin"}, 
        {role:"Can_View_Single_Admin"},
        {role:"Can_Block_Admin"}, 
        {role: "Can_UnBlock_Admin"}, 
        {role:"Can_Suspend_Admin"},
        {role:"Can_UnSuspend_Admin"}, 
        {role: "Can_View_All_Admin"}, 
        {role:"Can_Delete_Admin"},
        {role: "SuperAdmin"}, 
      
      ]
    },

   

    {
      name: 'sliders',
      icon: <TfiLayoutSlider />,
      roles:[
        {role:"Can_Block_Customer"}, 
        {role: "Can_UnBlock_Customer"}, 
        {role:"Can_Suspend_Customer"},
        {role:"Can_UnSuspend_Customer"}, 
        {role: "Can_View_All_Customer"}, 
        {role:"Can_Delete_Customer"},
        {role: "SuperAdmin"}, 
      
      ]
    },



    {
      name: 'explore',
      icon: <IoCarSportOutline />,
      roles:[
        {role:"Can_Create_Admin"}, 
        {role: "Can_Update_Admin"}, 
        {role:"Can_View_Single_Admin"},
        {role:"Can_Block_Admin"}, 
        {role: "Can_UnBlock_Admin"}, 
        {role:"Can_Suspend_Admin"},
        {role:"Can_UnSuspend_Admin"}, 
        {role: "Can_View_All_Admin"}, 
        {role:"Can_Delete_Admin"},
        {role: "SuperAdmin"}, 
      
      ]
    },
   
    {
      name: 'services',
      icon: <GiSpanner />,
      roles:[
        {role:"Can_Create_Role"}, 
        {role: "Can_View_Role"}, 
        {role: "SuperAdmin"}, 
      
      ]
    },

    {
      name: 'rentACar',
      icon: <LiaCarSideSolid />,
      roles:[
        {role: "Can_View_Role"}, 
        {role:"Can_Delete_Role"},
        {role: "SuperAdmin"}, 
      
      ]
    },

    {
      name: 'blogs',
      icon: <SiBloglovin />,
      roles:[
        {role: "Can_View_Role"}, 
        {role: "SuperAdmin"}, 
      
      ]
    },

    {
      name: 'mainChat',
      icon: <IoChatbubbleEllipsesOutline />,
      roles:[
        {role: "Can_View_Role"}, 
        {role: "SuperAdmin"}, 
      
      ]
    },

    {
      name: 'shopSetup',
      icon: <MdShoppingCart />,
      roles:[
        {role: "Can_Configure_Website"}, 
        {role: "SuperAdmin"}, 
      
      ]
    },

    


  ],

  permissions:[
    {role: "SuperAdmin"},
    {role:"Can_Block_Customer"}, 
    {role: "Can_UnBlock_Customer"}, 
    {role:"Can_Suspend_Customer"},
    {role:"Can_UnSuspend_Customer"}, 
    {role: "Can_View_All_Customer"}, 
    {role:"Can_Delete_Customer"},
    {role:"Can_Create_Admin"}, 
    {role: "Can_Update_Admin"}, 
    {role:"Can_View_Single_Admin"},
    {role:"Can_Block_Admin"}, 
    {role: "Can_UnBlock_Admin"}, 
    {role:"Can_Suspend_Admin"},
    {role:"Can_UnSuspend_Admin"}, 
    {role: "Can_View_All_Admin"}, 
    {role:"Can_Delete_Admin"},
    {role:"Can_Create_Role"}, 
    {role: "Can_View_Role"}, 
    {role:"Can_Delete_Role"}, 
    {role: "Can_Configure_Website"}, 
    {role:"Can_Create_Admin"}, 
    {role: "Can_Update_Admin"}, 
    {role:"Can_View_Single_Admin"},
    {role:"Can_Block_Admin"}, 
    {role: "Can_UnBlock_Admin"}, 
    {role:"Can_Suspend_Admin"},
    {role:"Can_UnSuspend_Admin"}, 
    {role: "Can_View_All_Admin"}, 
    {role:"Can_Delete_Admin"},
    {role: "Can_View_Audit_Trail"},  
    {role:"Can_View_Customer_Trail"}, 
    {role:"Can_View_Product_Assessment"}, 
    {role:"Can_View_Rate_Limit_Catcher"}, 

   ],




},



  //Vehicle
  {
    title: 'Vehicle Mgmt',
    links: [
     
      {
        name: 'menu',
        icon: <MdMenuOpen />,
        roles:[
          {role:"Can_Create_Menu"}, 
          {role:  "Can_Delete_Menu"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'category',
        icon: <TbCategory2 />,
        roles:[
          {role:"Can_Create_Category"}, 
          {role: "Can_Update_Category"}, 
          {role:"Can_View_A_Single_Category"},
          {role:"Can_Delete_Category"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'product',
        icon: <GiConverseShoe />,
        roles:[
          {role:"Can_Create_Product"}, 
          {role:  "Can_Update_Product"}, 
          {role:   "Can_Delete_Product"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'inventory',
        icon: <MdOutlineInventory />,
        roles:[
          {role:"Can_Update_Product"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'discount',
        icon: <MdOutlineDiscount />,
        roles:[
          {role:"Can_Run_Promotion"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'payments',
        icon: <GiMoneyStack />,
        roles:[
          {role:"Can_View_Payment"},  
          {role: "SuperAdmin"}, 
        
        ]
      },
      {
        name: 'creditSales',
        icon: <GiReceiveMoney />,
        roles:[
          {role: "Can_Handle_Credit_Sales"},  
          {role: "SuperAdmin"}, 
        
        ]
      },
      {
        name: 'collectionAccount',
        icon: <MdOutlineAccountBalance />,
        roles:[
          {role: "Can_Handle_Credit_Sales"},  
          {role: "SuperAdmin"}, 
        
        ]
      },
      {
        name: 'paymentOnDelivery',
        icon: <GiTakeMyMoney />,
        roles:[
          {role: "Can_Handle_PaymentOnDelivery"},  
          {role: "SuperAdmin"}, 
        
        ]
      },
  
      {
        name: 'bagging',
        icon: <FaBasketShopping />,
        roles:[
          {role:"Can_Access_Bagging"}, 
          {role:"Can_View_Bagging"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },
  
      {
        name: 'checking',
        icon: <FaClipboardCheck />,
        roles:[
          {role:"Can_Check_Checking"}, 
          {role:"Can_View_Checking"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'assignDelivery',
        icon: <GrDeliver />,
        roles:[
          {role:"Can_Assign_Delivery"},  
          {role:"Can_Do_Delivery"}, 
          {role:"Can_Track_Delivery"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },
  
      {
        name: 'customerDelivery',
        icon: <TbTruckDelivery />,
        roles:[
  
          {role:"Can_Do_Delivery_To_Customers"}, 
          {role:"Can_Do_Delivery"}, 
          {role:"Can_Track_Delivery"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },
  
      {
        name: 'deliveryList',
        icon: <MdElectricBike />,
        roles:[
          {role:"Can_Track_Delivery"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },
     







    ],

    permissions:[
      {role: "SuperAdmin"},
      {role:"Can_Create_Menu"}, 
      {role:  "Can_Delete_Menu"},
      {role:"Can_Create_Category"}, 
      {role: "Can_Update_Category"}, 
      {role:"Can_View_A_Single_Category"},
      {role:"Can_Delete_Category"}, 
      {role:"Can_Create_Product"}, 
      {role:  "Can_Update_Product"}, 
      {role:   "Can_Delete_Product"}, 
      {role:"Can_Run_Promotion"}, 
      {role:"Can_View_Payment"},  
    {role:"Can_Access_Bagging"}, 
    {role:"Can_View_Bagging"}, 
    {role:"Can_Check_Checking"}, 
    {role:"Can_View_Checking"}, 
    {role: "Can_Handle_Credit_Sales"},  
    {role:"Can_Assign_Delivery"},  
    {role:"Can_Do_Delivery"}, 
    {role:"Can_Track_Delivery"}, 
    {role:"Can_Do_Delivery_To_Customers"}, 


 
     ],




  },






  //Commerce
  {
    title: 'E-commerce Mgmt',
    links: [
     
      {
        name: 'menu',
        icon: <MdMenuOpen />,
        roles:[
          {role:"Can_Create_Menu"}, 
          {role:  "Can_Delete_Menu"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'category',
        icon: <TbCategory2 />,
        roles:[
          {role:"Can_Create_Category"}, 
          {role: "Can_Update_Category"}, 
          {role:"Can_View_A_Single_Category"},
          {role:"Can_Delete_Category"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'product',
        icon: <GiConverseShoe />,
        roles:[
          {role:"Can_Create_Product"}, 
          {role:  "Can_Update_Product"}, 
          {role:   "Can_Delete_Product"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'inventory',
        icon: <MdOutlineInventory />,
        roles:[
          {role:"Can_Update_Product"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'discount',
        icon: <MdOutlineDiscount />,
        roles:[
          {role:"Can_Run_Promotion"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'payments',
        icon: <GiMoneyStack />,
        roles:[
          {role:"Can_View_Payment"},  
          {role: "SuperAdmin"}, 
        
        ]
      },
      {
        name: 'creditSales',
        icon: <GiReceiveMoney />,
        roles:[
          {role: "Can_Handle_Credit_Sales"},  
          {role: "SuperAdmin"}, 
        
        ]
      },
      {
        name: 'collectionAccount',
        icon: <MdOutlineAccountBalance />,
        roles:[
          {role: "Can_Handle_Credit_Sales"},  
          {role: "SuperAdmin"}, 
        
        ]
      },
      {
        name: 'paymentOnDelivery',
        icon: <GiTakeMyMoney />,
        roles:[
          {role: "Can_Handle_PaymentOnDelivery"},  
          {role: "SuperAdmin"}, 
        
        ]
      },
  
      {
        name: 'bagging',
        icon: <FaBasketShopping />,
        roles:[
          {role:"Can_Access_Bagging"}, 
          {role:"Can_View_Bagging"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },
  
      {
        name: 'checking',
        icon: <FaClipboardCheck />,
        roles:[
          {role:"Can_Check_Checking"}, 
          {role:"Can_View_Checking"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },

      {
        name: 'assignDelivery',
        icon: <GrDeliver />,
        roles:[
          {role:"Can_Assign_Delivery"},  
          {role:"Can_Do_Delivery"}, 
          {role:"Can_Track_Delivery"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },
  
      {
        name: 'customerDelivery',
        icon: <TbTruckDelivery />,
        roles:[
  
          {role:"Can_Do_Delivery_To_Customers"}, 
          {role:"Can_Do_Delivery"}, 
          {role:"Can_Track_Delivery"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },
  
      {
        name: 'deliveryList',
        icon: <MdElectricBike />,
        roles:[
          {role:"Can_Track_Delivery"}, 
          {role: "SuperAdmin"}, 
        
        ]
      },
     







    ],

    permissions:[
      {role: "SuperAdmin"},
      {role:"Can_Create_Menu"}, 
      {role:  "Can_Delete_Menu"},
      {role:"Can_Create_Category"}, 
      {role: "Can_Update_Category"}, 
      {role:"Can_View_A_Single_Category"},
      {role:"Can_Delete_Category"}, 
      {role:"Can_Create_Product"}, 
      {role:  "Can_Update_Product"}, 
      {role:   "Can_Delete_Product"}, 
      {role:"Can_Run_Promotion"}, 
      {role:"Can_View_Payment"},  
    {role:"Can_Access_Bagging"}, 
    {role:"Can_View_Bagging"}, 
    {role:"Can_Check_Checking"}, 
    {role:"Can_View_Checking"}, 
    {role: "Can_Handle_Credit_Sales"},  
    {role:"Can_Assign_Delivery"},  
    {role:"Can_Do_Delivery"}, 
    {role:"Can_Track_Delivery"}, 
    {role:"Can_Do_Delivery_To_Customers"}, 


 
     ],




  },








    //System Operations
    {
      title: 'System Administration',
      links: [

        {
          name: 'admin',
          icon: <RiAdminLine />,
          roles:[
            {role:"Can_Create_Admin"}, 
            {role: "Can_Update_Admin"}, 
            {role:"Can_View_Single_Admin"},
            {role:"Can_Block_Admin"}, 
            {role: "Can_UnBlock_Admin"}, 
            {role:"Can_Suspend_Admin"},
            {role:"Can_UnSuspend_Admin"}, 
            {role: "Can_View_All_Admin"}, 
            {role:"Can_Delete_Admin"},
            {role: "SuperAdmin"}, 
          
          ]
        },
  
       
  
        {
          name: 'customers',
          icon: <RiContactsLine />,
          roles:[
            {role:"Can_Block_Customer"}, 
            {role: "Can_UnBlock_Customer"}, 
            {role:"Can_Suspend_Customer"},
            {role:"Can_UnSuspend_Customer"}, 
            {role: "Can_View_All_Customer"}, 
            {role:"Can_Delete_Customer"},
            {role: "SuperAdmin"}, 
          
          ]
        },


  
        {
          name: 'subscribe',
          icon: <FaAmazonPay />,
          roles:[
            {role:"Can_Create_Admin"}, 
            {role: "Can_Update_Admin"}, 
            {role:"Can_View_Single_Admin"},
            {role:"Can_Block_Admin"}, 
            {role: "Can_UnBlock_Admin"}, 
            {role:"Can_Suspend_Admin"},
            {role:"Can_UnSuspend_Admin"}, 
            {role: "Can_View_All_Admin"}, 
            {role:"Can_Delete_Admin"},
            {role: "SuperAdmin"}, 
          
          ]
        },
       
        {
          name: 'roles',
          icon: <FaKey />,
          roles:[
            {role:"Can_Create_Role"}, 
            {role: "Can_View_Role"}, 
            {role: "SuperAdmin"}, 
          
          ]
        },
  
        {
          name: 'revokeRoles',
          icon: <MdOutlineKeyOff />,
          roles:[
            {role: "Can_View_Role"}, 
            {role:"Can_Delete_Role"},
            {role: "SuperAdmin"}, 
          
          ]
        },
  
        {
          name: 'viewRoles',
          icon: <GiWarlockEye />,
          roles:[
            {role: "Can_View_Role"}, 
            {role: "SuperAdmin"}, 
          
          ]
        },
  
        {
          name: 'website',
          icon: <FcGlobe />,
          roles:[
            {role: "Can_Configure_Website"}, 
            {role: "SuperAdmin"}, 
          
          ]
        },
  
        {
          name: 'configurations',
          icon: <GrConfigure />,
          roles:[
            {role: "Can_Configure_System"}, 
            {role: "SuperAdmin"}, 
          
          ]
        },

        {
          name: 'auditTrail',
          icon: <GrShieldSecurity />,
          roles:[
            {role: "Can_View_Audit_Trail"},  
            {role: "SuperAdmin"}, 
          
          ]
        },
    
        {
          name: 'customerTrail',
          icon: <SiSecurityscorecard />,
          roles:[
            {role:"Can_View_Customer_Trail"}, 
            {role: "SuperAdmin"}, 
          
          ]
        },
    
        {
          name: 'productAssessment',
          icon: <MdOutlineSecurity />,
          roles:[
            {role:"Can_View_Product_Assessment"}, 
            {role: "SuperAdmin"}, 
          
          ]
        },
    
        {
          name: 'rateLimit',
          icon: <MdOutlineLocalPolice />,
          roles:[
            {role:"Can_View_Rate_Limit_Catcher"}, 
            {role: "SuperAdmin"}, 
          
          ]
        },

  
      ],
  
      permissions:[
        {role: "SuperAdmin"},
        {role:"Can_Block_Customer"}, 
        {role: "Can_UnBlock_Customer"}, 
        {role:"Can_Suspend_Customer"},
        {role:"Can_UnSuspend_Customer"}, 
        {role: "Can_View_All_Customer"}, 
        {role:"Can_Delete_Customer"},
        {role:"Can_Create_Admin"}, 
        {role: "Can_Update_Admin"}, 
        {role:"Can_View_Single_Admin"},
        {role:"Can_Block_Admin"}, 
        {role: "Can_UnBlock_Admin"}, 
        {role:"Can_Suspend_Admin"},
        {role:"Can_UnSuspend_Admin"}, 
        {role: "Can_View_All_Admin"}, 
        {role:"Can_Delete_Admin"},
        {role:"Can_Create_Role"}, 
        {role: "Can_View_Role"}, 
        {role:"Can_Delete_Role"}, 
        {role: "Can_Configure_Website"}, 
        {role:"Can_Create_Admin"}, 
        {role: "Can_Update_Admin"}, 
        {role:"Can_View_Single_Admin"},
        {role:"Can_Block_Admin"}, 
        {role: "Can_UnBlock_Admin"}, 
        {role:"Can_Suspend_Admin"},
        {role:"Can_UnSuspend_Admin"}, 
        {role: "Can_View_All_Admin"}, 
        {role:"Can_Delete_Admin"},
        {role: "Can_View_Audit_Trail"},  
        {role:"Can_View_Customer_Trail"}, 
        {role:"Can_View_Product_Assessment"}, 
        {role:"Can_View_Rate_Limit_Catcher"}, 
   
       ],
  
  
  
  
    },
  

];





export const cartData = [
  {
    image:
      product5,
    name: 'butterscotch ice-cream',
    category: 'Milk product',
    price: '₵250',
  },
  {
    image:
      product6,
    name: 'Supreme fresh tomato',
    category: 'Vegetable Item',
    price: '₵450',
  },
  {
    image:
      product7,
    name: 'Red color candy',
    category: 'Food Item',
    price: '₵190',
  },
];

export const chatData = [
  { 
    id: 1,
    message: 'Roman Joined the Team!',
    desc: 'Congratulate him',
    time: '9:08 AM',
    name: "Roman",
    email: "solomondanso2023@gmail.com"
  },
  { 
    id: 2,
    message: 'New message received',
    desc: 'Salma sent you a new message',
    time: '11:56 AM',
    name: "Salma",
    email: "salma2023@gmail.com"
  },
  { 
    id: 3,
    message: 'New Payment received',
    desc: 'Check your earnings',
    time: '4:39 AM',
    name: "Finance Department",
    email: "finance@company.com"
  },
  { 
    id: 4,
    message: 'Jolly completed tasks',
    desc: 'Assign her new tasks',
    time: '1:12 AM',
    name: "Jolly",
    email: "jolly@company.com"
  },
  { 
    id: 5,
    message: 'Meeting Reminder',
    desc: 'Team meeting at 3 PM',
    time: '2:45 PM',
    name: "HR",
    email: "hr@company.com"
  },
  { 
    id: 6,
    message: 'Project Deadline',
    desc: 'Project XYZ deadline is tomorrow',
    time: '5:30 PM',
    name: "Project Manager",
    email: "pm@company.com"
  },
  { 
    id: 7,
    message: 'Server Maintenance',
    desc: 'Scheduled maintenance at midnight',
    time: '11:00 PM',
    name: "IT Support",
    email: "itsupport@company.com"
  },
  { 
    id: 8,
    message: 'Birthday Celebration',
    desc: 'Celebrate John\'s birthday in the cafeteria',
    time: '12:00 PM',
    name: "Admin",
    email: "admin@company.com"
  },
  { 
    id: 9,
    message: 'Client Feedback',
    desc: 'Read the latest feedback from client',
    time: '10:15 AM',
    name: "Client Relations",
    email: "clientrelations@company.com"
  },
  { 
    id: 10,
    message: 'System Update',
    desc: 'A new system update is available',
    time: '6:30 AM',
    name: "System Admin",
    email: "sysadmin@company.com"
  }
];

export const notiData = [
  { 
    id: 1,
    message: 'Roman Joined the Team!',
    desc: 'Congratulate him',
    time: '9:08 AM',
    name: "Roman",
    email: "solomondanso2023@gmail.com"
  },
  { 
    id: 2,
    message: 'New message received',
    desc: 'Salma sent you a new message',
    time: '11:56 AM',
    name: "Salma",
    email: "salma2023@gmail.com"
  },
  { 
    id: 3,
    message: 'New Payment received',
    desc: 'Check your earnings',
    time: '4:39 AM',
    name: "Finance Department",
    email: "finance@company.com"
  },
  { 
    id: 4,
    message: 'Jolly completed tasks',
    desc: 'Assign her new tasks',
    time: '1:12 AM',
    name: "Jolly",
    email: "jolly@company.com"
  },
  { 
    id: 5,
    message: 'Meeting Reminder',
    desc: 'Team meeting at 3 PM',
    time: '2:45 PM',
    name: "HR",
    email: "hr@company.com"
  },
  { 
    id: 6,
    message: 'Project Deadline',
    desc: 'Project XYZ deadline is tomorrow',
    time: '5:30 PM',
    name: "Project Manager",
    email: "pm@company.com"
  },
  { 
    id: 7,
    message: 'Server Maintenance',
    desc: 'Scheduled maintenance at midnight',
    time: '11:00 PM',
    name: "IT Support",
    email: "itsupport@company.com"
  },
  { 
    id: 8,
    message: 'Birthday Celebration',
    desc: 'Celebrate John\'s birthday in the cafeteria',
    time: '12:00 PM',
    name: "Admin",
    email: "admin@company.com"
  },
  { 
    id: 9,
    message: 'Client Feedback',
    desc: 'Read the latest feedback from client',
    time: '10:15 AM',
    name: "Client Relations",
    email: "clientrelations@company.com"
  },
  { 
    id: 10,
    message: 'System Update',
    desc: 'A new system update is available',
    time: '6:30 AM',
    name: "System Admin",
    email: "sysadmin@company.com"
  }
];


export const earningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: '39,354',
    percentage: '-4%',
    title: 'Customers',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <BsBoxSeam />,
    amount: '4,396',
    percentage: '+23%',
    title: 'Products',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FiBarChart />,
    amount: '423,39',
    percentage: '+38%',
    title: 'Sales',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',

    pcColor: 'green-600',
  },
  {
    icon: <HiOutlineRefresh />,
    amount: '39,354',
    percentage: '-12%',
    title: 'Expenses',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
];


export const websiteData = [
  {
    icon: <FaPeoplePulling />,
    amount: '230',
    percentage: '-4%',
    title: 'Today Visitors',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <FcGlobe />,
    amount: '10',
    percentage: '+23%',
    title: 'Active Countries',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <MdMarkEmailRead />,
    amount: '5',
    percentage: '+38%',
    title: 'Today Subscriptions',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <IoChatbubbleEllipsesOutline />,
    amount: '180',
    percentage: '-12%',
    title: 'Today Messages',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
];



export const recentTransactions = [
  {
    icon: <BsCurrencyDollar />,
    amount: '+₵350',
    title: 'Paypal Transfer',
    desc: 'Money Added',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'green-600',
  },
  {
    icon: <BsShield />,
    amount: '-₵560',
    desc: 'Bill Payment',
    title: 'Wallet',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
  {
    icon: <FiCreditCard />,
    amount: '+₵350',
    title: 'Credit Card',
    desc: 'Money reversed',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',

    pcColor: 'green-600',
  },
  {
    icon: <TiTick />,
    amount: '+₵350',
    title: 'Bank Transfer',
    desc: 'Money Added',

    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <BsCurrencyDollar />,
    amount: '-₵50',
    percentage: '+38%',
    title: 'Refund',
    desc: 'Payment Sent',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
];

export const weeklyStats = [
  {
    icon: <FiShoppingCart />,
    amount: '₵560',
    title: 'Top Seller',
    desc: 'Highest Revenue Product',
    iconBg: '#FB9678',
    pcColor: 'green-600',
  },
  {
    icon: <GiSunkenEye />,
    amount: '₵560',
    title: 'Top Viewed',
    desc: 'Most Viewed Product',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <BsChatLeft />,
    amount: '+₵560',
    title: 'Top Engaged',
    desc: 'Most Engaging Product',
    iconBg: '#00C292',
    pcColor: 'green-600',
  },
];

export const PortfolioStats = [
  {
    img: product1,
    amount: '₵560',
    title: 'Agency Website',
    pcColor: 'green-600',
  },
  {
    img: product2,
    amount: '₵560',
    title: 'Ecommerce Website',
    pcColor: 'green-600',
  },
  {
    img: product3,
    amount: '+₵560',
    title: 'HDSS',
    pcColor: 'green-600',
  },
];


export const productsPerformance = [
  {
    image:
      product5,
    title: 'Is it good butterscotch ice-cream?',
    desc: 'Ice-Cream, Milk, Powder',
    rating: 'Good',
    itemSold: '65%',
    earningAmount: '₵546,000',
  },
  {
    image:
      product6,
    title: 'Supreme fresh tomato available',
    desc: 'Market, Mall',
    rating: 'Excellent',
    itemSold: '98%',
    earningAmount: '₵780,000',
  },
  {
    image:
      product7,
    title: 'Red color candy from Gucci',
    desc: 'Chocolate, Yummy',
    rating: 'Average',
    itemSold: '46%',
    earningAmount: '₵457,000',
  },
  {
    image:
      product4,
    title: 'Stylish night lamp for night',
    desc: 'Electric, Wire, Current',
    rating: 'Poor',
    itemSold: '23%',
    earningAmount: '₵123,000',
  },
];

export const medicalproBranding = {
  data: [
    {
      title: 'Due Date',
      desc: 'June 25, 2024',
    },
    {
      title: 'Time',
      desc: '2:00 pm',
    },
    {
      title: 'Participants',
      desc: '50+',
    },
  ],
  teams: [
    {
      name: 'Operation Team',
      color: '#f06040',
    },
    {
      name: 'Sales Team',
      color: '#FB9678',
    },
  ],
  leaders: [
    {
      image:
        avatar2,
    },
    {
      image:
        avatar3,
    },
    {
      image:
        avatar2,
    },
    {
      image:
        avatar4,
    },
    {
      image:
        avatar,
    },
  ],
};




export const themeColors = [
  { name: 'blue-theme', color: '#1A97F5' },
  { name: 'green-theme', color: '#03C9D7' },
  { name: 'purple-theme', color: '#7352FF' },
  { name: 'red-theme', color: '#FF5C8E' },
  { name: 'indigo-theme', color: '#1E4DB7' },
  { name: 'orange-theme', color: '#FB9678' },
  { name: 'aqua-theme', color: '#00FFFF' },
  { name: 'yellow-theme', color: '#FFEB3B' },
  { name: 'pink-theme', color: '#E91E63' },
  { name: 'teal-theme', color: '#009688' },
  { name: 'brown-theme', color: '#795548' },
  { name: 'cyan-theme', color: '#00BCD4' },
  { name: 'lime-theme', color: '#CDDC39' },
  { name: 'amber-theme', color: '#FFC107' },
  { name: 'deep-orange-theme', color: '#FF5722' },
  { name: 'deep-purple-theme', color: '#673AB7' },
  { name: 'light-blue-theme', color: '#03A9F4' },
  { name: 'light-green-theme', color: '#8BC34A' },
  { name: 'silver-theme', color: '#C0C0C0' },
  { name: 'gold-theme', color: '#FFD700' },
  { name: 'coral-theme', color: '#FF7F50' },
  { name: 'salmon-theme', color: '#FA8072' },
  { name: 'khaki-theme', color: '#F0E68C' },
  { name: 'orchid-theme', color: '#DA70D6' },
  { name: 'tomato-theme', color: '#FF6347' },
  { name: 'plum-theme', color: '#DDA0DD' },
  { name: 'navy-theme', color: '#000080' },
  { name: 'turquoise-theme', color: '#40E0D0' },
  { name: 'peach-theme', color: '#FFDAB9' },
  { name: 'mint-theme', color: '#98FF98' },
  { name: 'lavender-theme', color: '#E6E6FA' },
  { name: 'ivory-theme', color: '#FFFFF0' },
  { name: 'beige-theme', color: '#F5F5DC' },
  { name: 'magenta-theme', color: '#FF00FF' },
  { name: 'maroon-theme', color: '#800000' },
  { name: 'crimson-theme', color: '#DC143C' },
  { name: 'olive-theme', color: '#808000' },
  { name: 'periwinkle-theme', color: '#CCCCFF' },
  { name: 'azure-theme', color: '#007FFF' },
  { name: 'goldenrod-theme', color: '#DAA520' },
  { name: 'violet-theme', color: '#8A2BE2' },
  { name: 'honeydew-theme', color: '#F0FFF0' },
  { name: 'wheat-theme', color: '#F5DEB3' },
  { name: 'chartreuse-theme', color: '#7FFF00' },
  { name: 'rose-theme', color: '#FF007F' },
  { name: 'sienna-theme', color: '#A0522D' },
  { name: 'steelblue-theme', color: '#4682B4' },
  { name: 'slategray-theme', color: '#708090' },
  { name: 'moccasin-theme', color: '#FFE4B5' },
  { name: 'seashell-theme', color: '#FFF5EE' },
  { name: 'tan-theme', color: '#D2B48C' },
  { name: 'papayawhip-theme', color: '#FFEFD5' },
  { name: 'blanchedalmond-theme', color: '#FFEBCD' },
  { name: 'antiquewhite-theme', color: '#FAEBD7' },
  { name: 'bisque-theme', color: '#FFE4C4' },
  { name: 'gainsboro-theme', color: '#DCDCDC' },
  { name: 'linen-theme', color: '#FAF0E6' },
  { name: 'palevioletred-theme', color: '#DB7093' },
  { name: 'lemonchiffon-theme', color: '#FFFACD' },
  { name: 'lightcoral-theme', color: '#F08080' },
  { name: 'lightcyan-theme', color: '#E0FFFF' },
  { name: 'lightgoldenrodyellow-theme', color: '#FAFAD2' },
  { name: 'lightgray-theme', color: '#D3D3D3' },
  { name: 'lightpink-theme', color: '#FFB6C1' },
  { name: 'lightsalmon-theme', color: '#FFA07A' },
  { name: 'lightseagreen-theme', color: '#20B2AA' },
  { name: 'lightskyblue-theme', color: '#87CEFA' },
  { name: 'lightslategray-theme', color: '#778899' },
  { name: 'lightsteelblue-theme', color: '#B0C4DE' },
  { name: 'lightyellow-theme', color: '#FFFFE0' },
  { name: 'mediumaquamarine-theme', color: '#66CDAA' },
  { name: 'mediumblue-theme', color: '#0000CD' },
  { name: 'mediumorchid-theme', color: '#BA55D3' },
  { name: 'mediumpurple-theme', color: '#9370DB' },
  { name: 'mediumseagreen-theme', color: '#3CB371' },
  { name: 'mediumslateblue-theme', color: '#7B68EE' },
  { name: 'mediumspringgreen-theme', color: '#00FA9A' },
  { name: 'mediumturquoise-theme', color: '#48D1CC' },
  { name: 'mediumvioletred-theme', color: '#C71585' },
  { name: 'midnightblue-theme', color: '#191970' },
  { name: 'mintcream-theme', color: '#F5FFFA' },
  { name: 'mistyrose-theme', color: '#FFE4E1' },
  { name: 'navajowhite-theme', color: '#FFDEAD' },
  { name: 'oldlace-theme', color: '#FDF5E6' },
  { name: 'olivedrab-theme', color: '#6B8E23' },
  { name: 'palegoldenrod-theme', color: '#EEE8AA' },
  { name: 'palegreen-theme', color: '#98FB98' },
  { name: 'paleturquoise-theme', color: '#AFEEEE' },
  { name: 'palevioletred-theme', color: '#DB7093' },
  { name: 'papayawhip-theme', color: '#FFEFD5' },
  { name: 'peachpuff-theme', color: '#FFDAB9' },
  { name: 'peru-theme', color: '#CD853F' },
  { name: 'powderblue-theme', color: '#B0E0E6' },
  { name: 'rosybrown-theme', color: '#BC8F8F' },
  { name: 'royalblue-theme', color: '#4169E1' },
  { name: 'saddlebrown-theme', color: '#8B4513' },
  { name: 'sandybrown-theme', color: '#F4A460' },
  { name: 'seagreen-theme', color: '#2E8B57' },
  { name: 'skyblue-theme', color: '#87CEEB' },
  { name: 'springgreen-theme', color: '#00FF7F' },
  { name: 'thistle-theme', color: '#D8BFD8' },
  { name: 'yellowgreen-theme', color: '#9ACD32' },
  { name: 'snow-theme', color: '#FFFAFA' },
  { name: 'lemon-theme', color: '#FFF44F' },
  { name: 'cadetblue-theme', color: '#5F9EA0' },
  { name: 'burlywood-theme', color: '#DEB887' },
  { name: 'darkcyan-theme', color: '#008B8B' },
  { name: 'firebrick-theme', color: '#B22222' },
  { name: 'dodgerblue-theme', color: '#1E90FF' },
  { name: 'darkgoldenrod-theme', color: '#B8860B' },
  { name: 'forestgreen-theme', color: '#228B22' },
  { name: 'darkgray-theme', color: '#A9A9A9' },
  { name: 'darksalmon-theme', color: '#E9967A' },
  { name: 'darkkhaki-theme', color: '#BDB76B' },
  { name: 'darkorange-theme', color: '#FF8C00' },
  { name: 'darkorchid-theme', color: '#9932CC' },
  { name: 'darkred-theme', color: '#8B0000' },
  { name: 'darkseagreen-theme', color: '#8FBC8F' },
  { name: 'darkslateblue-theme', color: '#483D8B' },
  { name: 'darkslategray-theme', color: '#2F4F4F' },
  { name: 'darkturquoise-theme', color: '#00CED1' },
  { name: 'darkviolet-theme', color: '#9400D3' },
  { name: 'deepskyblue-theme', color: '#00BFFF' },
  { name: 'dimgray-theme', color: '#696969' },
  { name: 'fuchsia-theme', color: '#FF00FF' },
  { name: 'ghostwhite-theme', color: '#F8F8FF' },
  { name: 'greenyellow-theme', color: '#ADFF2F' },
  { name: 'hotpink-theme', color: '#FF69B4' },
  { name: 'indianred-theme', color: '#CD5C5C' },
  { name: 'lawngreen-theme', color: '#7CFC00' },
  { name: 'mediumvioletred-theme', color: '#C71585' },
  { name: 'orangered-theme', color: '#FF4500' },
  { name: 'palegreen-theme', color: '#98FB98' },
  { name: 'palegoldenrod-theme', color: '#EEE8AA' },
  { name: 'paleturquoise-theme', color: '#AFEEEE' },
  { name: 'paleturquoise-theme', color: '#AFEEEE' },
  { name: 'plum-theme', color: '#DDA0DD' },
  { name: 'powderblue-theme', color: '#B0E0E6' },
  { name: 'rosybrown-theme', color: '#BC8F8F' },
  { name: 'saddlebrown-theme', color: '#8B4513' },
  { name: 'thistle-theme', color: '#D8BFD8' },
  { name: 'yellowgreen-theme', color: '#9ACD32' }
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    nav:"myProfile"
  },

];

export const ordersGrid = [
  {
    headerText: 'Image',
    template: gridOrderImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'OrderItems',
    headerText: 'Item',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { field: 'CustomerName',
    headerText: 'Customer Name',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'TotalAmount',
    headerText: 'Total Amount',
    format: 'C2',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150',
  },
  {
    headerText: 'Status',
    template: gridOrderStatus,
    field: 'OrderItems',
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'OrderID',
    headerText: 'Order ID',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center',
  },
];


export const countryList = [
  { id: 1, country: "Afghanistan" },
  { id: 2, country: "Albania" },
  { id: 3, country: "Algeria" },
  { id: 4, country: "Andorra" },
  { id: 5, country: "Angola" },
  { id: 6, country: "Antigua and Barbuda" },
  { id: 7, country: "Argentina" },
  { id: 8, country: "Armenia" },
  { id: 9, country: "Australia" },
  { id: 10, country: "Austria" },
  { id: 11, country: "Azerbaijan" },
  { id: 12, country: "Bahamas" },
  { id: 13, country: "Bahrain" },
  { id: 14, country: "Bangladesh" },
  { id: 15, country: "Barbados" },
  { id: 16, country: "Belarus" },
  { id: 17, country: "Belgium" },
  { id: 18, country: "Belize" },
  { id: 19, country: "Benin" },
  { id: 20, country: "Bhutan" },
  { id: 21, country: "Bolivia" },
  { id: 22, country: "Bosnia and Herzegovina" },
  { id: 23, country: "Botswana" },
  { id: 24, country: "Brazil" },
  { id: 25, country: "Brunei" },
  { id: 26, country: "Bulgaria" },
  { id: 27, country: "Burkina Faso" },
  { id: 28, country: "Burundi" },
  { id: 29, country: "Cabo Verde" },
  { id: 30, country: "Cambodia" },
  { id: 31, country: "Cameroon" },
  { id: 32, country: "Canada" },
  { id: 33, country: "Central African Republic" },
  { id: 34, country: "Chad" },
  { id: 35, country: "Chile" },
  { id: 36, country: "China" },
  { id: 37, country: "Colombia" },
  { id: 38, country: "Comoros" },
  { id: 39, country: "Congo, Democratic Republic of the" },
  { id: 40, country: "Congo, Republic of the" },
  { id: 41, country: "Costa Rica" },
  { id: 42, country: "Croatia" },
  { id: 43, country: "Cuba" },
  { id: 44, country: "Cyprus" },
  { id: 45, country: "Czechia" },
  { id: 46, country: "Denmark" },
  { id: 47, country: "Djibouti" },
  { id: 48, country: "Dominica" },
  { id: 49, country: "Dominican Republic" },
  { id: 50, country: "Ecuador" },
  { id: 51, country: "Egypt" },
  { id: 52, country: "El Salvador" },
  { id: 53, country: "Equatorial Guinea" },
  { id: 54, country: "Eritrea" },
  { id: 55, country: "Estonia" },
  { id: 56, country: "Eswatini" },
  { id: 57, country: "Ethiopia" },
  { id: 58, country: "Fiji" },
  { id: 59, country: "Finland" },
  { id: 60, country: "France" },
  { id: 61, country: "Gabon" },
  { id: 62, country: "Gambia" },
  { id: 63, country: "Georgia" },
  { id: 64, country: "Germany" },
  { id: 65, country: "Ghana" },
  { id: 66, country: "Greece" },
  { id: 67, country: "Grenada" },
  { id: 68, country: "Guatemala" },
  { id: 69, country: "Guinea" },
  { id: 70, country: "Guinea-Bissau" },
  { id: 71, country: "Guyana" },
  { id: 72, country: "Haiti" },
  { id: 73, country: "Honduras" },
  { id: 74, country: "Hungary" },
  { id: 75, country: "Iceland" },
  { id: 76, country: "India" },
  { id: 77, country: "Indonesia" },
  { id: 78, country: "Iran" },
  { id: 79, country: "Iraq" },
  { id: 80, country: "Ireland" },
  { id: 81, country: "Israel" },
  { id: 82, country: "Italy" },
  { id: 83, country: "Jamaica" },
  { id: 84, country: "Japan" },
  { id: 85, country: "Jordan" },
  { id: 86, country: "Kazakhstan" },
  { id: 87, country: "Kenya" },
  { id: 88, country: "Kiribati" },
  { id: 89, country: "Korea, North" },
  { id: 90, country: "Korea, South" },
  { id: 91, country: "Kuwait" },
  { id: 92, country: "Kyrgyzstan" },
  { id: 93, country: "Laos" },
  { id: 94, country: "Latvia" },
  { id: 95, country: "Lebanon" },
  { id: 96, country: "Lesotho" },
  { id: 97, country: "Liberia" },
  { id: 98, country: "Libya" },
  { id: 99, country: "Liechtenstein" },
  { id: 100, country: "Lithuania" },
  { id: 101, country: "Luxembourg" },
  { id: 102, country: "Madagascar" },
  { id: 103, country: "Malawi" },
  { id: 104, country: "Malaysia" },
  { id: 105, country: "Maldives" },
  { id: 106, country: "Mali" },
  { id: 107, country: "Malta" },
  { id: 108, country: "Marshall Islands" },
  { id: 109, country: "Mauritania" },
  { id: 110, country: "Mauritius" },
  { id: 111, country: "Mexico" },
  { id: 112, country: "Micronesia" },
  { id: 113, country: "Moldova" },
  { id: 114, country: "Monaco" },
  { id: 115, country: "Mongolia" },
  { id: 116, country: "Montenegro" },
  { id: 117, country: "Morocco" },
  { id: 118, country: "Mozambique" },
  { id: 119, country: "Myanmar" },
  { id: 120, country: "Namibia" },
  { id: 121, country: "Nauru" },
  { id: 122, country: "Nepal" },
  { id: 123, country: "Netherlands" },
  { id: 124, country: "New Zealand" },
  { id: 125, country: "Nicaragua" },
  { id: 126, country: "Niger" },
  { id: 127, country: "Nigeria" },
  { id: 128, country: "North Macedonia" },
  { id: 129, country: "Norway" },
  { id: 130, country: "Oman" },
  { id: 131, country: "Pakistan" },
  { id: 132, country: "Palau" },
  { id: 133, country: "Palestine" },
  { id: 134, country: "Panama" },
  { id: 135, country: "Papua New Guinea" },
  { id: 136, country: "Paraguay" },
  { id: 137, country: "Peru" },
  { id: 138, country: "Philippines" },
  { id: 139, country: "Poland" },
  { id: 140, country: "Portugal" },
  { id: 141, country: "Qatar" },
  { id: 142, country: "Romania" },
  { id: 143, country: "Russia" },
  { id: 144, country: "Rwanda" },
  { id: 145, country: "Saint Kitts and Nevis" },
  { id: 146, country: "Saint Lucia" },
  { id: 147, country: "Saint Vincent and the Grenadines" },
  { id: 148, country: "Samoa" },
  { id: 149, country: "San Marino" },
  { id: 150, country: "Sao Tome and Principe" },
  { id: 151, country: "Saudi Arabia" },
  { id: 152, country: "Senegal" },
  { id: 153, country: "Serbia" },
  { id: 154, country: "Seychelles" },
  { id: 155, country: "Sierra Leone" },
  { id: 156, country: "Singapore" },
  { id: 157, country: "Slovakia" },
  { id: 158, country: "Slovenia" },
  { id: 159, country: "Solomon Islands" },
  { id: 160, country: "Somalia" },
  { id: 161, country: "South Africa" },
  { id: 162, country: "South Sudan" },
  { id: 163, country: "Spain" },
  { id: 164, country: "Sri Lanka" },
  { id: 165, country: "Sudan" },
  { id: 166, country: "Suriname" },
  { id: 167, country: "Sweden" },
  { id: 168, country: "Switzerland" },
  { id: 169, country: "Syria" },
  { id: 170, country: "Taiwan" },
  { id: 171, country: "Tajikistan" },
  { id: 172, country: "Tanzania" },
  { id: 173, country: "Thailand" },
  { id: 174, country: "Timor-Leste" },
  { id: 175, country: "Togo" },
  { id: 176, country: "Tonga" },
  { id: 177, country: "Trinidad and Tobago" },
  { id: 178, country: "Tunisia" },
  { id: 179, country: "Turkey" },
  { id: 180, country: "Turkmenistan" },
  { id: 181, country: "Tuvalu" },
  { id: 182, country: "Uganda" },
  { id: 183, country: "Ukraine" },
  { id: 184, country: "United Arab Emirates" },
  { id: 185, country: "United Kingdom" },
  { id: 186, country: "United States" },
  { id: 187, country: "Uruguay" },
  { id: 188, country: "Uzbekistan" },
  { id: 189, country: "Vanuatu" },
  { id: 190, country: "Vatican City" },
  { id: 191, country: "Venezuela" },
  { id: 192, country: "Vietnam" },
  { id: 193, country: "Yemen" },
  { id: 194, country: "Zambia" },
  { id: 195, country: "Zimbabwe" }
];

export const continentList = [
  { id: 1, name: "Africa" },
  { id: 2, name: "Asia" },
  { id: 3, name: "Australia" },
  { id: 4, name: "Europe" },
  { id: 5, name: "North America" },
  { id: 6, name: "South America" },
  { id: 7, name: "Antarctica" }
];


export const paymentMethod = [
  {methId:"100001",method:"Cash"},
  {methId:"100002",method:"Paypal Transfer"},
  {methId:"100003",method:"Wallet"},
  {methId:"100004",method:"Credit Card"},
  {methId:"100005",method:"Bank Transfer"},
  {methId:"100006",method:"Mobile Money"},


]

export const customers = [
  {custId:"100001",customer:"Hydot Tech"},
  {custId:"10002",customer:"Glydetek Group"},
  {custId:"100003",customer:"Stars Valley"},
  {custId:"100004",customer:"Kingdom Books"},
  {custId:"100005",customer:"E Process"},
  {custId:"100006",customer:"Cross Hills"},


]

export const products = [
  {prId:"100001",prod:"Product 1"},
  {prId:"10002",prod:"Product 2"},
  {prId:"100003",prod:"Product 3"},
  {prId:"100004",prod:"Product 4"},
  {prId:"100005",prod:"Product 5"},
  {prId:"100006",prod:"Product 6"},


]


export const paymentReference = [
  {id:"100001", ref: "Subscription" },
  {id:"100002", ref: "Invoice Payment" },
  {id:"100003", ref: "One-time Purchase" },
  {id:"100004", ref: "Recurring Billing" },
  {id:"100005", ref: "Deposit" },
  {id:"100006", ref: "Refund" },
  {id:"100007", ref: "Service Fee" },
  {id:"100008", ref: "Product Purchase" },
  {id:"100009", ref: "Membership Fee" },
  {id:"100010", ref: "Consultation Fee" },
];

export const pricingType = [

  {id:"100003", ref: "One-time Purchase" },
  {id:"100004", ref: "Recurring Billing" },

];


export const customersGrid = [
  { headerText: 'Name',
    width: '250',
    template: customerGridImage,
    textAlign: 'Center' },


  { field: 'Continent',
    headerText: 'Continent',
    width: '150',
    textAlign: 'Center' },



  {
    field: 'Country',
    headerText: 'Country',
    width: '100',
    format: 'C2',
    textAlign: 'Center' },

    { field: 'Phone',
    headerText: 'Phone',
    width: '120',
    textAlign: 'Center',
    isPrimaryKey: true,
  },

  { field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center' },


];


export const customersData = [
  {
    Phone: "0599626272",
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    CustomerLogo: avatar2,
    Continent: 'Africa',
    Country: 'Ghana',
    Location: 'East Legon Melcom',
  },
  {
    Phone: "0589726273",
    CustomerName: 'Sara Smith',
    CustomerEmail: 'sara.smith@example.com',
    CustomerLogo: avatar,
    Continent: 'Asia',
    Country: 'Japan',
    Location: 'Shibuya, Tokyo',
  },
  {
    Phone: "0579826274",
    CustomerName: 'Juan Carlos',
    CustomerEmail: 'juan.carlos@example.com',
    CustomerLogo: avatar3,
    Continent: 'South America',
    Country: 'Brazil',
    Location: 'Copacabana, Rio de Janeiro',
  },
  {
    Phone: "0569926275",
    CustomerName: 'Emily Johnson',
    CustomerEmail: 'emily.johnson@example.com',
    CustomerLogo: avatar4,
    Continent: 'North America',
    Country: 'United States',
    Location: 'Manhattan, New York',
  },
  {
    Phone: "0559626276",
    CustomerName: 'Liam Brown',
    CustomerEmail: 'liam.brown@example.com',
    CustomerLogo: avatar,
    Continent: 'Europe',
    Country: 'United Kingdom',
    Location: 'Soho, London',
  }
];


export const employeeGrid1 = [

  { 
    field: 'UserId',
    headerText: 'UserId',
    width: '150',
    textAlign: 'Center' 
  },

  { 
    headerText: 'Name',
    width: '250',
    template: employeeGridImage,
    textAlign: 'Center' 
  },

  { 
    field: 'Continent',
    headerText: 'Continent',
    width: '150',
    textAlign: 'Center' 
  },

  {
    field: 'Country',
    headerText: 'Country',
    width: '100',
    format: 'C2',
    textAlign: 'Center', 
    isEditable: false,
  },

  { 
    field: 'Phone',
    headerText: 'Phone',
    width: '120',
    textAlign: 'Center',
    isPrimaryKey: true,
  },

  { 
    field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center' 
  },

  { 
    headerText: 'Status',
    width: '150',
    template: Status,
    textAlign: 'Center' 
  },

  { 
    headerText: 'Deny Access',
    width: '200',
    template: BlockUsers,
    textAlign: 'Center' 
  },
 
  

];



export const employeeData = [
  {
    Phone: "0599626272",
    EmployeeName: 'Nirav Joshi',
    EmployeeEmail: 'nirav@gmail.com',
    EmployeeLogo: avatar2,
    Continent: 'Africa',
    Country: 'Ghana',
    Location: 'East Legon Melcom',
  },
  {
    Phone: "0589726273",
    EmployeeName: 'Sara Smith',
    EmployeeEmail: 'sara.smith@example.com',
    EmployeeLogo: avatar,
    Continent: 'Asia',
    Country: 'Japan',
    Location: 'Shibuya, Tokyo',
  },
  {
    Phone: "0579826274",
    EmployeeName: 'Juan Carlos',
    EmployeeEmail: 'juan.carlos@example.com',
    EmployeeLogo: avatar3,
    Continent: 'South America',
    Country: 'Brazil',
    Location: 'Copacabana, Rio de Janeiro',
  },
  {
    Phone: "0569926275",
    EmployeeName: 'Emily Johnson',
    EmployeeEmail: 'emily.johnson@example.com',
    EmployeeLogo: avatar4,
    Continent: 'North America',
    Country: 'United States',
    Location: 'Manhattan, New York',
  },
  {
    Phone: "0559626276",
    EmployeeName: 'Liam Brown',
    EmployeeEmail: 'liam.brown@example.com',
    EmployeeLogo: avatar,
    Continent: 'Europe',
    Country: 'United Kingdom',
    Location: 'Soho, London',
  }
];




export const ordersData = [
  {
    OrderID: 10248,
    CustomerName: 'Vinet',

    TotalAmount: 32.38,
    OrderItems: 'Fresh Tomato',
    Location: 'USA',
    Status: 'pending',
    StatusBg: '#FB9678',
    ProductImage:
      product6,
  },
  {
    OrderID: 345653,
    CustomerName: 'Carson Darrin',
    TotalAmount: 56.34,
    OrderItems: 'Butter Scotch',
    Location: 'Delhi',
    Status: 'complete',
    StatusBg: '#8BE78B',
    ProductImage:
      product5,
  },
  {
    OrderID: 390457,
    CustomerName: 'Fran Perez',
    TotalAmount: 93.31,
    OrderItems: 'Candy Gucci',
    Location: 'New York',
    Status: 'active',
    StatusBg: '#03C9D7',
    ProductImage:
      product7,
  },
  
];



export const auditTrialData = [
  {
    IpAddress: "192.141.26.8",
    Country: 'Ghana',
    City: "Accra",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },

  {
    IpAddress: "192.141.26.8",
    Country: 'Ghana',
    City: "Kumasi",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },

  {
    IpAddress: "192.141.26.8",
    Country: 'Ghana',
    City: "Accra",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },

  {
    IpAddress: "192.141.26.8",
    Country: 'Kumasi',
    City: "Accra",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },

  {
    IpAddress: "192.141.26.8",
    Country: 'Ghana',
    City: "Accra",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },
  


  {
    IpAddress: "192.141.26.8",
    Country: 'Kumasi',
    City: "Accra",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },

  {
    IpAddress: "192.141.26.8",
    Country: 'Ghana',
    City: "Accra",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },

  {
    IpAddress: "192.141.26.8",
    Country: 'Ghana',
    City: "Kumasi",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },

  {
    IpAddress: "192.141.26.8",
    Country: 'Ghana',
    City: "Accra",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },

  {
    IpAddress: "192.141.26.8",
    Country: 'Ghana',
    City: "Accra",
    Device: 'Desktop',
    OS: 'Mackintosh',
    Date: 'April 19, 2024 at 12:03 PM',
    Path: '/api/CompanyToken',
   Location:"https://maps.google.com/?q=5.5560,-0.1969"
  },


  





  
];


export const emailGrid = [
 
  {
    field: 'Id',
    headerText: 'DB ID',
    width: '50',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { field: 'Country',
    headerText: 'Country',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'City',
    headerText: 'City',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  
  {
    field: 'Email',
    headerText: 'Email',
    width: '120',
    textAlign: 'Center',
  }
];

export const ClientGrid = [
 
  {
    field: 'id',
    headerText: 'ID',
    width: '50',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { field: 'Category',
    headerText: 'Category',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'Description',
    headerText: 'Description',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
 
];


export const TestimonialsGrid = [
 
  {
    field: 'id',
    headerText: 'ID',
    width: '50',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { field: 'Fullname',
    headerText: 'Full Name',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'Position',
    headerText: 'Position',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
 
  {
    field: 'Message',
    headerText: 'Message',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  
];



export const emailData = [
  {
    Id: "1",
    Country: 'Ghana',
    City: "Accra",
    Email: 'solomondanso2020@gmail.com',

  },

  {
    Id: "2",
    Country: 'Ghana',
    City: "Accra",
    Email: 'solomondanso2021@gmail.com',
  },

  {
    Id: "3",
    Country: 'Ghana',
    City: "Accra",
    Email: 'solomondanso2022@gmail.com',
  },

  {
    Id: "4",
    Country: 'Ghana',
    City: "Accra",
    Email: 'solomondanso2023@gmail.com',
  },


  {
    Id: "5",
    Country: 'Ghana',
    City: "Accra",
    Email: 'solomondanso2024@gmail.com',
  },

  





  
];


const customDateFormat = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return date.toLocaleString('en-US', options).replace(',',' at');
};

const startDateTemplate = (props) => {
  return <span>{customDateFormat(props.created_at)}</span>;
};

const endDateTemplate = (props) => {
  return <span>{customDateFormat(props.updated_at)}</span>;
};

const auditDateTemplate = (props) => {
  return <span>{customDateFormat(props.created_at)}</span>;
};



const ReplyStatus = (props) => (
 
  <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
  
    <div style={{ width: "calc(100% - 60px)" }}>
      {
        props.isReplied==0?<>
         <p  className="text-sm text-red-600">Not Replied</p>
        </>:<>
        <p className="text-sm text-green-600">Replied</p>
        </>
      }
     
    </div>
  </div>
);


const Reply = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
        {props.isReplied == 0 ? (
          <p onClick={() => navigate(`/main/instantReply/${props.EmailId}`)} className="text-sm text-green-600">
            Reply Now
          </p>
        ) : (
          <p onClick={() => navigate(`/main/instantReply/${props.EmailId}`)} className="text-sm text-green-600">
          Follow Up
        </p>
        )}
      </div>
    </div>
  );
};





export const chatGrid = [
  { field: 'EmailId', headerText: 'Email Id', width: '150', textAlign: 'Center' },
  { field: 'Purpose', headerText: 'Purpose', width: '150', textAlign: 'Center' },
  { field: 'FullName', headerText: 'Full Name', width: '150', textAlign: 'Center' },
  { field: 'Email', headerText: 'Email', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
  { field: 'Message', headerText: 'Message', width: '120', textAlign: 'Center', isPrimaryKey: true },
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: auditDateTemplate,
  },  

  {
    field: 'isReplied',
    headerText: 'Status',
    width: '120',
    textAlign: 'Center',
    template: ReplyStatus,
  },
  
  {
    field: 'isReplied',
    headerText: 'Action',
    width: '130',
    textAlign: 'Center',
    template: Reply,
  },
   



];


export const auditTrialGrid = [
  { field: 'ipAddress', headerText: 'Ip Address', width: '150', textAlign: 'Center' },
  { headerText: 'Name', width: '250', template: auditGridImage, textAlign: 'Center' },
  { field: 'country', headerText: 'Country', width: '150', textAlign: 'Center' },
  { field: 'city', headerText: 'City', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
  { field: 'urlPath', headerText: 'Path', width: '120', textAlign: 'Center', isPrimaryKey: true },
  { field: 'googlemap', headerText: 'Google Map', width: '150', textAlign: 'Center' },
  
  { field: 'action', headerText: 'Action', width: '120', textAlign: 'Center', isPrimaryKey: true },
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: auditDateTemplate,
  },  
];


export const prdAssGrid = [
  { field: 'ipAddress', headerText: 'Ip Address', width: '150', textAlign: 'Center' },
  { headerText: 'Name', width: '250', template: prdAssGridImage, textAlign: 'Center' },
  { field: 'country', headerText: 'Country', width: '150', textAlign: 'Center' },
  { field: 'city', headerText: 'City', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
  { field: 'urlPath', headerText: 'Path', width: '120', textAlign: 'Center', isPrimaryKey: true },
  { field: 'googlemap', headerText: 'Google Map', width: '150', textAlign: 'Center' },
  
  { field: 'action', headerText: 'Action', width: '120', textAlign: 'Center', isPrimaryKey: true },
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: auditDateTemplate,
  },  
];

export const rateLimitGrid = [
  { field: 'ipAddress', headerText: 'Ip Address', width: '150', textAlign: 'Center' },
   { field: 'country', headerText: 'Country', width: '150', textAlign: 'Center' },
  { field: 'city', headerText: 'City', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
  { field: 'os', headerText: 'OS', width: '120', textAlign: 'Center', isPrimaryKey: true },
  { field: 'googlemap', headerText: 'Google Map', width: '150', textAlign: 'Center' },
   {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: auditDateTemplate,
  },  
];





export const customerTrialGrid = [
  { field: 'ipAddress', headerText: 'Ip Address', width: '150', textAlign: 'Center' },
  { headerText: 'Name', width: '250', template: custauditGridImage, textAlign: 'Center' },
  { field: 'country', headerText: 'Country', width: '150', textAlign: 'Center' },
  { field: 'city', headerText: 'City', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
  { field: 'urlPath', headerText: 'Path', width: '120', textAlign: 'Center', isPrimaryKey: true },
  { field: 'googlemap', headerText: 'Google Map', width: '150', textAlign: 'Center' },
  
  { field: 'action', headerText: 'Action', width: '120', textAlign: 'Center', isPrimaryKey: true },
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: auditDateTemplate,
  },  
];






export const visitorsGrid = [
  { field: 'ipAddress', headerText: 'Ip Address', width: '150', textAlign: 'Center' },
  { field: 'country', headerText: 'Country', width: '150', textAlign: 'Center' },
  { field: 'city', headerText: 'City', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
  { field: 'device', headerText: 'Device', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
  { field: 'os', headerText: 'Os', width: '100', format: 'C2', textAlign: 'Center', isEditable: false },
 
  
  { field: 'googlemap', headerText: 'Google Map', width: '150', textAlign: 'Center' },  
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: auditDateTemplate,
  },  
];

const expireDateTemplate = (props) => {
  return <span>{customDateFormat(props.ExpireDate)}</span>;
};

export const paymentGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'ReferenceId',
    headerText: 'Reference Id',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'Phone',
    headerText: 'Phone',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'Email',
    headerText: 'Email',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'AmountPaid',
    headerText: 'Amount Paid',
    width: '120',
    textAlign: 'Center',
  },
  {
    field: 'Status',
    headerText: 'Status',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'StartDate',
    headerText: 'StartDate',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },
  
];

const CollectionAccount = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 10px)" }}>
      <p onClick={() => navigate(`/main/collectionAccount/${props.AccountId}`)} className="text-sm text-green-600">
           View History
          </p>
      </div>
    </div>
  );
};

export const collectionAccGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'AccountId',
    headerText: 'Account Id',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'Phone',
    headerText: 'Phone',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'Email',
    headerText: 'Email',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'Debit',
    headerText: 'Debit',
    width: '120',
    textAlign: 'Center',
  },
  {
    field: 'Balance',
    headerText: 'Balance Left',
    width: '120',
    textAlign: 'Center',
  },
  {
    field: 'Status',
    headerText: 'Status',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'StartDate',
    headerText: 'StartDate',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },
  {
    headerText: 'Action',
    width: '120',
    textAlign: 'Center',
    template: CollectionAccount,
  }
];

export const collectionAccHistoryGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'AccountId',
    headerText: 'Account Id',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'OldBalance',
    headerText: 'OldBalance',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'AmountPaid',
    headerText: 'Amount Paid',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'NewBalance',
    headerText: 'New Balance',
    width: '120',
    textAlign: 'Center',
  },
  {
    field: 'Status',
    headerText: 'Status',
    width: '120',
    textAlign: 'Center',
  },
  
  {
    field: 'StartDate',
    headerText: 'Transaction Date',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },
  
];

const handleConfirmPaymentOnDelivery = async (orderId, Amount) => {
  let userInfo = {};

  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = "$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK";
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);

  userInfo = parsedData;

  Show.showLoading("Processing Data");

  try {
    const formData = new FormData();
    formData.append("AdminId", userInfo.UserId);
    formData.append("OrderId", orderId);
    formData.append("Amount", Amount);

    const response = await fetch(apiServer + "ConfirmPaymentOnDelivery", {
      method: "POST",
      headers: {
        UserId: userInfo.UserId,
        SessionId: userInfo.SessionId,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      Show.hideLoading();
      Show.Success(data.message);
      window.location.reload();
    } else {
      Show.Attention(data.message);
    }
  } catch (error) {
    Show.Attention("An error has occurred");
  }
};

const payOnDeliveryStatus = (props) => {
  // Open modal function
  const openModal = () => {
    const modal = document.getElementById(`modal-${props.OrderId}`);
    modal.style.display = "flex"; // Show modal
  };

  // Close modal function
  const closeModal = () => {
    const modal = document.getElementById(`modal-${props.OrderId}`);
    modal.style.display = "none"; // Hide modal
  };

  // Get the amount entered by the user
  const getAmount = () => {
    const amountInput = document.getElementById(`amt-${props.OrderId}`);
    return amountInput.value;
  };

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      {/* Modal */}
      <div id={`modal-${props.OrderId}`} className="modal-overlay" style={{ display: "none" }}>
        <div className="modal-container">
          <h2>Make Payment for your order</h2>
          <FormInputStudent
            type="number"
            id={`amt-${props.OrderId}`} // Unique ID for the amount input field based on OrderId
            placeholder="Enter amount"
            style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
          />
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <button
              className="confirm-button"
              onClick={() => handleConfirmPaymentOnDelivery(props.OrderId, getAmount())}
            >
              Pay
            </button>
            <button className="close-button" onClick={closeModal}>
            Close
          </button>
          </div>
         
        </div>
      </div>

      <div style={{ width: "calc(100% - 60px)" }}>
        {props.IsFullyPaid === 0 ? (
          <p className="text-sm text-red-600 cursor-pointer" onClick={openModal}>
            Pay Now
          </p>
        ) : (
          <p className="text-sm text-green-600">Paid</p>
        )}
      </div>
    </div>
  );
};

export default payOnDeliveryStatus;






export const paymentOnDeliveryGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },

  {
    field: 'Phone',
    headerText: 'Phone',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'Email',
    headerText: 'Email',
    width: '120',
    textAlign: 'Center',
  },

  {
    field: 'Amount',
    headerText: 'Amount Paid',
    width: '120',
    textAlign: 'Center',
  },
  {
    field: 'StartDate',
    headerText: 'Payment Date',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },

  {
    field: 'IsFullyPaid',
    headerText: 'Action',
    width: '120',
    textAlign: 'Center',
    template: payOnDeliveryStatus,
  },


  
];



const Bagging = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/bagging/${props.OrderId}/${props.BaggingId}`)} className="text-sm text-green-600">
           View Details
          </p>
      </div>
    </div>
  );
};

const Checking = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/checking/${props.OrderId}/${props.CheckerId}`)} className="text-sm text-green-600">
           View Details
          </p>
      </div>
    </div>
  );
};






const Delivery = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/delivery/${props.OrderId}/${props.DeliveryId}`)} className="text-sm text-green-600">
           View Details
          </p>
      </div>
    </div>
  );
};

const DeliveryList = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/deliveryList/${props.OrderId}/${props.DeliveryId}`)} className="text-sm text-green-600">
           View Details
          </p>
      </div>
    </div>
  );
};

const DeliveryNow = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 60px)" }}>
      <p onClick={() => navigate(`/main/customerDeliveryList/${props.OrderId}/${props.DeliveryId}`)} className="text-sm text-green-600">
           View Details
          </p>
      </div>
    </div>
  );
};





export const baggingGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'BaggingId',
    headerText: 'Reference Id',
    width: '80',
    textAlign: 'Center',
  },
  
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },

  {
    headerText: 'Action',
    width: '120',
    textAlign: 'Center',
    template: Bagging,
  },
  
];


export const checkingGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'BaggingId',
    headerText: 'Bagging Id',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'BAdminName',
    headerText: 'Bagged By',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'CheckerId',
    headerText: 'Checking Id',
    width: '80',
    textAlign: 'Center',
  },
  
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },

  {
    headerText: 'Action',
    width: '120',
    textAlign: 'Center',
    template: Checking,
  },
  
];


const Bagg = (props) => {
  const navigate = useNavigate();

  return (
    <div className="image flex gap-4 items-center" style={{ width: "100%" }}>
      <div style={{ width: "calc(100% - 10px)" }}>
      <p onClick={() => navigate(`/main/creditSales/${props.OrderId}/${props.ReferenceId}`)} className="text-sm text-green-600">
           View Details
          </p>
      </div>
    </div>
  );
};

export const creditSalesGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'ReferenceId',
    headerText: 'Reference Id',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'Phone',
    headerText: 'Phone',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'Email',
    headerText: 'Email',
    width: '80',
    textAlign: 'Center',
  },
  
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },

  {
    headerText: 'Action',
    width: '220',
    textAlign: 'Center',
    template: Bagg,
  },
  
];


export const deliveryGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'BaggingId',
    headerText: 'Bagging Id',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'BAdminName',
    headerText: 'Bagged By',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'CheckerId',
    headerText: 'Checking Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'CAdminName',
    headerText: 'Checked By',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'DeliveryId',
    headerText: 'Delivery Id',
    width: '80',
    textAlign: 'Center',
  },
  
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },

  {
    headerText: 'Action',
    width: '120',
    textAlign: 'Center',
    template: Delivery,
  },
  
];


export const deliveryGlobalGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'PaymentId',
    headerText: 'Payment Id',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'BaggingId',
    headerText: 'Bagging Id',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'BAdminName',
    headerText: 'Bagged By',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'CheckerId',
    headerText: 'Checking Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'CAdminName',
    headerText: 'Checked By',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'DeliveryId',
    headerText: 'Delivery Id',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'DAdminName',
    headerText: 'Assigned To',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'Status',
    headerText: 'Status',
    width: '80',
    textAlign: 'Center',
  },
  
  {
    field: 'updated_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: endDateTemplate,
  },

  {
    headerText: 'Action',
    width: '120',
    textAlign: 'Center',
    template: DeliveryList,
  },
  
];

export const CustomerdeliveryGrid = [
  { 
    field: 'UserId',
    headerText: 'User Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'OrderId',
    headerText: 'Order Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'BaggingId',
    headerText: 'Bagging Id',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'BAdminName',
    headerText: 'Bagged By',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'CheckerId',
    headerText: 'Checking Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'CAdminName',
    headerText: 'Checked By',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'DeliveryId',
    headerText: 'Delivery Id',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'DAdminName',
    headerText: 'Assigned To',
    width: '80',
    textAlign: 'Center',
  },

  { 
    field: 'Status',
    headerText: 'Status',
    width: '80',
    textAlign: 'Center',
  },
  
  {
    field: 'created_at',
    headerText: 'Date',
    width: '120',
    textAlign: 'Center',
    template: startDateTemplate,
  },

  {
    headerText: 'Action',
    width: '120',
    textAlign: 'Center',
    template: DeliveryNow,
  },
  
];




export const clientApiGrid = [
  { 
    field: 'id',
    headerText: 'Api Id',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'CompanyId',
    headerText: 'Company Id',
    width: '80',
    textAlign: 'Center',
  },
  {
    field: 'CompanyName',
    headerText: 'Company Name',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'CompanyEmail',
    headerText: 'Company Email',
    width: '120',
    textAlign: 'Center',
  },
  {
    field: 'CompanyPhone',
    headerText: 'Company Phone',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },
  {
    field: 'ApiServerURL',
    headerText: 'Api Server URL',
    width: '120',
    textAlign: 'Center',
  },
  {
    field: 'ApiMediaURL',
    headerText: 'Api Media URL',
    format: 'C2',
    textAlign: 'Center',
    width: '80',
  },

];




export const expensesGrid = [
  { 
    field: 'Amount',
    headerText: 'Amount',
    width: '80',
    textAlign: 'Center',
  },
  { 
    field: 'Reason',
    headerText: 'Reason',
    width: '80',
    textAlign: 'Center',
  },
  
];




export const scheduleData = [
  {
    Id: 1,
    Subject: 'Explosion of Betelgeuse Star',
    Location: 'Space Center USA',
    StartTime: '2024-06-06T06:30:00.000Z',
    EndTime: '2024-06-06T08:30:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 2,
    Subject: "Testing",
    StartTime: "2024-06-05T09:00:00.000Z",
    EndTime: "2024-06-05T09:30:00.000Z",
    Description: "ThetITLE",
    Location: "tHElOCATION",
    IsAllDay: false,
    CategoryColor: "#1aaa55"
},
  {
    Id: 3,
    Subject: 'Thule Air Crash Report',
    Location: 'Newyork City',
    StartTime: '2021-01-11T06:30:00.000Z',
    EndTime: '2021-01-11T08:30:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 4,
    Subject: 'Blue Moon Eclipse',
    Location: 'Space Center USA',
    StartTime: '2021-01-12T04:00:00.000Z',
    EndTime: '2021-01-12T05:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  
];






export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],


  [
    { x: new Date(2005, 0, 1), y: 18 },
    { x: new Date(2006, 0, 1), y: 28 },
    { x: new Date(2007, 0, 1), y: 38 },
    { x: new Date(2008, 0, 1), y: 49 },
    { x: new Date(2009, 0, 1), y: 58 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 90 },
  ],


  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 38 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 59 },
    { x: new Date(2009, 0, 1), y: 68 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],


  [
    { x: new Date(2005, 0, 1), y: 48 },
    { x: new Date(2006, 0, 1), y: 58 },
    { x: new Date(2007, 0, 1), y: 18 },
    { x: new Date(2008, 0, 1), y: 79 },
    { x: new Date(2009, 0, 1), y: 28 },
    { x: new Date(2010, 0, 1), y: 88 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],








];
export const dropdownData = [
  {
    Id: '1',
    Time: 'March 2021',
  },
  {
    Id: '2',
    Time: 'April 2021',
  }, {
    Id: '3',
    Time: 'May 2021',
  },
];
export const SparklineAreaData = [
  { x: 1, yval: 250 },
  { x: 2, yval: 760 },
  { x: 3, yval: 1898 },
  { x: 4, yval: 590 },
 

];

export const lineCustomSeries = [
  { dataSource: lineChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Africa',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

  { dataSource: lineChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'North America',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

  { dataSource: lineChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'South America',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line' },

    { dataSource: lineChartData[3],
      xName: 'x',
      yName: 'y',
      name: 'Europe',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },

      { dataSource: lineChartData[4],
        xName: 'x',
        yName: 'y',
        name: 'Asia',
        width: '2',
        marker: { visible: true, width: 10, height: 10 },
        type: 'Line' },

        { dataSource: lineChartData[5],
          xName: 'x',
          yName: 'y',
          name: 'Australia',
          width: '2',
          marker: { visible: true, width: 10, height: 10 },
          type: 'Line' },

];

export const pieChartData = [
  { x: 'Labour', y: 18, text: '18%' },
  { x: 'Legal', y: 8, text: '8%' },
  { x: 'Production', y: 15, text: '15%' },
  { x: 'License', y: 11, text: '11%' },
  { x: 'Facilities', y: 18, text: '18%' },
  { x: 'Taxes', y: 14, text: '14%' },
  { x: 'Insurance', y: 16, text: '16%' },
];

export const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
];

export const ecomPieChartData = [
  { x: '2018', y: 18, text: '35%' },
  { x: '2019', y: 18, text: '15%' },
  { x: '2020', y: 18, text: '25%' },
  { x: '2021', y: 18, text: '25%' },
];

export const stackedChartData = [
  [
    { x: 'Jan', y: 198.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
  
];

export const stackedCustomSeries = [

  { dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Earnings',
    type: 'StackingColumn',
    background: 'blue',

  },

  { dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Expense',
    type: 'StackingColumn',
    background: 'red',

  },

];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 100,
  maximum: 900,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

export const kanbanData = [
  {
    Id: 'Task 1',
    Title: 'Task - 29001',
    Status: 'Open',
    Summary: 'Analyze the new requirements gathered from the customer.',
    Type: 'Story',
    Priority: 'Low',
    Tags: 'Analyze,Customer',
    Estimate: 3.5,
    Assignee: 'Nancy Davloio',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-low, e-nancy-davloio',
  },
  {
    Id: 'Task 2',
    Title: 'Task - 29002',
    Status: 'InProgress',
    Summary: 'Improve application performance',
    Type: 'Improvement',
    Priority: 'Normal',
    Tags: 'Improvement',
    Estimate: 6,
    Assignee: 'Andrew Fuller',
    RankId: 1,
    Color: '#673AB8',
    ClassName: 'e-improvement, e-normal, e-andrew-fuller',
  },
  {
    Id: 'Task 3',
    Title: 'Task - 29003',
    Status: 'Open',
    Summary: 'Arrange a web meeting with the customer to get new requirements.',
    Type: 'Others',
    Priority: 'Critical',
    Tags: 'Meeting',
    Estimate: 5.5,
    Assignee: 'Janet Leverling',
    RankId: 2,
    Color: '#1F88E5',
    ClassName: 'e-others, e-critical, e-janet-leverling',
  },
  {
    Id: 'Task 4',
    Title: 'Task - 29004',
    Status: 'InProgress',
    Summary: 'Fix the issues reported in the IE browser.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'IE',
    Estimate: 2.5,
    Assignee: 'Janet Leverling',
    RankId: 2,
    Color: '#E64A19',
    ClassName: 'e-bug, e-release, e-janet-leverling',
  },
  {
    Id: 'Task 5',
    Title: 'Task - 29005',
    Status: 'Review',
    Summary: 'Fix the issues reported by the customer.',
    Type: 'Bug',
    Priority: 'Low',
    Tags: 'Customer',
    Estimate: '3.5',
    Assignee: 'Steven walker',
    RankId: 1,
    Color: '#E64A19',
    ClassName: 'e-bug, e-low, e-steven-walker',
  },
  {
    Id: 'Task 6',
    Title: 'Task - 29007',
    Status: 'Validate',
    Summary: 'Validate new requirements',
    Type: 'Improvement',
    Priority: 'Low',
    Tags: 'Validation',
    Estimate: 1.5,
    Assignee: 'Robert King',
    RankId: 1,
    Color: '#673AB8',
    ClassName: 'e-improvement, e-low, e-robert-king',
  },
  {
    Id: 'Task 7',
    Title: 'Task - 29009',
    Status: 'Review',
    Summary: 'Fix the issues reported in Safari browser.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'Fix,Safari',
    Estimate: 1.5,
    Assignee: 'Nancy Davloio',
    RankId: 2,
    Color: '#E64A19',
    ClassName: 'e-bug, e-release, e-nancy-davloio',
  },
  {
    Id: 'Task 8',
    Title: 'Task - 29010',
    Status: 'Close',
    Summary: 'Test the application in the IE browser.',
    Type: 'Story',
    Priority: 'Low',
    Tags: 'Review,IE',
    Estimate: 5.5,
    Assignee: 'Margaret hamilt',
    RankId: 3,
    Color: '#02897B',
    ClassName: 'e-story, e-low, e-margaret-hamilt',
  },
  {
    Id: 'Task 9',
    Title: 'Task - 29011',
    Status: 'Validate',
    Summary: 'Validate the issues reported by the customer.',
    Type: 'Story',
    Priority: 'High',
    Tags: 'Validation,Fix',
    Estimate: 1,
    Assignee: 'Steven walker',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-high, e-steven-walker',
  },
  {
    Id: 'Task 10',
    Title: 'Task - 29015',
    Status: 'Open',
    Summary: 'Show the retrieved data from the server in grid control.',
    Type: 'Story',
    Priority: 'High',
    Tags: 'Database,SQL',
    Estimate: 5.5,
    Assignee: 'Margaret hamilt',
    RankId: 4,
    Color: '#02897B',
    ClassName: 'e-story, e-high, e-margaret-hamilt',
  },
  {
    Id: 'Task 11',
    Title: 'Task - 29016',
    Status: 'InProgress',
    Summary: 'Fix cannot open user’s default database SQL error.',
    Priority: 'Critical',
    Type: 'Bug',
    Tags: 'Database,Sql2008',
    Estimate: 2.5,
    Assignee: 'Janet Leverling',
    RankId: 4,
    Color: '#E64A19',
    ClassName: 'e-bug, e-critical, e-janet-leverling',
  },
  {
    Id: 'Task 12',
    Title: 'Task - 29017',
    Status: 'Review',
    Summary: 'Fix the issues reported in data binding.',
    Type: 'Story',
    Priority: 'Normal',
    Tags: 'Databinding',
    Estimate: '3.5',
    Assignee: 'Janet Leverling',
    RankId: 4,
    Color: '#02897B',
    ClassName: 'e-story, e-normal, e-janet-leverling',
  },
  {
    Id: 'Task 13',
    Title: 'Task - 29018',
    Status: 'Close',
    Summary: 'Analyze SQL server 2008 connection.',
    Type: 'Story',
    Priority: 'Critical',
    Tags: 'Grid,Sql',
    Estimate: 2,
    Assignee: 'Andrew Fuller',
    RankId: 4,
    Color: '#02897B',
    ClassName: 'e-story, e-release, e-andrew-fuller',
  },
  {
    Id: 'Task 14',
    Title: 'Task - 29019',
    Status: 'Validate',
    Summary: 'Validate databinding issues.',
    Type: 'Story',
    Priority: 'Low',
    Tags: 'Validation',
    Estimate: 1.5,
    Assignee: 'Margaret hamilt',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-low, e-margaret-hamilt',
  },
  {
    Id: 'Task 15',
    Title: 'Task - 29020',
    Status: 'Close',
    Summary: 'Analyze grid control.',
    Type: 'Story',
    Priority: 'High',
    Tags: 'Analyze',
    Estimate: 2.5,
    Assignee: 'Margaret hamilt',
    RankId: 5,
    Color: '#02897B',
    ClassName: 'e-story, e-high, e-margaret-hamilt',
  },
  {
    Id: 'Task 16',
    Title: 'Task - 29021',
    Status: 'Close',
    Summary: 'Stored procedure for initial data binding of the grid.',
    Type: 'Others',
    Priority: 'Critical',
    Tags: 'Databinding',
    Estimate: 1.5,
    Assignee: 'Steven walker',
    RankId: 6,
    Color: '#1F88E5',
    ClassName: 'e-others, e-release, e-steven-walker',
  },
  {
    Id: 'Task 17',
    Title: 'Task - 29022',
    Status: 'Close',
    Summary: 'Analyze stored procedures.',
    Type: 'Story',
    Priority: 'Critical',
    Tags: 'Procedures',
    Estimate: 5.5,
    Assignee: 'Janet Leverling',
    RankId: 7,
    Color: '#02897B',
    ClassName: 'e-story, e-release, e-janet-leverling',
  },
  {
    Id: 'Task 18',
    Title: 'Task - 29023',
    Status: 'Validate',
    Summary: 'Validate editing issues.',
    Type: 'Story',
    Priority: 'Critical',
    Tags: 'Editing',
    Estimate: 1,
    Assignee: 'Nancy Davloio',
    RankId: 1,
    Color: '#02897B',
    ClassName: 'e-story, e-critical, e-nancy-davloio',
  },
  {
    Id: 'Task 19',
    Title: 'Task - 29024',
    Status: 'Review',
    Summary: 'Test editing functionality.',
    Type: 'Story',
    Priority: 'Normal',
    Tags: 'Editing,Test',
    Estimate: 0.5,
    Assignee: 'Nancy Davloio',
    RankId: 5,
    Color: '#02897B',
    ClassName: 'e-story, e-normal, e-nancy-davloio',
  },
  {
    Id: 'Task 20',
    Title: 'Task - 29025',
    Status: 'Open',
    Summary: 'Enhance editing functionality.',
    Type: 'Improvement',
    Priority: 'Low',
    Tags: 'Editing',
    Estimate: 3.5,
    Assignee: 'Andrew Fuller',
    RankId: 5,
    Color: '#673AB8',
    ClassName: 'e-improvement, e-low, e-andrew-fuller',
  },
  {
    Id: 'Task 21',
    Title: 'Task - 29026',
    Status: 'InProgress',
    Summary: 'Improve the performance of the editing functionality.',
    Type: 'Epic',
    Priority: 'High',
    Tags: 'Performance',
    Estimate: 6,
    Assignee: 'Nancy Davloio',
    RankId: 5,
    Color: '#e91e64',
    ClassName: 'e-epic, e-high, e-nancy-davloio',
  },
  {
    Id: 'Task 22',
    Title: 'Task - 29027',
    Status: 'Open',
    Summary: 'Arrange web meeting with the customer to show editing demo.',
    Type: 'Others',
    Priority: 'High',
    Tags: 'Meeting,Editing',
    Estimate: 5.5,
    Assignee: 'Steven walker',
    RankId: 6,
    Color: '#1F88E5',
    ClassName: 'e-others, e-high, e-steven-walker',
  },
  {
    Id: 'Task 23',
    Title: 'Task - 29029',
    Status: 'Review',
    Summary: 'Fix the editing issues reported by the customer.',
    Type: 'Bug',
    Priority: 'Low',
    Tags: 'Editing,Fix',
    Estimate: '3.5',
    Assignee: 'Janet Leverling',
    RankId: 6,
    Color: '#E64A19',
    ClassName: 'e-bug, e-low, e-janet-leverling',
  },
  {
    Id: 'Task 24',
    Title: 'Task - 29030',
    Status: 'Testing',
    Summary: 'Fix the issues reported by the customer.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'Customer',
    Estimate: '3.5',
    Assignee: 'Steven walker',
    RankId: 1,
    Color: '#E64A19',
    ClassName: 'e-bug, e-critical, e-steven-walker',
  },
  {
    Id: 'Task 25',
    Title: 'Task - 29031',
    Status: 'Testing',
    Summary: 'Fix the issues reported in Safari browser.',
    Type: 'Bug',
    Priority: 'Critical',
    Tags: 'Fix,Safari',
    Estimate: 1.5,
    Assignee: 'Nancy Davloio',
    RankId: 2,
    Color: '#E64A19',
    ClassName: 'e-bug, e-release, e-nancy-davloio',
  },
];

export const financialChartData = [
  {
    x: new Date('2012-04-02'),
    open: 85.9757,
    high: 90.6657,
    low: 85.7685,
    close: 90.5257,
    volume: 660187068,
  },
  {
    x: new Date('2012-04-09'),
    open: 89.4471,
    high: 92,
    low: 86.2157,
    close: 86.4614,
    volume: 912634864,
  },
  {
    x: new Date('2012-04-16'),
    open: 87.1514,
    high: 88.6071,
    low: 81.4885,
    close: 81.8543,
    volume: 1221746066,
  },
  {
    x: new Date('2012-04-23'),
    open: 81.5157,
    high: 88.2857,
    low: 79.2857,
    close: 86.1428,
    volume: 965935749,
  },
  {
    x: new Date('2012-04-30'),
    open: 85.4,
    high: 85.4857,
    low: 80.7385,
    close: 80.75,
    volume: 615249365,
  },
  {
    x: new Date('2012-05-07'),
    open: 80.2143,
    high: 82.2685,
    low: 79.8185,
    close: 80.9585,
    volume: 541742692,
  },
  {
    x: new Date('2012-05-14'),
    open: 80.3671,
    high: 81.0728,
    low: 74.5971,
    close: 75.7685,
    volume: 708126233,
  },
  {
    x: new Date('2012-05-21'),
    open: 76.3571,
    high: 82.3571,
    low: 76.2928,
    close: 80.3271,
    volume: 682076215,
  },
  {
    x: new Date('2012-05-28'),
    open: 81.5571,
    high: 83.0714,
    low: 80.0743,
    close: 80.1414,
    volume: 480059584,
  },
  {
    x: new Date('2012-06-04'),
    open: 80.2143,
    high: 82.9405,
    low: 78.3571,
    close: 82.9028,
    volume: 517577005,
  },
  {
    x: new Date('2012-06-11'),
    open: 83.96,
    high: 84.0714,
    low: 80.9571,
    close: 82.0185,
    volume: 499693120,
  },
  {
    x: new Date('2012-06-18'),
    open: 81.5657,
    high: 84.2857,
    low: 81.4814,
    close: 83.1571,
    volume: 442172142,
  },
  {
    x: new Date('2012-06-25'),
    open: 82.4714,
    high: 83.4285,
    low: 80.8014,
    close: 83.4285,
    volume: 371529102,
  },
  {
    x: new Date('2012-07-02'),
    open: 83.5328,
    high: 87.7628,
    low: 83.3714,
    close: 86.5543,
    volume: 385906790,
  },
  {
    x: new Date('2012-07-09'),
    open: 86.4714,
    high: 88.5528,
    low: 84.6685,
    close: 86.4243,
    volume: 524235196,
  },
  {
    x: new Date('2012-07-16'),
    open: 86.4457,
    high: 87.9071,
    low: 86.1643,
    close: 86.3285,
    volume: 419537217,
  },
  {
    x: new Date('2012-07-23'),
    open: 84.9143,
    high: 87.0971,
    low: 81.4285,
    close: 83.5943,
    volume: 680773023,
  },
  {
    x: new Date('2012-07-30'),
    open: 84.4171,
    high: 88.2828,
    low: 83.9743,
    close: 87.9571,
    volume: 475109323,
  },
  {
    x: new Date('2012-08-06'),
    open: 88.1843,
    high: 89.2857,
    low: 87.8943,
    close: 88.8143,
    volume: 312826308,
  },
  {
    x: new Date('2012-08-13'),
    open: 89.0557,
    high: 92.5985,
    low: 89.0357,
    close: 92.5871,
    volume: 392867193,
  },
  {
    x: new Date('2012-08-20'),
    open: 92.8585,
    high: 96.4114,
    low: 92.5871,
    close: 94.746,
    volume: 708614692,
  },
  {
    x: new Date('2012-08-27'),
    open: 97.1414,
    high: 97.2671,
    low: 93.8928,
    close: 95.0343,
    volume: 383807217,
  },
  {
    x: new Date('2012-09-03'),
    open: 95.1085,
    high: 97.4971,
    low: 94.9285,
    close: 97.2057,
    volume: 355722047,
  },
  {
    x: new Date('2012-09-10'),
    open: 97.2071,
    high: 99.5685,
    low: 93.7143,
    close: 98.7543,
    volume: 724042207,
  },
  {
    x: new Date('2012-09-17'),
    open: 99.9071,
    high: 100.7243,
    low: 99.0885,
    close: 100.0135,
    volume: 500166040,
  },
  {
    x: new Date('2012-09-24'),
    open: 98.1228,
    high: 99.3028,
    low: 94.3357,
    close: 95.3007,
    volume: 714507994,
  },
  {
    x: new Date('2012-10-01'),
    open: 95.88,
    high: 96.6785,
    low: 92.95,
    close: 93.2271,
    volume: 638543622,
  },
  {
    x: new Date('2012-10-08'),
    open: 92.4114,
    high: 92.5085,
    low: 89.0785,
    close: 89.9591,
    volume: 747127724,
  },
  {
    x: new Date('2012-10-15'),
    open: 90.3357,
    high: 93.2557,
    low: 87.0885,
    close: 87.12,
    volume: 646996264,
  },
  {
    x: new Date('2012-10-22'),
    open: 87.4885,
    high: 90.7685,
    low: 84.4285,
    close: 86.2857,
    volume: 866040680,
  },
  {
    x: new Date('2012-10-29'),
    open: 84.9828,
    high: 86.1428,
    low: 82.1071,
    close: 82.4,
    volume: 367371310,
  },
  {
    x: new Date('2012-11-05'),
    open: 83.3593,
    high: 84.3914,
    low: 76.2457,
    close: 78.1514,
    volume: 919719846,
  },
  {
    x: new Date('2012-11-12'),
    open: 79.1643,
    high: 79.2143,
    low: 72.25,
    close: 75.3825,
    volume: 894382149,
  },
  {
    x: new Date('2012-11-19'),
    open: 77.2443,
    high: 81.7143,
    low: 77.1257,
    close: 81.6428,
    volume: 527416747,
  },
  {
    x: new Date('2012-11-26'),
    open: 82.2714,
    high: 84.8928,
    low: 81.7514,
    close: 83.6114,
    volume: 646467974,
  },
  {
    x: new Date('2012-12-03'),
    open: 84.8071,
    high: 84.9414,
    low: 74.09,
    close: 76.1785,
    volume: 980096264,
  },
  {
    x: new Date('2012-12-10'),
    open: 75,
    high: 78.5085,
    low: 72.2257,
    close: 72.8277,
    volume: 835016110,
  },
  {
    x: new Date('2012-12-17'),
    open: 72.7043,
    high: 76.4143,
    low: 71.6043,
    close: 74.19,
    volume: 726150329,
  },
  {
    x: new Date('2012-12-24'),
    open: 74.3357,
    high: 74.8928,
    low: 72.0943,
    close: 72.7984,
    volume: 321104733,
  },
  {
    x: new Date('2012-12-31'),
    open: 72.9328,
    high: 79.2857,
    low: 72.7143,
    close: 75.2857,
    volume: 540854882,
  },
  {
    x: new Date('2013-01-07'),
    open: 74.5714,
    high: 75.9843,
    low: 73.6,
    close: 74.3285,
    volume: 574594262,
  },
  {
    x: new Date('2013-01-14'),
    open: 71.8114,
    high: 72.9643,
    low: 69.0543,
    close: 71.4285,
    volume: 803105621,
  },
  {
    x: new Date('2013-01-21'),
    open: 72.08,
    high: 73.57,
    low: 62.1428,
    close: 62.84,
    volume: 971912560,
  },
  {
    x: new Date('2013-01-28'),
    open: 62.5464,
    high: 66.0857,
    low: 62.2657,
    close: 64.8028,
    volume: 656549587,
  },
  {
    x: new Date('2013-02-04'),
    open: 64.8443,
    high: 68.4014,
    low: 63.1428,
    close: 67.8543,
    volume: 743778993,
  },
  {
    x: new Date('2013-02-11'),
    open: 68.0714,
    high: 69.2771,
    low: 65.7028,
    close: 65.7371,
    volume: 585292366,
  },
  {
    x: new Date('2013-02-18'),
    open: 65.8714,
    high: 66.1043,
    low: 63.26,
    close: 64.4014,
    volume: 421766997,
  },
  {
    x: new Date('2013-02-25'),
    open: 64.8357,
    high: 65.0171,
    low: 61.4257,
    close: 61.4957,
    volume: 582741215,
  },
  {
    x: new Date('2013-03-04'),
    open: 61.1143,
    high: 62.2043,
    low: 59.8571,
    close: 61.6743,
    volume: 632856539,
  },
  {
    x: new Date('2013-03-11'),
    open: 61.3928,
    high: 63.4614,
    low: 60.7343,
    close: 63.38,
    volume: 572066981,
  },
  {
    x: new Date('2013-03-18'),
    open: 63.0643,
    high: 66.0143,
    low: 63.0286,
    close: 65.9871,
    volume: 552156035,
  },
  {
    x: new Date('2013-03-25'),
    open: 66.3843,
    high: 67.1357,
    low: 63.0886,
    close: 63.2371,
    volume: 390762517,
  },
  {
    x: new Date('2013-04-01'),
    open: 63.1286,
    high: 63.3854,
    low: 59.9543,
    close: 60.4571,
    volume: 505273732,
  },
  {
    x: new Date('2013-04-08'),
    open: 60.6928,
    high: 62.57,
    low: 60.3557,
    close: 61.4,
    volume: 387323550,
  },
  {
    x: new Date('2013-04-15'),
    open: 61,
    high: 61.1271,
    low: 55.0143,
    close: 55.79,
    volume: 709945604,
  },
  {
    x: new Date('2013-04-22'),
    open: 56.0914,
    high: 59.8241,
    low: 55.8964,
    close: 59.6007,
    volume: 787007506,
  },
  {
    x: new Date('2013-04-29'),
    open: 60.0643,
    high: 64.7471,
    low: 60,
    close: 64.2828,
    volume: 655020017,
  },
  {
    x: new Date('2013-05-06'),
    open: 65.1014,
    high: 66.5357,
    low: 64.3543,
    close: 64.71,
    volume: 545488533,
  },
  {
    x: new Date('2013-05-13'),
    open: 64.5014,
    high: 65.4143,
    low: 59.8428,
    close: 61.8943,
    volume: 633706550,
  },
  {
    x: new Date('2013-05-20'),
    open: 61.7014,
    high: 64.05,
    low: 61.4428,
    close: 63.5928,
    volume: 494379068,
  },
  {
    x: new Date('2013-05-27'),
    open: 64.2714,
    high: 65.3,
    low: 62.7714,
    close: 64.2478,
    volume: 362907830,
  },
  {
    x: new Date('2013-06-03'),
    open: 64.39,
    high: 64.9186,
    low: 61.8243,
    close: 63.1158,
    volume: 443249793,
  },
  {
    x: new Date('2013-06-10'),
    open: 63.5328,
    high: 64.1541,
    low: 61.2143,
    close: 61.4357,
    volume: 389680092,
  },
  {
    x: new Date('2013-06-17'),
    open: 61.6343,
    high: 62.2428,
    low: 58.3,
    close: 59.0714,
    volume: 400384818,
  },
  {
    x: new Date('2013-06-24'),
    open: 58.2,
    high: 58.38,
    low: 55.5528,
    close: 56.6471,
    volume: 519314826,
  },
  {
    x: new Date('2013-07-01'),
    open: 57.5271,
    high: 60.47,
    low: 57.3171,
    close: 59.6314,
    volume: 343878841,
  },
  {
    x: new Date('2013-07-08'),
    open: 60.0157,
    high: 61.3986,
    low: 58.6257,
    close: 60.93,
    volume: 384106977,
  },
  {
    x: new Date('2013-07-15'),
    open: 60.7157,
    high: 62.1243,
    low: 60.5957,
    close: 60.7071,
    volume: 286035513,
  },
  {
    x: new Date('2013-07-22'),
    open: 61.3514,
    high: 63.5128,
    low: 59.8157,
    close: 62.9986,
    volume: 395816827,
  },
  {
    x: new Date('2013-07-29'),
    open: 62.9714,
    high: 66.1214,
    low: 62.8857,
    close: 66.0771,
    volume: 339668858,
  },
  {
    x: new Date('2013-08-05'),
    open: 66.3843,
    high: 67.4128,
    low: 64.8071,
    close: 64.9214,
    volume: 368486781,
  },
  {
    x: new Date('2013-08-12'),
    open: 65.2657,
    high: 72.0357,
    low: 65.2328,
    close: 71.7614,
    volume: 711563584,
  },
  {
    x: new Date('2013-08-19'),
    open: 72.0485,
    high: 73.3914,
    low: 71.1714,
    close: 71.5743,
    volume: 417119660,
  },
  {
    x: new Date('2013-08-26'),
    open: 71.5357,
    high: 72.8857,
    low: 69.4286,
    close: 69.6023,
    volume: 392805888,
  },
  {
    x: new Date('2013-09-02'),
    open: 70.4428,
    high: 71.7485,
    low: 69.6214,
    close: 71.1743,
    volume: 317244380,
  },
  {
    x: new Date('2013-09-09'),
    open: 72.1428,
    high: 72.56,
    low: 66.3857,
    close: 66.4143,
    volume: 669376320,
  },
  {
    x: new Date('2013-09-16'),
    open: 65.8571,
    high: 68.3643,
    low: 63.8886,
    close: 66.7728,
    volume: 625142677,
  },
  {
    x: new Date('2013-09-23'),
    open: 70.8714,
    high: 70.9871,
    low: 68.6743,
    close: 68.9643,
    volume: 475274537,
  },
  {
    x: new Date('2013-09-30'),
    open: 68.1786,
    high: 70.3357,
    low: 67.773,
    close: 69.0043,
    volume: 368198906,
  },
  {
    x: new Date('2013-10-07'),
    open: 69.5086,
    high: 70.5486,
    low: 68.3257,
    close: 70.4017,
    volume: 361437661,
  },
  {
    x: new Date('2013-10-14'),
    open: 69.9757,
    high: 72.7514,
    low: 69.9071,
    close: 72.6985,
    volume: 342694379,
  },
  {
    x: new Date('2013-10-21'),
    open: 73.11,
    high: 76.1757,
    low: 72.5757,
    close: 75.1368,
    volume: 490458997,
  },
  {
    x: new Date('2013-10-28'),
    open: 75.5771,
    high: 77.0357,
    low: 73.5057,
    close: 74.29,
    volume: 508130174,
  },
  {
    x: new Date('2013-11-04'),
    open: 74.4428,
    high: 75.555,
    low: 73.1971,
    close: 74.3657,
    volume: 318132218,
  },
  {
    x: new Date('2013-11-11'),
    open: 74.2843,
    high: 75.6114,
    low: 73.4871,
    close: 74.9987,
    volume: 306711021,
  },
  {
    x: new Date('2013-11-18'),
    open: 74.9985,
    high: 75.3128,
    low: 73.3814,
    close: 74.2571,
    volume: 282778778,
  },
  {
    x: new Date('2013-11-25'),
    open: 74.4314,
    high: 79.7614,
    low: 74.4285,
    close: 79.4385,
    volume: 327405302,
  },
  {
    x: new Date('2013-12-02'),
    open: 79.7143,
    high: 82.1622,
    low: 78.6885,
    close: 80.0028,
    volume: 522055676,
  },
  {
    x: new Date('2013-12-09'),
    open: 80.1286,
    high: 81.5671,
    low: 79.0957,
    close: 79.2043,
    volume: 387271099,
  },
  {
    x: new Date('2013-12-16'),
    open: 79.2885,
    high: 80.377,
    low: 76.9714,
    close: 78.4314,
    volume: 457580848,
  },
  {
    x: new Date('2013-12-23'),
    open: 81.1428,
    high: 81.6971,
    low: 79.9285,
    close: 80.0128,
    volume: 274253503,
  },
  {
    x: new Date('2013-12-30'),
    open: 79.6371,
    high: 80.1828,
    low: 77.2043,
    close: 77.2828,
    volume: 275734934,
  },
  {
    x: new Date('2014-01-06'),
    open: 76.7785,
    high: 78.1228,
    low: 75.8728,
    close: 76.1343,
    volume: 393462075,
  },
  {
    x: new Date('2014-01-13'),
    open: 75.7014,
    high: 80.0285,
    low: 75.6971,
    close: 77.2385,
    volume: 439557459,
  },
  {
    x: new Date('2014-01-20'),
    open: 77.2843,
    high: 79.6128,
    low: 77.2028,
    close: 78.01,
    volume: 385585525,
  },
  {
    x: new Date('2014-01-27'),
    open: 78.5814,
    high: 79.2571,
    low: 70.5071,
    close: 71.5143,
    volume: 813702575,
  },
  {
    x: new Date('2014-02-03'),
    open: 71.8014,
    high: 74.7042,
    low: 71.3286,
    close: 74.24,
    volume: 434447570,
  },
  {
    x: new Date('2014-02-10'),
    open: 74.0943,
    high: 77.9971,
    low: 74,
    close: 77.7128,
    volume: 379011880,
  },
  {
    x: new Date('2014-02-17'),
    open: 78,
    high: 78.7414,
    low: 74.9428,
    close: 75.0357,
    volume: 289609443,
  },
  {
    x: new Date('2014-02-24'),
    open: 74.7357,
    high: 76.1071,
    low: 73.6571,
    close: 75.1771,
    volume: 367569649,
  },
  {
    x: new Date('2014-03-03'),
    open: 74.7743,
    high: 76.3928,
    low: 74.6871,
    close: 75.7771,
    volume: 275972640,
  },
  {
    x: new Date('2014-03-10'),
    open: 75.48,
    high: 77.0943,
    low: 74.7143,
    close: 74.9557,
    volume: 287729528,
  },
  {
    x: new Date('2014-03-17'),
    open: 75.3857,
    high: 76.6057,
    low: 75.0286,
    close: 76.1243,
    volume: 303531061,
  },
  {
    x: new Date('2014-03-24'),
    open: 76.9171,
    high: 78.4285,
    low: 76.3214,
    close: 76.6943,
    volume: 338387221,
  },
  {
    x: new Date('2014-03-31'),
    open: 77.0328,
    high: 77.64,
    low: 75.7971,
    close: 75.9743,
    volume: 245749459,
  },
  {
    x: new Date('2014-04-07'),
    open: 75.4314,
    high: 76.0343,
    low: 73.8771,
    close: 74.23,
    volume: 312008139,
  },
  {
    x: new Date('2014-04-14'),
    open: 74.5571,
    high: 75.3943,
    low: 73.0471,
    close: 74.9914,
    volume: 241209047,
  },
  {
    x: new Date('2014-04-21'),
    open: 75.0485,
    high: 81.7128,
    low: 74.8514,
    close: 81.7057,
    volume: 476651465,
  },
  {
    x: new Date('2014-04-28'),
    open: 81.8285,
    high: 85.6328,
    low: 81.7928,
    close: 84.6543,
    volume: 473712709,
  },
  {
    x: new Date('2014-05-05'),
    open: 84.3057,
    high: 86.3442,
    low: 82.9043,
    close: 83.6489,
    volume: 365535013,
  },
  {
    x: new Date('2014-05-12'),
    open: 83.9271,
    high: 85.3614,
    low: 83.6285,
    close: 85.3585,
    volume: 260931637,
  },
  {
    x: new Date('2014-05-19'),
    open: 85.4071,
    high: 87.8184,
    low: 85.3328,
    close: 87.7328,
    volume: 294298274,
  },
  {
    x: new Date('2014-05-26'),
    open: 87.9828,
    high: 92.0243,
    low: 87.9471,
    close: 90.4285,
    volume: 400232120,
  },
  {
    x: new Date('2014-06-02'),
    open: 90.5657,
    high: 93.0371,
    low: 88.9285,
    close: 92.2243,
    volume: 412158024,
  },
  {
    x: new Date('2014-06-09'),
    open: 92.7,
    high: 95.05,
    low: 90.88,
    close: 91.28,
    volume: 292422550,
  },
  {
    x: new Date('2014-06-16'),
    open: 91.51,
    high: 92.75,
    low: 90.9,
    close: 90.91,
    volume: 234325480,
  },
  {
    x: new Date('2014-06-23'),
    open: 91.32,
    high: 92,
    low: 89.65,
    close: 91.98,
    volume: 213712160,
  },
  {
    x: new Date('2014-06-30'),
    open: 92.1,
    high: 94.1,
    low: 92.09,
    close: 94.03,
    volume: 138936570,
  },
  {
    x: new Date('2014-07-07'),
    open: 94.14,
    high: 96.8,
    low: 93.52,
    close: 95.22,
    volume: 229782440,
  },
  {
    x: new Date('2014-07-14'),
    open: 95.86,
    high: 97.1,
    low: 92.57,
    close: 94.43,
    volume: 248104390,
  },
  {
    x: new Date('2014-07-21'),
    open: 94.99,
    high: 97.88,
    low: 93.72,
    close: 97.671,
    volume: 273021350,
  },
  {
    x: new Date('2014-07-28'),
    open: 97.82,
    high: 99.44,
    low: 94.81,
    close: 96.13,
    volume: 235868530,
  },
  {
    x: new Date('2014-08-04'),
    open: 96.37,
    high: 96.58,
    low: 93.28,
    close: 94.74,
    volume: 222522120,
  },
  {
    x: new Date('2014-08-11'),
    open: 95.27,
    high: 98.19,
    low: 94.8355,
    close: 97.98,
    volume: 178806580,
  },
  {
    x: new Date('2014-08-18'),
    open: 98.49,
    high: 101.47,
    low: 97.98,
    close: 101.32,
    volume: 246446280,
  },
  {
    x: new Date('2014-08-25'),
    open: 101.79,
    high: 102.9,
    low: 100.7,
    close: 102.5,
    volume: 232858250,
  },
  {
    x: new Date('2014-09-01'),
    open: 103.06,
    high: 103.74,
    low: 97.79,
    close: 98.97,
    volume: 322045910,
  },
  {
    x: new Date('2014-09-08'),
    open: 99.3,
    high: 103.08,
    low: 96.14,
    close: 101.66,
    volume: 460851840,
  },
  {
    x: new Date('2014-09-15'),
    open: 102.81,
    high: 103.05,
    low: 98.89,
    close: 100.96,
    volume: 296425730,
  },
  {
    x: new Date('2014-09-22'),
    open: 101.8,
    high: 102.94,
    low: 97.72,
    close: 100.75,
    volume: 337617850,
  },
  {
    x: new Date('2014-09-29'),
    open: 98.65,
    high: 101.54,
    low: 98.04,
    close: 99.62,
    volume: 246900230,
  },
  {
    x: new Date('2014-10-06'),
    open: 99.95,
    high: 102.38,
    low: 98.31,
    close: 100.73,
    volume: 279646740,
  },
  {
    x: new Date('2014-10-13'),
    open: 101.33,
    high: 101.78,
    low: 95.18,
    close: 97.67,
    volume: 356408760,
  },
  {
    x: new Date('2014-10-20'),
    open: 98.315,
    high: 105.49,
    low: 98.22,
    close: 105.22,
    volume: 355329760,
  },
  {
    x: new Date('2014-10-27'),
    open: 104.85,
    high: 108.04,
    low: 104.7,
    close: 108,
    volume: 219443560,
  },
  {
    x: new Date('2014-11-03'),
    open: 108.22,
    high: 110.3,
    low: 107.72,
    close: 109.01,
    volume: 199332700,
  },
  {
    x: new Date('2014-11-10'),
    open: 109.02,
    high: 114.19,
    low: 108.4,
    close: 114.18,
    volume: 203976340,
  },
  {
    x: new Date('2014-11-17'),
    open: 114.27,
    high: 117.57,
    low: 113.3,
    close: 116.47,
    volume: 232574480,
  },
  {
    x: new Date('2014-11-24'),
    open: 116.85,
    high: 119.75,
    low: 116.62,
    close: 118.93,
    volume: 181158620,
  },
  {
    x: new Date('2014-12-01'),
    open: 118.81,
    high: 119.25,
    low: 111.27,
    close: 115,
    volume: 266118290,
  },
  {
    x: new Date('2014-12-08'),
    open: 114.1,
    high: 114.85,
    low: 109.35,
    close: 109.73,
    volume: 259311140,
  },
  {
    x: new Date('2014-12-15'),
    open: 110.7,
    high: 113.24,
    low: 106.26,
    close: 111.78,
    volume: 326382400,
  },
  {
    x: new Date('2014-12-22'),
    open: 112.16,
    high: 114.52,
    low: 111.97,
    close: 113.99,
    volume: 119248900,
  },
  {
    x: new Date('2014-12-29'),
    open: 113.79,
    high: 114.77,
    low: 107.35,
    close: 109.33,
    volume: 151780640,
  },
  {
    x: new Date('2015-01-05'),
    open: 108.29,
    high: 113.25,
    low: 104.63,
    close: 112.01,
    volume: 282690970,
  },
  {
    x: new Date('2015-01-12'),
    open: 112.6,
    high: 112.8,
    low: 105.2,
    close: 105.99,
    volume: 303531140,
  },
  {
    x: new Date('2015-01-19'),
    open: 107.84,
    high: 113.75,
    low: 106.5,
    close: 112.98,
    volume: 198362640,
  },
  {
    x: new Date('2015-01-26'),
    open: 113.74,
    high: 120,
    low: 109.03,
    close: 117.16,
    volume: 461747290,
  },
  {
    x: new Date('2015-02-02'),
    open: 118.05,
    high: 120.51,
    low: 116.08,
    close: 118.93,
    volume: 270190470,
  },
  {
    x: new Date('2015-02-09'),
    open: 118.55,
    high: 127.48,
    low: 118.43,
    close: 127.08,
    volume: 301354470,
  },
  {
    x: new Date('2015-02-16'),
    open: 127.49,
    high: 129.5,
    low: 126.92,
    close: 129.495,
    volume: 193883960,
  },
  {
    x: new Date('2015-02-23'),
    open: 130.02,
    high: 133.6,
    low: 126.61,
    close: 128.46,
    volume: 369856960,
  },
  {
    x: new Date('2015-03-02'),
    open: 129.25,
    high: 130.28,
    low: 125.76,
    close: 126.6,
    volume: 246472020,
  },
  {
    x: new Date('2015-03-09'),
    open: 127.96,
    high: 129.57,
    low: 121.63,
    close: 123.59,
    volume: 325921230,
  },
  {
    x: new Date('2015-03-16'),
    open: 123.88,
    high: 129.2451,
    low: 122.87,
    close: 125.9,
    volume: 266016400,
  },
  {
    x: new Date('2015-03-23'),
    open: 127.12,
    high: 128.04,
    low: 122.6,
    close: 123.25,
    volume: 208731730,
  },
  {
    x: new Date('2015-03-30'),
    open: 124.05,
    high: 126.49,
    low: 123.1,
    close: 125.32,
    volume: 161628950,
  },
  {
    x: new Date('2015-04-06'),
    open: 124.47,
    high: 128.1218,
    low: 124.33,
    close: 127.1,
    volume: 181454510,
  },
  {
    x: new Date('2015-04-13'),
    open: 128.37,
    high: 128.57,
    low: 124.46,
    close: 124.75,
    volume: 170090870,
  },
  {
    x: new Date('2015-04-20'),
    open: 125.57,
    high: 130.63,
    low: 125.17,
    close: 130.28,
    volume: 206698310,
  },
  {
    x: new Date('2015-04-27'),
    open: 132.31,
    high: 134.54,
    low: 124.58,
    close: 128.95,
    volume: 417115180,
  },
  {
    x: new Date('2015-05-04'),
    open: 129.5,
    high: 130.57,
    low: 123.36,
    close: 127.62,
    volume: 270197900,
  },
  {
    x: new Date('2015-05-11'),
    open: 127.39,
    high: 129.49,
    low: 124.82,
    close: 128.77,
    volume: 207858180,
  },
  {
    x: new Date('2015-05-18'),
    open: 128.38,
    high: 132.97,
    low: 128.36,
    close: 132.54,
    volume: 216438970,
  },
  {
    x: new Date('2015-05-25'),
    open: 132.6,
    high: 132.91,
    low: 129.12,
    close: 130.28,
    volume: 197468800,
  },
  {
    x: new Date('2015-06-01'),
    open: 131.2,
    high: 131.39,
    low: 128.36,
    close: 128.65,
    volume: 170465550,
  },
  {
    x: new Date('2015-06-08'),
    open: 128.9,
    high: 130.18,
    low: 125.62,
    close: 127.17,
    volume: 219812710,
  },
  {
    x: new Date('2015-06-15'),
    open: 126.1,
    high: 128.31,
    low: 125.71,
    close: 126.6,
    volume: 197925030,
  },
  {
    x: new Date('2015-06-22'),
    open: 127.49,
    high: 129.8,
    low: 126.51,
    close: 126.75,
    volume: 195104520,
  },
  {
    x: new Date('2015-06-29'),
    open: 125.46,
    high: 126.94,
    low: 124.48,
    close: 126.44,
    volume: 150747530,
  },
  {
    x: new Date('2015-07-06'),
    open: 124.94,
    high: 126.23,
    low: 119.22,
    close: 123.28,
    volume: 274904180,
  },
  {
    x: new Date('2015-07-13'),
    open: 125.03,
    high: 129.62,
    low: 124.32,
    close: 129.62,
    volume: 188579340,
  },
  {
    x: new Date('2015-07-20'),
    open: 130.97,
    high: 132.97,
    low: 121.99,
    close: 124.5,
    volume: 336423370,
  },
  {
    x: new Date('2015-07-27'),
    open: 123.09,
    high: 123.91,
    low: 120.91,
    close: 121.3,
    volume: 191087840,
  },
  {
    x: new Date('2015-08-03'),
    open: 121.5,
    high: 122.57,
    low: 112.1,
    close: 115.52,
    volume: 383883210,
  },
  {
    x: new Date('2015-08-10'),
    open: 116.53,
    high: 119.99,
    low: 109.63,
    close: 115.96,
    volume: 344549090,
  },
  {
    x: new Date('2015-08-17'),
    open: 116.04,
    high: 117.65,
    low: 105.645,
    close: 105.76,
    volume: 318855760,
  },
  {
    x: new Date('2015-08-24'),
    open: 110.87,
    high: 113.31,
    low: 102.6,
    close: 113.29,
    volume: 498047270,
  },
  {
    x: new Date('2015-08-31'),
    open: 112.03,
    high: 114.53,
    low: 107.36,
    close: 109.27,
    volume: 297402060,
  },
  {
    x: new Date('2015-09-07'),
    open: 111.65,
    high: 114.21,
    low: 109.77,
    close: 114.21,
    volume: 251859600,
  },
  {
    x: new Date('2015-09-14'),
    open: 116.58,
    high: 116.89,
    low: 111.87,
    close: 113.45,
    volume: 276281980,
  },
  {
    x: new Date('2015-09-21'),
    open: 113.67,
    high: 116.69,
    low: 112.37,
    close: 114.71,
    volume: 238617740,
  },
  {
    x: new Date('2015-09-28'),
    open: 113.85,
    high: 114.57,
    low: 107.31,
    close: 110.38,
    volume: 313017610,
  },
  {
    x: new Date('2015-10-05'),
    open: 109.88,
    high: 112.28,
    low: 108.21,
    close: 112.12,
    volume: 261920950,
  },
  {
    x: new Date('2015-10-12'),
    open: 112.73,
    high: 112.75,
    low: 109.56,
    close: 111.04,
    volume: 184208970,
  },
  {
    x: new Date('2015-10-19'),
    open: 110.8,
    high: 119.228,
    low: 110.11,
    close: 119.08,
    volume: 221612230,
  },
  {
    x: new Date('2015-10-26'),
    open: 118.08,
    high: 121.22,
    low: 113.99,
    close: 119.5,
    volume: 319660750,
  },
  {
    x: new Date('2015-11-02'),
    open: 119.87,
    high: 123.82,
    low: 119.61,
    close: 121.06,
    volume: 194953700,
  },
  {
    x: new Date('2015-11-09'),
    open: 120.96,
    high: 121.81,
    low: 112.27,
    close: 112.34,
    volume: 216054740,
  },
  {
    x: new Date('2015-11-16'),
    open: 111.38,
    high: 119.92,
    low: 111,
    close: 119.3,
    volume: 189492500,
  },
  {
    x: new Date('2015-11-23'),
    open: 119.27,
    high: 119.73,
    low: 117.12,
    close: 117.81,
    volume: 109582040,
  },
  {
    x: new Date('2015-11-30'),
    open: 117.99,
    high: 119.41,
    low: 114.22,
    close: 119.03,
    volume: 205415620,
  },
  {
    x: new Date('2015-12-07'),
    open: 118.98,
    high: 119.86,
    low: 112.851,
    close: 113.18,
    volume: 188609110,
  },
  {
    x: new Date('2015-12-14'),
    open: 112.18,
    high: 112.8,
    low: 105.81,
    close: 106.03,
    volume: 314856190,
  },
  {
    x: new Date('2015-12-21'),
    open: 107.28,
    high: 109,
    low: 105.57,
    close: 108.03,
    volume: 126450510,
  },
  {
    x: new Date('2015-12-28'),
    open: 107.59,
    high: 109.43,
    low: 104.82,
    close: 105.26,
    volume: 123621760,
  },
  {
    x: new Date('2016-01-04'),
    open: 102.61,
    high: 105.85,
    low: 96.43,
    close: 96.96,
    volume: 343000960,
  },
  {
    x: new Date('2016-01-11'),
    open: 98.97,
    high: 101.19,
    low: 95.36,
    close: 97.13,
    volume: 303375940,
  },
  {
    x: new Date('2016-01-18'),
    open: 98.41,
    high: 101.46,
    low: 93.42,
    close: 101.42,
    volume: 242982970,
  },
  {
    x: new Date('2016-01-25'),
    open: 101.52,
    high: 101.53,
    low: 92.39,
    close: 97.34,
    volume: 376481100,
  },
  {
    x: new Date('2016-02-01'),
    open: 96.47,
    high: 97.33,
    low: 93.69,
    close: 94.02,
    volume: 216608840,
  },
  {
    x: new Date('2016-02-08'),
    open: 93.13,
    high: 96.35,
    low: 92.59,
    close: 93.99,
    volume: 230794620,
  },
  {
    x: new Date('2016-02-15'),
    open: 95.02,
    high: 98.89,
    low: 94.61,
    close: 96.04,
    volume: 167001070,
  },
  {
    x: new Date('2016-02-22'),
    open: 96.31,
    high: 98.0237,
    low: 93.32,
    close: 96.91,
    volume: 158759600,
  },
  {
    x: new Date('2016-02-29'),
    open: 96.86,
    high: 103.75,
    low: 96.65,
    close: 103.01,
    volume: 201482180,
  },
  {
    x: new Date('2016-03-07'),
    open: 102.39,
    high: 102.83,
    low: 100.15,
    close: 102.26,
    volume: 155437450,
  },
  {
    x: new Date('2016-03-14'),
    open: 101.91,
    high: 106.5,
    low: 101.78,
    close: 105.92,
    volume: 181323210,
  },
  {
    x: new Date('2016-03-21'),
    open: 105.93,
    high: 107.65,
    low: 104.89,
    close: 105.67,
    volume: 119054360,
  },
  {
    x: new Date('2016-03-28'),
    open: 106,
    high: 110.42,
    low: 104.88,
    close: 109.99,
    volume: 147641240,
  },
  {
    x: new Date('2016-04-04'),
    open: 110.42,
    high: 112.19,
    low: 108.121,
    close: 108.66,
    volume: 145351790,
  },
  {
    x: new Date('2016-04-11'),
    open: 108.97,
    high: 112.39,
    low: 108.66,
    close: 109.85,
    volume: 161518860,
  },
  {
    x: new Date('2016-04-18'),
    open: 108.89,
    high: 108.95,
    low: 104.62,
    close: 105.68,
    volume: 188775240,
  },
  {
    x: new Date('2016-04-25'),
    open: 105,
    high: 105.65,
    low: 92.51,
    close: 93.74,
    volume: 345910030,
  },
  {
    x: new Date('2016-05-02'),
    open: 93.965,
    high: 95.9,
    low: 91.85,
    close: 92.72,
    volume: 225114110,
  },
  {
    x: new Date('2016-05-09'),
    open: 93,
    high: 93.77,
    low: 89.47,
    close: 90.52,
    volume: 215596350,
  },
  {
    x: new Date('2016-05-16'),
    open: 92.39,
    high: 95.43,
    low: 91.65,
    close: 95.22,
    volume: 212312980,
  },
  {
    x: new Date('2016-05-23'),
    open: 95.87,
    high: 100.73,
    low: 95.67,
    close: 100.35,
    volume: 203902650,
  },
  {
    x: new Date('2016-05-30'),
    open: 99.6,
    high: 100.4,
    low: 96.63,
    close: 97.92,
    volume: 140064910,
  },
  {
    x: new Date('2016-06-06'),
    open: 97.99,
    high: 101.89,
    low: 97.55,
    close: 98.83,
    volume: 124731320,
  },
  {
    x: new Date('2016-06-13'),
    open: 98.69,
    high: 99.12,
    low: 95.3,
    close: 95.33,
    volume: 191017280,
  },
  {
    x: new Date('2016-06-20'),
    open: 96,
    high: 96.89,
    low: 92.65,
    close: 93.4,
    volume: 206149160,
  },
  {
    x: new Date('2016-06-27'),
    open: 93,
    high: 96.465,
    low: 91.5,
    close: 95.89,
    volume: 184254460,
  },
  {
    x: new Date('2016-07-04'),
    open: 95.39,
    high: 96.89,
    low: 94.37,
    close: 96.68,
    volume: 111769640,
  },
  {
    x: new Date('2016-07-11'),
    open: 96.75,
    high: 99.3,
    low: 96.73,
    close: 98.78,
    volume: 142244590,
  },
  {
    x: new Date('2016-07-18'),
    open: 98.7,
    high: 101,
    low: 98.31,
    close: 98.66,
    volume: 147358320,
  },
  {
    x: new Date('2016-07-25'),
    open: 98.25,
    high: 104.55,
    low: 96.42,
    close: 104.21,
    volume: 252358930,
  },
  {
    x: new Date('2016-08-01'),
    open: 104.41,
    high: 107.65,
    low: 104,
    close: 107.48,
    volume: 168265830,
  },
  {
    x: new Date('2016-08-08'),
    open: 107.52,
    high: 108.94,
    low: 107.16,
    close: 108.18,
    volume: 124255340,
  },
  {
    x: new Date('2016-08-15'),
    open: 108.14,
    high: 110.23,
    low: 108.08,
    close: 109.36,
    volume: 131814920,
  },
  {
    x: new Date('2016-08-22'),
    open: 108.86,
    high: 109.32,
    low: 106.31,
    close: 106.94,
    volume: 123373540,
  },
  {
    x: new Date('2016-08-29'),
    open: 106.62,
    high: 108,
    low: 105.5,
    close: 107.73,
    volume: 134426100,
  },
  {
    x: new Date('2016-09-05'),
    open: 107.9,
    high: 108.76,
    low: 103.13,
    close: 103.13,
    volume: 168312530,
  },
  {
    x: new Date('2016-09-12'),
    open: 102.65,
    high: 116.13,
    low: 102.53,
    close: 114.92,
    volume: 388543710,
  },
  {
    x: new Date('2016-09-19'),
    open: 115.19,
    high: 116.18,
    low: 111.55,
    close: 112.71,
    volume: 200842480,
  },
  {
    x: new Date('2016-09-26'),
    open: 111.64,
    high: 114.64,
    low: 111.55,
    close: 113.05,
    volume: 156186800,
  },
  {
    x: new Date('2016-10-03'),
    open: 112.71,
    high: 114.56,
    low: 112.28,
    close: 114.06,
    volume: 125587350,
  },
  {
    x: new Date('2016-10-10'),
    open: 115.02,
    high: 118.69,
    low: 114.72,
    close: 117.63,
    volume: 208231690,
  },
  {
    x: new Date('2016-10-17'),
    open: 117.33,
    high: 118.21,
    low: 113.8,
    close: 116.6,
    volume: 114497020,
  },
  {
    x: new Date('2016-10-24'),
    open: 117.1,
    high: 118.36,
    low: 113.31,
    close: 113.72,
    volume: 204530120,
  },
  {
    x: new Date('2016-10-31'),
    open: 113.65,
    high: 114.23,
    low: 108.11,
    close: 108.84,
    volume: 155287280,
  },
  {
    x: new Date('2016-11-07'),
    open: 110.08,
    high: 111.72,
    low: 105.83,
    close: 108.43,
    volume: 206825070,
  },
  {
    x: new Date('2016-11-14'),
    open: 107.71,
    high: 110.54,
    low: 104.08,
    close: 110.06,
    volume: 197790040,
  },
  {
    x: new Date('2016-11-21'),
    open: 110.12,
    high: 112.42,
    low: 110.01,
    close: 111.79,
    volume: 93992370,
  },
  {
    x: new Date('2016-11-28'),
    open: 111.43,
    high: 112.465,
    low: 108.85,
    close: 109.9,
    volume: 155229390,
  },
  {
    x: new Date('2016-12-05'),
    open: 110,
    high: 114.7,
    low: 108.25,
    close: 113.95,
    volume: 151624650,
  },
  {
    x: new Date('2016-12-12'),
    open: 113.29,
    high: 116.73,
    low: 112.49,
    close: 115.97,
    volume: 194003220,
  },
  {
    x: new Date('2016-12-19'),
    open: 115.8,
    high: 117.5,
    low: 115.59,
    close: 116.52,
    volume: 113106370,
  },
  {
    x: new Date('2016-12-26'),
    open: 116.52,
    high: 118.0166,
    low: 115.43,
    close: 115.82,
    volume: 84354060,
  },
  {
    x: new Date('2017-01-02'),
    open: 115.8,
    high: 118.16,
    low: 114.76,
    close: 117.91,
    volume: 103680760,
  },
  {
    x: new Date('2017-01-09'),
    open: 117.95,
    high: 119.93,
    low: 117.94,
    close: 119.04,
    volume: 138446660,
  },
  {
    x: new Date('2017-01-16'),
    open: 118.34,
    high: 120.5,
    low: 118.22,
    close: 120,
    volume: 113576380,
  },
  {
    x: new Date('2017-01-23'),
    open: 120,
    high: 122.44,
    low: 119.5,
    close: 121.95,
    volume: 124406640,
  },
  {
    x: new Date('2017-01-30'),
    open: 120.93,
    high: 130.49,
    low: 120.62,
    close: 129.08,
    volume: 248063580,
  },
  {
    x: new Date('2017-02-06'),
    open: 129.13,
    high: 132.94,
    low: 128.9,
    close: 132.12,
    volume: 136252280,
  },
  {
    x: new Date('2017-02-13'),
    open: 133.08,
    high: 136.27,
    low: 132.75,
    close: 135.72,
    volume: 136326260,
  },
  {
    x: new Date('2017-02-20'),
    open: 136.23,
    high: 137.48,
    low: 135.28,
    close: 136.66,
    volume: 87773190,
  },
  {
    x: new Date('2017-02-27'),
    open: 137.14,
    high: 140.2786,
    low: 136.28,
    close: 139.78,
    volume: 127757050,
  },
  {
    x: new Date('2017-03-06'),
    open: 139.365,
    high: 139.98,
    low: 137.05,
    close: 139.14,
    volume: 99061270,
  },
  {
    x: new Date('2017-03-13'),
    open: 138.85,
    high: 141.02,
    low: 138.82,
    close: 139.99,
    volume: 120881720,
  },
  {
    x: new Date('2017-03-20'),
    open: 140.4,
    high: 142.8,
    low: 139.73,
    close: 140.64,
    volume: 129178500,
  },
  {
    x: new Date('2017-03-27'),
    open: 139.39,
    high: 144.5,
    low: 138.62,
    close: 143.66,
    volume: 126819590,
  },
  {
    x: new Date('2017-04-03'),
    open: 143.71,
    high: 145.46,
    low: 143.05,
    close: 143.34,
    volume: 105274540,
  },
  {
    x: new Date('2017-04-10'),
    open: 143.6,
    high: 143.8792,
    low: 140.06,
    close: 141.05,
    volume: 87342130,
  },
  {
    x: new Date('2017-04-17'),
    open: 141.48,
    high: 142.92,
    low: 140.45,
    close: 142.27,
    volume: 89092650,
  },
  {
    x: new Date('2017-04-24'),
    open: 143.5,
    high: 144.9,
    low: 143.18,
    close: 143.65,
    volume: 90423600,
  },
  {
    x: new Date('2017-05-01'),
    open: 145.1,
    high: 148.98,
    low: 144.27,
    close: 148.96,
    volume: 173861760,
  },
  {
    x: new Date('2017-05-08'),
    open: 149.03,
    high: 156.42,
    low: 149.03,
    close: 156.1,
    volume: 173087500,
  },
  {
    x: new Date('2017-05-15'),
    open: 156.01,
    high: 156.65,
    low: 149.71,
    close: 153.06,
    volume: 156993820,
  },
  {
    x: new Date('2017-05-22'),
    open: 154,
    high: 154.9,
    low: 152.67,
    close: 153.61,
    volume: 103151450,
  },
  {
    x: new Date('2017-05-29'),
    open: 153.42,
    high: 155.45,
    low: 152.22,
    close: 155.45,
    volume: 88670120,
  },
  {
    x: new Date('2017-06-05'),
    open: 154.34,
    high: 155.98,
    low: 146.02,
    close: 148.98,
    volume: 158814040,
  },
  {
    x: new Date('2017-06-12'),
    open: 145.74,
    high: 147.5,
    low: 142.2,
    close: 142.27,
    volume: 219638930,
  },
  {
    x: new Date('2017-06-19'),
    open: 143.66,
    high: 147.16,
    low: 143.66,
    close: 146.28,
    volume: 132832660,
  },
  {
    x: new Date('2017-06-26'),
    open: 147.17,
    high: 148.28,
    low: 142.28,
    close: 144.02,
    volume: 126890110,
  },
  {
    x: new Date('2017-07-03'),
    open: 144.88,
    high: 145.3001,
    low: 142.41,
    close: 144.18,
    volume: 78465450,
  },
  {
    x: new Date('2017-07-10'),
    open: 144.11,
    high: 149.33,
    low: 143.37,
    close: 149.04,
    volume: 109759170,
  },
  {
    x: new Date('2017-07-17'),
    open: 148.82,
    high: 151.74,
    low: 148.57,
    close: 150.27,
    volume: 104744470,
  },
  {
    x: new Date('2017-07-24'),
    open: 150.58,
    high: 153.99,
    low: 147.3,
    close: 149.5,
    volume: 105536280,
  },
  {
    x: new Date('2017-07-31'),
    open: 149.9,
    high: 159.75,
    low: 148.13,
    close: 156.39,
    volume: 170204830,
  },
  {
    x: new Date('2017-08-07'),
    open: 157.06,
    high: 161.83,
    low: 154.63,
    close: 157.48,
    volume: 149860480,
  },
  {
    x: new Date('2017-08-14'),
    open: 159.32,
    high: 162.51,
    low: 156.72,
    close: 157.5,
    volume: 133829670,
  },
  {
    x: new Date('2017-08-21'),
    open: 157.5,
    high: 160.74,
    low: 155.1101,
    close: 159.86,
    volume: 112238670,
  },
  {
    x: new Date('2017-08-28'),
    open: 160.14,
    high: 164.94,
    low: 159.93,
    close: 164.05,
    volume: 125610990,
  },
  {
    x: new Date('2017-09-04'),
    open: 163.75,
    high: 164.25,
    low: 158.53,
    close: 158.63,
    volume: 101419110,
  },
  {
    x: new Date('2017-09-11'),
    open: 160.5,
    high: 163.96,
    low: 157.91,
    close: 159.88,
    volume: 220431100,
  },
  {
    x: new Date('2017-09-18'),
    open: 160.11,
    high: 160.5,
    low: 157.995,
    close: 158.67,
    volume: 27939544,
  },
];
export const PyramidData = [
  { x: 'Sweet Treats', y: 120, text: '120 cal' },
  { x: 'Milk, Youghnut, Cheese', y: 435, text: '435 cal' },
  { x: 'Vegetables', y: 470, text: '470 cal' },
  { x: 'Meat, Poultry, Fish', y: 475, text: '475 cal' },
  { x: 'Fruits', y: 520, text: '520 cal' },
  { x: 'Bread, Rice, Pasta', y: 930, text: '930 cal' },
];
