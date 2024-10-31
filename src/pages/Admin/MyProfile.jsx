import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdmitButton3, AdmitStudentColumn, AdmitStudentRole, FormInputBig, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { chatData } from '../../data/champion'
import { Show } from '../../data/Alerts'
import { AES, enc } from 'crypto-js'
import { apiServer } from '../../data/Endpoint'

const InstantReply = () => {
  
const [picture, setPicture] = useState("")
const [fullname, setfullname] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [previewImage, setPreviewImage] = useState(null); // For image preview


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



const handleSubmit = async () => {

  console.table(userInfo)

Show.showLoading("Processing Data");
  try {

const formData = new FormData()
formData.append("Email", email)
formData.append("Password", password)
formData.append("Name", fullname)
formData.append("Picture", picture)
formData.append("AdminId",userInfo.UserId)
//console.table(formData)

    const response = await fetch(apiServer+"MyProfileUpdateAdmin", {
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
       
      
    } else {
      Show.Attention(data.message);
    }
  } catch (error) {

    Show.Attention("An error has occured");
   
  }

}


const handleImageChange = (e) => {
  const file = e.target.files[0];
  setPicture(file);

  // Preview the selected image
  const reader = new FileReader();
  reader.onloadend = () => {
    setPreviewImage(reader.result);
  };
  reader.readAsDataURL(file);
};



  
    return (
    <div>

<div className="wwd-column">



<div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
  <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Update Profile Details </div>

  <AdmitStudentColumn>

  {previewImage && (
              <div style={{ marginTop: "1rem" }}>
                <img src={previewImage} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px" }} />
              </div>
            )}
      
            <div>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}> Picture</FormLable>
              <FormInputStudent
               type="file"
               required
               placeholder=""
               accept=".jpg, .png, .jpeg, .ico, .webp"
               onChange={handleImageChange}
               
              />
            </div>

  <div>
        <FormLable
style={{ color: localStorage.getItem("colorMode")}}>Update Full Name</FormLable>
<FormInputBig
type="text"

placeholder=""
onChange={(e) => setfullname(e.target.value)}

/>
</div>

<div>
        <FormLable
style={{ color: localStorage.getItem("colorMode")}}>Update Email</FormLable>
<FormInputBig
type="email"

placeholder=""
onChange={(e) => setEmail(e.target.value)}

/>
</div>

<div>
        <FormLable
style={{ color: localStorage.getItem("colorMode")}}>Update Password</FormLable>
<FormInputBig
type="password"

placeholder="............"
onChange={(e) => setPassword(e.target.value)}

/>
</div>






</AdmitStudentColumn>

  <AdmitButton3
background={localStorage.getItem("colorMode")}
color="white"
border={localStorage.getItem("colorMode")}
style={{marginBottom:"1rem"}}
onClick={()=>{ handleSubmit()}}
>Update
</AdmitButton3>

</div>



</div>


    </div>
  )
}

export default InstantReply