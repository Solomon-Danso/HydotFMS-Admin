import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from '../../data/Profile';
import { Header } from '../../components';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const Previewer = ({ preview }) => {
  if (!preview) return null;

  // Check if the preview is for an image or video based on the data URL type
  const isImage = preview.startsWith("data:image/");
  const isVideo = preview.startsWith("data:video/");

  return (
    <div style={{ marginTop: "1rem" }}>
      {isImage && (
        <img src={preview} alt="Preview" style={{ width: "auto", maxHeight: "40vh" }} />
      )}
      {isVideo && (
        <video src={preview} controls style={{ width: "auto", maxHeight: "40vh" }} />
      )}
      {!isImage && !isVideo && (
        <p>Unsupported file format for preview</p>
      )}
    </div>
  );
};



const WebsiteSetup = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [CompanyLogo, setCompanyLogo] = useState("");
  const [ShopURL, setShopURL] = useState("");
  const [Location, setLocation] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [LinkedIn, setLinkedIn] = useState("");
  const [Whatsapp, setWhatsapp] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [previewImage1, setPreviewImage1] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

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


  const handleCreateAdmin = async () => {
    Show.showLoading("Processing Data");
  
    try {
      const formData = new FormData();
      formData.append("CompanyLogo", CompanyLogo);
      formData.append("CompanyName", CompanyName);
      formData.append("ShopURL", ShopURL);
      formData.append("Location", Location);
      formData.append("PhoneNumber", PhoneNumber);
      formData.append("Email", Email);
      formData.append("LinkedIn", LinkedIn);
      formData.append("Whatsapp", Whatsapp);
      formData.append("Instagram", Instagram);
      formData.append("Facebook", Facebook);
      formData.append("AdminId", userInfo.UserId);
  
      // Send the request without latitude and longitude
      const response = await fetch(apiServer + "WebsiteSetup", {
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
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
      Show.Attention("An error has occurred");
      console.error(error);
    }
  };

  
  
  const handleFileChange = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    // Get the file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
  
    // Define allowed image and video extensions
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'flv'];
  
    // Determine file type based on extension
    const isImage = imageExtensions.includes(fileExtension);
    const isVideo = videoExtensions.includes(fileExtension);
  
    if (isImage) {
      setter(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result);
      };
      reader.readAsDataURL(file);
    } 
    
    else if (isVideo) {
      const fileLimit = 30 * 1024 * 1024; // 30MB limit
      if (file.size > fileLimit) {
        Show.Attention("File size exceeds the limit (30MB)");
      } else {
        setter(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          previewSetter(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } 
    
    else {
      Show.Attention("Unsupported file format");
    }

    
  };
  
 

  return (
    <div>
      <Header category="Website Configuration" title="Website Setup" />
      <div className="wwd-row">
        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Configure Website </div>
          <AdmitStudentRole>

          <div>
            <Previewer preview={previewImage1} />
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Company Logo</FormLable>
              <FormInputStudent
                type="file"
                required
                placeholder=""
                accept=".jpg, .png, .jpeg, .ico, .webp, .mp4, .mov, .avi, .wmv, .flv"
                onChange={handleFileChange(setCompanyLogo, setPreviewImage1)}
              />
           
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Company Name</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Shop URL</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setShopURL(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Location</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Phone Number</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Email</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
           

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Whatsapp</FormLable>
              <FormInputStudent
                type="text"
                placeholder="eg: 233599000000"
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Instagram (Username) </FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Facebook Profile Link</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>LinkedIn Profile Link</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>

          </AdmitStudentRole>

          <AdmitButton3
            background={localStorage.getItem("colorMode")}
            color="white"
            border={localStorage.getItem("colorMode")}
            style={{ marginBottom: "1rem" }}
            onClick={handleCreateAdmin}
          >
            Add
          </AdmitButton3>
        </div>
      </div>
    </div>
  );
}

export default WebsiteSetup;
