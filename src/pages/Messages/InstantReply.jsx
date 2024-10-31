import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdmitButton3, AdmitStudentColumn, AdmitStudentRole, FormInputBig, FormInputStudent, FormLable, FormTextAreaStudent } from '../../data/Profile'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { chatData } from '../../data/champion'
import { apiServer } from '../../data/Endpoint'
import { AES, enc } from 'crypto-js'
import { Show } from '../../data/Alerts'

const InstantReply = () => {
  
  const {Id} = useParams()
  const chatItem = chatData.find(item => item.id.toString() === Id);

  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate()

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

const [Replyemail, setReplyEmail] = useState({})
const [RecentReply, setRecentReply] = useState({})



useEffect(()=>{
if(userInfo){

  const formData = new FormData();
  formData.append("AdminId",userInfo.UserId)
  formData.append("EmailId",Id)


fetch(apiServer+"GetOneEmail",{
  method: "POST",
      headers: {
        'UserId': userInfo.UserId,         
        'SessionId': userInfo.SessionId    
      },
      body:formData
})
.then(res=>res.json())
.then(data=>setReplyEmail(data))
.catch(err=>console.error(err))



}
 
},[userInfo])

useEffect(()=>{
  if(userInfo&&Replyemail){
  
    const formData = new FormData();
    formData.append("AdminId",userInfo.UserId)
    formData.append("EmailId",Id)
  
  
  fetch(apiServer+"GetOneReply",{
    method: "POST",
        headers: {
          'UserId': userInfo.UserId,         
          'SessionId': userInfo.SessionId    
        },
        body:formData
  })
  .then(res=>res.json())
  .then(data=>setRecentReply(data))
  .catch(err=>console.error(err))
  
  
  
  }
   
  },[userInfo])

const handleMsg = () =>{

if(userInfo&&RecentReply&&Replyemail){

  if(Replyemail.isReplied==0){
    return Replyemail.Message
  }else{
    return "[Reply] "+ RecentReply.Reply
  }

}

}

const [reply, setReply] = useState("")
const [attach, setAttach] = useState("")

const handleReplyTheChat = async () => {


  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
  formData.append("EmailId", Id)
  formData.append("Reply", reply)
  formData.append("Attachment", attach)

  
  formData.append("AdminId",userInfo.UserId)
  //console.table(formData)
  
      const response = await fetch(apiServer+"ReplyTheChat", {
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
        navigate("/main/mainChat")
         window.location.reload()
        
      } else {
        Show.Attention(data.message);

      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }

  
    return (
    <div>

<div className="wwd-column">



<div className="card" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white",}}>
  <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding:"2rem"}}>Instant Reply </div>

  <AdmitStudentColumn>

  <div>
        <FormLable
style={{ color: localStorage.getItem("colorMode")}}>Full Name</FormLable>
<FormInputBig
type="text"

value={Replyemail.FullName}
placeholder=""
//onChange={(e) => setFirstname(e.target.value)}

/>
</div>

<div>
        <FormLable
style={{ color: localStorage.getItem("colorMode")}}>Email</FormLable>
<FormInputBig
type="text"

placeholder=""
//onChange={(e) => setFirstname(e.target.value)}
value={Replyemail.Email}
/>
</div>

<div>
<FormLable
style={{ color: localStorage.getItem("colorMode")}}>Message</FormLable>
<FormTextAreaStudent
type="text"

placeholder=""
//onChange={(e) => setOtherName(e.target.value)}
value={handleMsg()}
/>
</div>


<div>
<FormLable
style={{ color: localStorage.getItem("colorMode")}}>Reply</FormLable>
<FormTextAreaStudent
type="text"
required
placeholder=""
onChange={(e) => setReply(e.target.value)}

/>
</div>

<div>
        <FormLable
style={{ color: localStorage.getItem("colorMode")}}>Attach a file</FormLable>
<FormInputBig
type="file"
placeholder=""
onChange={(e) => setAttach(e.target.files[0])}
/>
</div>






</AdmitStudentColumn>

  <AdmitButton3
background={localStorage.getItem("colorMode")}
color="white"
border={localStorage.getItem("colorMode")}
style={{marginBottom:"1rem"}}
onClick={()=>handleReplyTheChat()}

>Send
</AdmitButton3>

</div>



</div>


    </div>
  )
}

export default InstantReply