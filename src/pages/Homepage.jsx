import React, { useEffect, useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai'; // Importing the install icon
import { 
  LoginPage, LoginWrap, LoginDiv, AppName, 
  SchoolLogo, AppDesc, HDSS_Form, FormInput, 
  HDSS_Label, Button 
} from '../data/Styles';
import { useNavigate } from 'react-router-dom';
import { Show } from "../data/Alerts";
import logo from "../data/HydotLogo.png";
import { apiServer } from "../data/Endpoint";
import { colors } from '../data/Colors';

const Login = () => {
  const navigate = useNavigate();

  const [a, sa] = useState("");
  const [b, sb] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event); // Save the event for later
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null); // Clear the saved event
    } else {
      Show.Attention("App already installed");
    }
  };

  const SubMit = async () => {
    try {
      const formData = new FormData();
      formData.append("Email", a);
      formData.append("Password", b);

      Show.showLoading("Processing Data");

      const response = await fetch(apiServer + "LogIn", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Show.hideLoading();
        Show.Success("Enter Your Verification Code");
        sessionStorage.setItem("UserId", data.message);
        navigate("/verify");
      } else {
        Show.Attention(data.message);
        if (data.status === "SUBSCRIPTION_EXPIRED") {
          navigate("/subscribe");
        }
      }
    } catch (e) {
      Show.Attention("An error has occurred");
    }
  };

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
              top: 0
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

          <HDSS_Form style={{ fontSize: 12 }}>
            <HDSS_Label>Email Address *</HDSS_Label>
            <FormInput
              type="email"
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

            <HDSS_Label onClick={() => { navigate("/forget-password-step-1") }}>
              Forget Password?
            </HDSS_Label>

            <Button
              color="white"
              style={{ marginTop: 25, width: "100%" }}
              onClick={() => { SubMit() }}
            >
              Sign in
            </Button>
          </HDSS_Form>

          {/* Install App Button */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <AiOutlineDownload 
              onClick={handleInstallClick} 
              size={30} 
              style={{ cursor: 'pointer', color: colors.primary }} 
              title="Install App"
            />
            <p style={{ fontSize: 12, color: "gray", marginTop: 10 }}>
              Install App
            </p>
          </div>

          <p style={{ textAlign: "center", fontSize: 10, color: "gray", marginTop: "10vh" }}>
            Hydot Tech Admin Portal © {new Date().getFullYear()} All rights reserved.
          </p>
          <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
            v.1.1.1
          </p>
        </LoginDiv>
      </LoginWrap>
    </LoginPage>
  );
};

export default Login;
