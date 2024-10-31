import React, { useState, useEffect } from 'react';
import "./carts.css";
import { useNavigate, useParams } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import { apiMedia, apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';
import { AdmitButton3, AdmitStudentRole, FormInputPassword, FormInputStudent, FormLable } from '../../data/Profile';
import Selector from '../../data/Selector';
import Modal from '../Delivery/Modal';

const CreditSalesDetaills = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [OrderList, setOrderList] = useState([]);
  const [payInfo, setpayInfo] = useState({});

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
  }, [navigate]);


  const {orderId} = useParams()
  const {referenceId} = useParams()
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





  const [deadline, setDeadline] = useState("")
  const [session, setSession] = useState(4)


  const handleCreateAdmin = async () => {
    if(!deadline){
        Show.Attention("Deadline is required")
    }
    Show.showLoading("Processing Data");
    try {

      const formData = new FormData();
      formData.append("AdminId", userInfo.UserId);
      formData.append("ReferenceId", referenceId);
      formData.append("Deadline", deadline);
      formData.append("Sessions", session);

      

      const response = await fetch(apiServer + "AcceptCreditSales", {
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
     navigate("/main/creditSales")
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
      Show.Attention("An error has occurred");
    }
  };

  useEffect(() => {
    if (userInfo.UserId && orderId ) {
      const formData = new FormData();
      formData.append("AdminId", userInfo.UserId);
      formData.append("ReferenceId", referenceId);

      fetch(apiServer + "ViewSingleAwaitingCreditSales", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        setpayInfo(data || {}); // Use an empty object as a fallback if no data is returned
      })
      .catch(err => console.error(err));
    }
  }, [userInfo, orderId]);


  
  const subtotal = Array.isArray(OrderList) 
  ? OrderList.reduce((sum, item) => sum + item.Price * item.Quantity, 0).toFixed(2)
  : "0.00";

const currency = "GHS";
const subtotalNumber = parseFloat(subtotal); // Convert subtotal to a number
const shipping = (payInfo.CreditAmount && !isNaN(payInfo.CreditAmount) 
  ? (payInfo.CreditAmount - subtotalNumber).toFixed(2) 
  : "0.00");
const total = (payInfo.CreditAmount && !isNaN(payInfo.CreditAmount) 
  ? parseFloat(payInfo.CreditAmount).toFixed(2) 
  : "0.00");

  const [deliState, setDeliState] = useState(false);

  const handleConfirmation = () =>{
    if(!deadline){
        Show.Attention("Deadline is required")
    }
    Show.Confirm("Do you want to Confirm this Credit Sale ", handleCreateAdmin);
  }




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
            <h1>User Profile</h1>


        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>FullName:</b> {payInfo.FullName},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Email:</b> {payInfo.Email},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>Phone:</b> {payInfo.Phone},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>NationalID Type:</b> {payInfo.NationalIDType},</span>
         </div>

         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0.5rem" }}>
           <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}><b>NationalID:</b> {payInfo.NationalID},</span>
         </div>

         <hr/>
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



         <img src={apiMedia+payInfo.UserPic} alt="Preview" style={{ width: "100%", maxHeight: "400px", marginBottom:"1rem" }} />
         <img src={apiMedia+payInfo.IDFront} alt="Preview" style={{ width: "100%", maxHeight: "400px", marginBottom:"1rem" }} />
         <img src={apiMedia+payInfo.IDBack} alt="Preview" style={{ width: "100%", maxHeight: "400px", marginBottom:"1rem" }} />

         <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Sessions</FormLable>
              <FormInputStudent
               type="number"
               required
               placeholder=""  
               onChange={(e)=>{setSession(e.target.value)}}
               
              />
            </div>

         <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Deadline</FormLable>
              <FormInputStudent
               type="datetime-local"
               required
               placeholder=""  
               onChange={(e)=>{setDeadline(e.target.value)}}
               
              />
            </div>
          



            <div>
                  
         
        
         
         <hr />

        

    
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

            <button className="close-button" onClick={() => setDeliState(false)}>
              Close
            </button>

            <button className="confirm-button"  onClick={()=>{ handleConfirmation()}}>
            Confirm
            </button>



            </div>
            
          </div>
        </Modal>



        <div className="right">
          <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.5rem" }}>Summary</span>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem" }}>
            <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}>Subtotal</span>
            <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}>{currency} {subtotal}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem" }}>
            <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}>Delivery Fee</span>
            <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}>{currency} {shipping}</span>
          </div>
          <hr />
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1rem" }}>
            <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}>Total</span>
            <span style={{ fontWeight: 500, color: localStorage.getItem("colorMode"), fontSize: "1.2rem" }}>{currency} {total}</span>
          </div>
          <hr />

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginTop: "1rem" }}
            onClick={()=>{ setDeliState(true)}}
            
            >View Profile
          </AdmitButton3>

        
              
        </div>






      </div>
    </div>
  );
};

export default CreditSalesDetaills;
