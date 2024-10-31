import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import { AdmitButton3, AdmitStudentRole, FormInputStudent, FormLable } from '../../data/Profile';
import { Header } from '../../components';
import { Show } from '../../data/Alerts';
import { apiServer } from '../../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const Previewer = ({ preview, type }) => {
  return (
    <div>
      {preview && (
        <div style={{ marginTop: "1rem" }}>
          {type === 'image' && (
            <img src={preview} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
          )}
          {type === 'video' && (
            <video src={preview} controls style={{ maxWidth: "200px", maxHeight: "200px" }} />
          )}
        </div>
      )}
    </div>
  );
};

const Admin = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [Image1, setImage1] = useState("");
  const [Image2, setImage2] = useState("");
  const [Image3, setImage3] = useState("");
  const [Video1, setVideo1] = useState("");
  const [Whatsapp, setWhatsapp] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  const [previewImage3, setPreviewImage3] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
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
      formData.append("CompanyName", CompanyName);
      formData.append("Image1", Image1);
      formData.append("Image2", Image2);
      formData.append("Image3", Image3);
      formData.append("Video", Video1);
      formData.append("Whatsapp", Whatsapp);
      formData.append("Instagram", Instagram);
      formData.append("Facebook", Facebook);
      formData.append("AdminId", userInfo.UserId);

      const response = await fetch(apiServer + "CreateWebsite", {
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
    }
  };

  const handleFileChange = (type, setter, previewSetter) => (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (type === "image") {
      setter(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result);
      };
      reader.readAsDataURL(file);
    }

    if (type === "video") {
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
  };

  return (
    <div>
      <Header category="System Operations" title="Website" />
      <div className="wwd-row">
        <div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>Configure Website </div>
          <AdmitStudentRole>
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Company Name</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div>
            <Previewer preview={previewImage1} type="image" />
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Image 1</FormLable>
              <FormInputStudent
                type="file"
                required
                placeholder=""
                accept=".jpg, .png, .jpeg, .ico, .webp"
                onChange={handleFileChange("image", setImage1, setPreviewImage1)}
              />
           
            </div>

            <div>
            <Previewer preview={previewImage2} type="image" />
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Image 2</FormLable>
              <FormInputStudent
                type="file"
                required
                placeholder=""
                accept=".jpg, .png, .jpeg, .ico, .webp"
                onChange={handleFileChange("image", setImage2, setPreviewImage2)}
              />
              
            </div>

            <div>
            <Previewer preview={previewImage3} type="image" />
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Image 3</FormLable>
              <FormInputStudent
                type="file"
                required
                placeholder=""
                accept=".jpg, .png, .jpeg, .ico, .webp"
                onChange={handleFileChange("image", setImage3, setPreviewImage3)}
              />
             
            </div>

            <div>
            <Previewer preview={previewVideo} type="video" />
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Video</FormLable>
              <FormInputStudent
                type="file"
                required
                placeholder=""
                accept="video/mp4, video/webm, video/ogg"
                onChange={handleFileChange("video", setVideo1, setPreviewVideo)}
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
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Instagram</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Facebook</FormLable>
              <FormInputStudent
                type="text"
                placeholder=""
                onChange={(e) => setFacebook(e.target.value)}
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

export default Admin;
