import React, { useEffect, useState } from 'react';
import "./Website.css";
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from '../../data/Profile';

import { useNavigate } from 'react-router-dom';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { Header } from '../../components';


const Subscribe = () => {
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
  
const [amount, setAmount] = useState(0)




const navigate = useNavigate()






const handleCreateClientApiServerURL= async () => {


Show.showLoading("Processing Data");
  try {

const formData = new FormData()
formData.append("amount", amount)


    const response = await fetch(apiServer+"SubscriptionPayment", {
      method: "POST",
      body:formData
    });

    const data = await response.json();
 

    if (response.ok) {
      
      Show.hideLoading();

      Show.Success(data.message);
      // window.location.reload()
      
    } else {
      Show.Attention(data.message);
    }
  } catch (error) {

    Show.Attention("An error has occured");
   
  }

}

const [SubDetails, setSubDetails] = useState({})

useEffect(()=>{
    fetch(apiServer+"SubscriptionDetails",{
      method:"POST",

    })
    .then(res => res.json())
    .then(data => setSubDetails(data))
    .catch(error => console.error(error))
  },[])


  


  return (
    <div>
      <Header category="System Operations" title="Subscription" />

      <div className="wwd-column">
        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Subscription </div>

          <AdmitStudentRole>
            <div>
            <FormLable style={{ color: localStorage.getItem("colorMode") }}>Subscription Expires In: <b>{SubDetails.DaysLeft} {SubDetails.DaysLeft>1?" days":" day"}</b> </FormLable>
            <FormLable style={{ color: localStorage.getItem("colorMode") }}>Expire Date: <b>{SubDetails.ExpiryDate}</b></FormLable>
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Enter Subscription Amount</FormLable>
              <FormInputStudent
                type="number"
                required
                placeholder=""
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

          </AdmitStudentRole>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={()=>{ handleCreateClientApiServerURL()}}       
            >Pay
          </AdmitButton3>


        </div>
      </div>





    </div>
  );
}

export default Subscribe;
