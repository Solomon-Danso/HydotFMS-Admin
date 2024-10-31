import React, { useEffect, useState } from 'react'
import { LoginPage,LoginWrap,LoginDiv,AppName, SchoolLogo, AppDesc, HDSS_Form, FormInput, HDSS_Label, Button } from '../data/Styles'

import { useNavigate } from 'react-router-dom'
import { AES, enc } from 'crypto-js';
import logo from "../data/HydotLogo.png"
import {Show} from "../data/Alerts"
import {apiServer} from "../data/Endpoint"
import { colors } from '../data/Colors';


const Login = () => {

  const navigate = useNavigate();

  

  
  
const [a,sa] = useState("")

const handleSubmit = async () => {

    const userId = sessionStorage.getItem('UserId');

  Show.showLoading("Processing Data");
    try {

const formData = new FormData()
formData.append("Email", userId)
formData.append("token", a)
//console.table(formData)
  
      const response = await fetch(apiServer+"VerifyToken", {
        method: "POST",
        body:formData
      });

      const data = await response.json();
  
      if (response.ok) {
        
        Show.hideLoading();

        Show.Success("Login Successfull ");
          sessionStorage.setItem("userDataEnc", AES.encrypt(JSON.stringify(data.message), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString()); 
          sessionStorage.removeItem("UserId");         

            
        navigate("/main/DashBoard")
        
      } else {
        Show.Attention("Login Failed");
        navigate("/")
      }
    } catch (error) {

      Show.Attention("An error has occurred");
      navigate("/")
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
            Sign in to your account
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

         

          <Button
          background={colors.primary}
          color="white"
          border={colors.primary}
          style={{ marginTop: 25, width: "100%", }}
          onClick={()=>{handleSubmit()}}
          >

          Sign in
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

export default Login