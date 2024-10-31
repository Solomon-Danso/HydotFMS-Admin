import React, { useEffect, useState } from 'react'
import { LoginPage,LoginWrap,LoginDiv,AppName, SchoolLogo, AppDesc, HDSS_Form, FormInput, HDSS_Label, Button } from '../data/Styles'

import { useNavigate } from 'react-router-dom'
import { AES, enc } from 'crypto-js';
import logo from "../data/HydotLogo.png"
import {Show} from "../data/Alerts"
import {apiServer} from "../data/Endpoint"
import { colors } from '../data/Colors';

const ForgetPasswordStep2 = () => {

  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [userPassword, setuserPassword] = useState("")
  const [Teach, setTeach] = useState("")
  const [admin, setadmin] = useState("")
  

  
 
const [a,sa] = useState("")
const [b,sb] = useState("")


const SubMit = async () =>{

  try{
    const formData = new FormData();
   
    formData.append("Email",sessionStorage.getItem("UserId"))
    formData.append("token",a)
    formData.append("Password",b)
    
    
    Show.showLoading("Processing Data")

    const response = await fetch(apiServer+"ForgetPasswordStep2", {
      method: "POST",
      body: formData,
    });

    

    const data = await response.json();
    if(response.ok){
      Show.hideLoading();

        Show.Success(data.message);
        sessionStorage.removeItem("UserId");
         
        navigate("/")
    }
    else{
      Show.Attention(data.message);
    }


  }
  
  catch(e){
    Show.Attention("An error has occurred")
  }




}


















  return (
   <LoginPage>

<LoginWrap>

<LoginDiv background={colors.primary} flex={0.55} hide={true}>
      
      <img
        src={logo}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          top:0

        }}
        alt="Introduction"
      />

    </LoginDiv>



        <LoginDiv background={"white"} flex={0.45} hide={false}>
      
        <SchoolLogo
            src={logo}
            alt="icon"
            style={{ width: 65, height: 65 }}
          />
          <AppDesc style={{ color: "black", marginTop: 20, marginBottom: 50 }}>
            Change your account password
          </AppDesc>

          <HDSS_Form
          
          style={{ fontSize: 12 }}
          >
            <HDSS_Label>Enter Your Verification Code *</HDSS_Label>
           
           <FormInput
             type="text"
             required
             placeholder="XXXXX"
             onChange={(e) => sa(e.target.value)}
             style={{ marginBottom: 25 }}
           />


          <HDSS_Label>Password *</HDSS_Label>
           
           <FormInput
             type="password"
             required
             placeholder="....."
             onChange={(e) => sb(e.target.value)}
             style={{ marginBottom: 25 }}
           />

        

          <Button
          color="white"
         
          style={{ marginTop: 25, width: "100%", }}
          onClick={()=>{SubMit()}}
          >

          Verify
          </Button>

          </HDSS_Form>




          <p style={{ textAlign: "center", fontSize: 10, color: "gray", marginTop:"10vh"}}>
            Hydot Tech Admin Portal © {new Date().getFullYear()} All rights
            reserved.
          </p>
          <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
            v.1.1.1
          </p>


        </LoginDiv>

      

</LoginWrap>





   </LoginPage>
  )
}

export default ForgetPasswordStep2