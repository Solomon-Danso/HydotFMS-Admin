import React, { useState, useEffect } from 'react';
import "./carts.css";
import { useNavigate, useParams } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import { apiMedia, apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';
import { AdmitButton3, AdmitStudentRole, FormInputPassword, FormInputStudent, FormLable } from '../../data/Profile';
import Selector from '../../data/Selector';
import Modal from './Modal';

const CustomerDeliverDetails = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [OrderList, setOrderList] = useState([]);
  const [deliState, setDeliState] = useState(false);

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

    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
      setUserInfo(parsedData);
    } catch (error) {
      navigate("/");
    }
  }, []);


  const {orderId} = useParams()
  const {deliveryId} = useParams()

const [deliveryInfo, setDeliveryInfo] = useState({})

  useEffect(() => {
    if (userInfo.UserId && orderId ) {
      const formData = new FormData();
      formData.append("AdminId", userInfo.UserId);
      formData.append("OrderId", orderId);

      fetch(apiServer + "DetailedAllOrder", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        setOrderList(Array.isArray(data) ? data : []);
        setDeliveryInfo(data[0])
      })
      .catch(err => console.error(err));
    }
  }, [userInfo]);




 
  const [Password, setPassword] = useState("");






  const handleCreateAdmin = async () => {
    Show.showLoading("Processing Data");
    try {
      const formData = new FormData();
      formData.append("AdminId", userInfo.UserId);
      formData.append("OrderId", orderId);
      formData.append("Password", Password);

      const response = await fetch(apiServer + "DeliverNow", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        Show.hideLoading();
        Show.Success(data.message);
        navigate("/main/customerDelivery")
        window.location.reload();
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
      Show.Attention("An error has occurred");
    }
  };

  const handleGoogle = async () => {
    Show.showLoading("Routing to location....");
    try {
      const formData = new FormData();
      formData.append("OrderId", orderId);
  
      const response = await fetch(apiServer + "UseGoogleMap", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Show.Success("Location will be opened in a new tab");
        window.open(data.Link, '_blank');  // Opens in a new tab
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
      Show.Attention("An error has occurred");
    }
  };
  

  const [custInfo, setCustInfo] = useState({})

  useEffect(() => {
    if (userInfo.UserId && deliveryInfo.UserId) {
      const formData = new FormData();
      formData.append("AdminId", userInfo.UserId);
      formData.append("UserId", deliveryInfo.UserId);

      fetch(apiServer + "AdminViewSingleCustomer", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        setCustInfo(data)
      })
      .catch(err => console.error(err));
    }
  }, [userInfo,deliveryInfo]);


  
  const subtotal = Array.isArray(OrderList) 
    ? OrderList.reduce((sum, item) => sum + item.Price*item.Quantity, 0).toFixed(2)
    : "0.00";
  const currency = "GHS";
  const subtotalNumber = parseFloat(subtotal); // Convert subtotal to a number
  const shipping = (0.08 * subtotalNumber).toFixed(2);
  const tax = (0.01 * subtotalNumber).toFixed(2);
  const total = (subtotalNumber + parseFloat(shipping) + parseFloat(tax)).toFixed(2);




  return (
    <div style={{ marginTop: "6rem" }}>
      <div className="cart">
        <div className="left">
          {OrderList.map((data, i) => (
            <div key={i} className="left-card">
              <div className="left-card-part1">
                <div className="left-card-1">
                  <img src={apiMedia+data.Picture} alt={data.Title} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.5rem" }}>{data.Title}</span>
                    <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
                      <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}>Size {data.Size}</span>
                      <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}>Quantity {data.Quantity}</span>
                    </div>
                   
                  </div>
                </div>
              
              </div>
            </div>
          ))}
        </div>


        <Modal isOpen={deliState}>
          <div className="modal-content">
            <h1>Delivery Information</h1>
            <div>
                  
         
         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Customer:</b> {custInfo.Username},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Phone:</b> {custInfo.Phone},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Email:</b> {custInfo.Email},</span>
         </div>
        
        
         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Country:</b> {deliveryInfo.Country},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Region:</b> {deliveryInfo.Region},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>City:</b> {deliveryInfo.City},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Digital Address:</b> {deliveryInfo.DigitalAddress},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Detailed:</b> {deliveryInfo.DetailedAddress},</span>
         </div>
         
         <hr />

         <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Enter Password</FormLable>
              <FormInputPassword
               type="text"

               placeholder=""
               onChange={(e) => setPassword(e.target.value)}
               
              />
            </div>


    
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

            <button className="close-button" onClick={() => setDeliState(false)}>
              Close
            </button>

            <button className="confirm-button"  onClick={()=>{ handleCreateAdmin()}}>
            Confirm
            </button>



            </div>
            
          </div>
        </Modal>



        <div className="right">
         


          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ setDeliState(true)}}
            
            >View Details
          </AdmitButton3>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleGoogle()}}
            
            >Show Direction
          </AdmitButton3>
        
        
        </div>



      </div>
    </div>
  );
};

export default CustomerDeliverDetails;
