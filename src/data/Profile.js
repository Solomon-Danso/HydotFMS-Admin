import styled from "styled-components";
import { colors } from "./Colors";
import { FaUserCircle } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { MdEditNote } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";

import { BsCashCoin, BsClockHistory } from "react-icons/bs";
import {
  HiOutlineDocumentText,
  HiChevronRight,
  HiOutlineLogout,
} from "react-icons/hi";
import {TiUser} from "react-icons/ti"
import { TbReceipt } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiChevronDown, BiPowerOff, BiVideo } from "react-icons/bi";
import {IoMdClipboard} from "react-icons/io"
import {
  MdHelp,
  MdEventNote,
  MdPermContactCalendar,
  MdLocationPin,
  MdSchool,
  MdHistory,
  MdContacts
} from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";




export const IconDashEContacts = styled(MdContacts)`
  width: 20px;
  height: 20px;
  color: ${colors.mainred};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

export const IconDashEContacts2 = styled(MdHistory)`
  width: 20px;
  height: 20px;
  color: ${colors.mainsecondgreen};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;


export const IconDashHistory = styled(MdHistory)`
  width: 20px;
  height: 20px;
  color: ${colors.primary};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;




export const IconDashAcademic = styled(MdSchool)`
  width: 20px;
  height: 20px;
  color: ${colors.maingreen};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

export const IconDashContact = styled(MdPermContactCalendar)`
  width: 20px;
  height: 20px;
  color: ${colors.mainsecondgreen};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

export const IconDashReceipt = styled(TbReceipt)`
  width: 20px;
  height: 20px;
  color: ${colors.primary};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;








export const ProfileDiv = styled.div`
min-height:100vh;
width: 100%

`;

export const CoverImage = styled.img` 
width: 100vw;
height:20vh;
border-top-left-radius:30px;


`;

export const BasicInfo = styled.div`
position: absolute; /* Position the BasicInfo element */
  bottom: -80px; /* Adjust this value to control the overflow amount */
  left: 20px; /* Adjust this value to control the horizontal position */

    
`;

export const ProfileContainer = styled.div`
position: relative;
`;

export const ProfileImage = styled.img` 
width: 15vw;
height:15vh;

`;

export const HomeBanner = styled.div`
display:flex;
flex-direction: row;
gap:1rem;
flex-wrap: wrap;
padding:1rem;
width:100%

`;

export const HomeCard = styled.div`
/* From https://css.glass */
background: ${colors.card};
border-radius: 16px;
border: 1px solid ${colors.card};
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
width:24%;
display:flex;
flex-direction:row;
gap:1rem;
padding:2rem;
@media (max-width: 768px){
  width: 100%;
 }
`;

export const ChartsCard = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

width:49%;
height:40vh;
padding:1rem;
@media (max-width: 768px){
  width: 100%;
 }
`;


export const StudentInfoCard = styled.div`
  background: ${colors.card};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  
  min-height: 50vh;
  padding: 1rem;
  overflow: hidden; /* Change to hidden */

  /* Position relative for proper stacking context */
  position: relative;

  

`;

export const MenuCard = styled.div`
  background: ${colors.card};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  
  height: 100%;
  position: absolute;
 padding-top:17%;
 padding-bottom:17%;
 
  right: 0;
  
  
  z-index: 1; /* Set a positive z-index value */

  /* You might need to adjust the width if needed */
   width: 70%; 

   overflow: hidden;
   overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

`;


export const MenuCard2 = styled.div`
  background: ${colors.body};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  
  height: 40vh;
  padding: 1rem;
    /* Position absolute to place the card above other elements */
  position: absolute;
 
  right: 0;
  z-index: 1; /* Set a positive z-index value */

  /* You might need to adjust the width if needed */
   width: 20%; 
@media (max-width: 768px){
  width: 50%;
}
   overflow: hidden;
   overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

`;

export const MenuCardHyChat = styled.div`
  background: ${colors.body};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  
  height: 15vh;
  padding: 1rem;
    /* Position absolute to place the card above other elements */
  position: absolute;
 
  right: 0;
  z-index: 1; /* Set a positive z-index value */

  /* You might need to adjust the width if needed */
   width: 20%; 
@media (max-width: 768px){
  width: 50%;
}
   overflow: hidden;
   overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

`;

export const ChatCard = styled.div`
  background: ${colors.body};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  height: 15vh;
  padding: 1rem;
 
   width: 100%; 
  display:flex;
  flex-direction: row;
  gap:2rem;
  
  

@media (max-width: 768px){
  width: 90%;
  gap:0.5rem;
  height: 10vh;
  padding: 1rem;
 
}
 

`;



export const ChatCardGroup = styled.div`
  background: ${colors.body};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  height: 15vh;
  padding: 1rem;
 
   width: 100%; 
  display:flex;
  flex-direction: row;
  gap:2rem;

@media (max-width: 768px){
  width: 100%;
  gap:0.5rem;
  padding: 1rem;
 
}
 

`;



export const MovieCard = styled.div`
  background: ${colors.body};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  margin-top:1rem;
 height: 100%;

   width: 48%; 
   @media (max-width: 800px){
    width: 100%;

  }

`;

export const LiveVideoCard = styled.div`
  background: ${colors.body};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  margin-top:1rem;
 height: 100%;

   width: 20vw; 
   @media (max-width: 800px){
    width: 100%;

  }

`;




export const MovieBText = styled.div`
font-size: 1.3rem;
font-weight: bold;
text-wrap: break-word;
padding-left: 0.5rem;
font-family: OpenSans, NotoSans, sans-serif;


`;

export const MovieSText = styled.div`
font-size: 1.1rem;
padding-left: 0.5rem;
padding-bottom: 0.5rem;
text-wrap: break-word;
font-family: cursive;


`;

export const QuizSText = styled.div`
font-size: 1.3rem;
padding-left: 0.5rem;
padding-bottom: 0.5rem;
text-wrap: break-word;
font-family: opensans;


`;
export const QuizSMark = styled.div`
font-size: 0.8rem;
font-family: opensans;
padding-left: 0.5rem;
padding-bottom: 0.5rem;

`;



export const TheVideo = styled.video`
width:100%;
height:80%;

`;

export const RadioSelect = styled.input`
width:3vw;
height:4vh;
`;

export const StudentInfoCard2 = styled.div`
  background: ${colors.card};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  
  min-height: 100vh;
  padding: 1rem;
  overflow: hidden; /* Change to hidden */

  /* Position relative for proper stacking context */
  position: relative;
`;



export const AdmitStudentCard = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

padding:2rem;
overflow:hidden;
margin: 2rem;
border: 1px solid ${({ border }) => border};;
@media(max-width:768px){
width:100%;
padding:0.5rem;
margin:0rem;
}

`;

export const AddGrpCard = styled.div`
background: ${colors.body};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);



`;



export const AdmitStudentCard2 = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

padding:2rem;
overflow:hidden;
margin: 2rem;
border: 1px solid ${({ border }) => border};


`;

export const AssignmentInfoCard = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

padding:0.5rem;
overflow:hidden;
margin: 0.5rem;
border: 1px solid ${({ border }) => border};

@media (min-width: 800px){
  width: 30%;

}

`;


export const NotesInfoCard = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

overflow:hidden;
margin: 0.5rem;
border: 1px solid ${({ border }) => border};
  width: 90vw;
@media (min-width: 800px){
  width: 90vw;

}

`;



export const EventCard = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

height:auto;
padding:1rem;
overflow:hidden;

`;

export const EventCardSingle = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

height:auto;
padding:1rem;
overflow:hidden;
width: 20vw;
height:auto;

`;

export const EventCardList = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
flex-wrap: wrap;
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
border: 0.5px solid ${colors.white};
height:auto;
padding:0.5rem;
overflow:hidden;
width: 90%;
@media (max-width: 768px){
  width: 100%;
  padding:0.2rem;
  border-radius: 10px;
}

`;

export const EventCardListHome = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
flex-wrap: wrap;
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
align-items: center;
height:auto;
padding:1rem;
overflow:hidden;
width: 25vw;

@media (max-width: 1500px){
  width:80vw;
}

`;


export const HomeIcon = styled.div`
font-size: 3rem;
color: ${({ color }) => color};


`;

export const HomeCardColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

export const HomeCardText = styled.div`
font-size: 1.1rem;
text-wrap: break-word;
font-weight: 600;
`;

export const HomeCardTextEvent = styled.div`
font-size: 1.3rem;
text-wrap: break-word;
font-weight: 600;
text-align: center;
`;

export const HomeCardNumber = styled.div`
font-size: 2rem;
display:flex;
justify-content: center;
padding: 1rem;
`;

export const HomeStudentForm = styled.form`
height:50vh;
display:flex;
flex-direction: row;
justify-content: space-between;

`;

export const SelectStage = styled.select`
border: none;
  border: 30px;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;



export const SendButton = styled.button`
 width: 20vw;
  padding: 15px 10px;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  width:15vw;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;


export const SelectStageButton = styled.button`
border: none;
  border: 30px;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 2px 10px;
    padding: 5px 5px;
  }


`;

export const ProfileDivLeft = styled.div`
  position: relative;
  padding: 0;
  flex: 1;
  font-family: OpenSans, NotoSans, sans-serif;
`;


export const StudentListBanner = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 6vw;
  padding-right: 2rem;
  height: 3rem;
  align-items: center;

  /* Fixed position with respect to the viewport */
  position: fixed;
  top: 4;
  left: 0;
  right: 0;
  color: ${colors.white};
  z-index: 1; /* Ensure it's above the scrolling content */
`;


export const EventBanner = styled.form`
display:flex;
flex-direction: row;
gap:1rem;
padding-left:2rem;
padding-right:2rem;
height: 3rem;
align-items:center;

`


export const StudentCardText = styled.div`
font-size: 1.2rem;
text-wrap: break-word;
font-weight: 600;
flex:1;

color:${colors.darkBlue};
`;

export const EventTitle = styled.div`
text-align: center;
font-size: 1.5rem;
color: ${colors.lightBlue};
font-family:cursive;
font-weight: bold;
`;

export const EventCTitle = styled.div`
text-align: left;
font-size: 1.3rem;
color: ${colors.lightBlue};
font-family:cursive;

`;

export const EventDateRow = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
@media (max-width: 768px){
  width:80vw;
}
`;
export const EventDateRow2 = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
`;

export const EventDate = styled.div`
display: flex;
flex-direction: column;
gap: 0.1rem;
flex-wrap: wrap;
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
height:auto;
width:35%;
padding:0.5rem;
overflow:hidden;
border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};

  

`;

export const EventDateTitleStart = styled.h3`
text-align: center;
font-size: 1rem;
color: ${colors.green};
font-family:OpenSans, NotoSans, sans-serif;

`;

export const EventDateTitleEnd = styled.h3`
text-align: center;
font-size: 1rem;
color: ${colors.red};
font-family:Helvetica

`;

export const MainTitle = styled.div`
font-size: 1.5rem;
color: ${colors.white};
font-family:Helvetica;
font-weight: 700;
@media(max-width:768px){
  font-size: 1.2rem;
  text-align: center;
  margin-bottom:1.2rem
}
`;

export const HeaderTitle = styled.div`
font-size: 1.3rem;
color: ${colors.white};
font-family:Helvetica,
font-weight: 600;
@media(max-width:768px){
  font-size: 1.1rem;

}


`;

export const FormLable = styled.div`
font-size: 1.1rem;
font-family:OpenSans

`;

export const AdmitStudentRole = styled.div`
display: flex;
flex-direction: row;
margin: 1rem;
padding: 1rem;
gap:1rem;
flex-wrap: wrap;

`;


export const AdmitStudentColumn = styled.div`
display: flex;
flex-direction: column;
margin: 1rem;
padding: 1rem;
gap:1rem;
flex-wrap: wrap;

`;




export const AddGrpRow = styled.div`
display: flex;
flex-direction: row;
gap:1rem;
flex-wrap: wrap;


`;


export const FormInputStudent = styled.input`
  width: 26vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 80vw;
  }
`;

export const FormInputDiscount = styled.input`
  width: 26vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 65vw;
  }
`;

export const FormInputPassword = styled.input`
  width: 20vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 80vw;
  }
`;


export const HeroImgInput = styled.input`
  width: 20vw;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 80vw;
  }
`;



export const FormInputBig = styled.input`
  width: 100%;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 80vw;
  }
`;




export const FormInputStudent6 = styled.input`
  width: 26.5vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const AssignSolnUpload = styled.input`
  width: 80%;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;




export const ChatUploader = styled.input`
  width: 80%;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const FormInputStudentM = styled.input`
  width: 100%;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const FormInputStudent2 = styled.input`
  width: 60vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const FeesRow = styled.div`
display: flex;
flex-direction: row;
gap:1rem;
align-items: center;
margin-bottom:1.5rem;

`;

export const FeesIcons = styled.div`
font-size: 3rem;
height:100%
flex:1;

`;

export const FeesIconN = styled.div`
font-size: 2rem;
padding:0.5rem;


`;

export const FeesIconN2 = styled.div`
font-size: 1.5rem;
padding:.0.7rem;
padding-top: 0.9rem;


`;


export const FeesIconM = styled.div`
font-size: 1rem;
height:100%
flex:1;

`;

export const FeesIconsS = styled.div`
font-size: 1.5rem;
height:100%
flex:1;

`;


export const FormInputStudent3 = styled.input`
  width: 27vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  color: ${colors.white};
  text-align: left;

  
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width:100%;
  }
   @media (max-width: 1500px) {
    font-size: 12px;
    width:100%;
  }
`;

export const FormInputStudent4 = styled.input`
  width: 27vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  
  text-align: left;

  
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width:100%;
  }
   @media (max-width: 1500px) {
    font-size: 12px;
    width:100%;
  }
`;

export const RInputLong = styled.input`
  width: 50vw;
  padding: 15px 10px;
  border: 1px solid ${colors.mainsecondgreen};
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  margin-top: 10px;
  transition: all 0.5s ease-in-out;
  
  text-align: left;

  
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width:100%;
  }
   @media (max-width: 1500px) {
    font-size: 12px;
    width:100%;
  }
`;

export const RInput = styled.input`
  width: 5vw;
 
  border: 1px solid ${colors.mainred};
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  
  text-align: left;

  
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width:100%;
  }
   @media (max-width: 1500px) {
    font-size: 12px;
    width:100%;
  }
`;


export const NoteSubject = styled.input`
  width: 100%;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  
  text-align: left;

  
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width:100%;
  }
   @media (max-width: 1500px) {
    font-size: 12px;
    width:100%;
  }
`;





export const GradeInput = styled.input`
  width: 100%;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  
  text-align: left;

  
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width:100%;
  }
   @media (max-width: 1500px) {
    font-size: 12px;
    width:100%;
  }
`;




export const FormInputGrpName = styled.input`
  width: 60vw;
  padding: 15px 0; /* Adjust padding for the bottom border */
  font-size: 1.2rem;
  text-align: left;
  background-color: ${colors.body}; /* Set the background color */
  border: none; /* Remove all borders */
   color: white; 

  &::placeholder {
    color: white; /* Set the placeholder text color to white */
  }

  &:focus {
    outline: none; /* Remove the default focus outline */
    border-bottom: 2px solid #000; /* Set the bottom border style and color on focus */
  }

  /* Additional CSS properties here */
`;


export const FormInputSearch = styled.input`
  width: 100vw;
 background: ${({ background }) => background};
  padding: 15px 10px;
  border: 0.1rem solid ${({ border }) => border};;
  margin-top: 10px;
  font-size: 1.5rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  text-align: center;
  color:${colors.darkBlue};
  /* From https://css.glass */
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);


::placeholder {
    color: white;
  }

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const FormInputSearchHyChat = styled.input`
  width: 100%;
 background: ${({ background }) => background};
  padding: 15px 10px;
  border: 0.1rem solid ${({ border }) => border};;
  margin-top: 10px;
  font-size: 1.5rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  text-align: center;
  color:${colors.darkBlue};
  /* From https://css.glass */
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);


::placeholder {
    color: white;
  }

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;



export const FormTextAreaStudent = styled.textarea`
  width: 26vw;
  padding: 15px 10px;
  border: 1px solid ${({ border }) => border};;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;
  flex:1;
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 80vw;
  }
`;

export const FormTextAreaNotes = styled.textarea`
  width: 100%;
  height:10vh;
  padding: 15px 10px;
  border: 1px solid ${({ border }) => border};;
  border-radius: 1rem;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const SelectForStudent = styled.select`
width: 17vw;
padding: 15px 10px;
border: 1px solid ${({ border }) => border};;
background-color: ${({background})=>background};
color: ${({color})=>color};
border-radius: 5px;
margin-top: 10px;
font-size: 16px;
outline: none;
transition: all 0.5s ease-in-out;

:hover {
  border: 0.5px solid ${colors.primary};
}

:focus {
  border: 0.5px solid ${colors.primary};
}

@media (max-width: 768px) {
  font-size: 12px;
}

`;

export const SelectForStudentRel = styled.select`
width: 16vw;
padding: 15px 10px;
border: 1px solid ${({ border }) => border};;
background-color: ${({background})=>background};
color: ${({color})=>color};
border-radius: 5px;
margin-top: 10px;
font-size: 16px;
outline: none;
transition: all 0.5s ease-in-out;

:hover {
  border: 0.5px solid ${colors.primary};
}

:focus {
  border: 0.5px solid ${colors.primary};
}

@media (max-width: 768px) {
  font-size: 12px;
}

`;

export const QuestionInput = styled.textarea`
  width: 60%;
  padding: 10px;
  border: 0.5px solid #cdcdcd;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 1.3rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  margin-bottom: 15px;
  height: 100px;
  resize: none;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
  }
`;


export const OptionInput = styled.input`
  width: 60%;
  padding: 5px;
  border: 0.5px solid #cdcdcd;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 1.3rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  margin-bottom: 15px;
  height: 50px;
  resize: none;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
  }
`;



export const PaySelector = styled.select`
width: 28vw;
padding: 15px 10px;
border: 1px solid ${({ border }) => border};;
background-color: ${({background})=>background};
color: ${({color})=>color};
border-radius: 5px;
margin-top: 10px;
font-size: 16px;
outline: none;
transition: all 0.5s ease-in-out;

:hover {
  border: 0.5px solid ${colors.primary};
}

:focus {
  border: 0.5px solid ${colors.primary};
}

@media (max-width: 768px) {
  font-size: 12px;
}

`;

export const PaySelectorN = styled.select`
width: 100%;
padding: 15px 10px;
border: 1px solid ${({ border }) => border};;
background-color: ${({background})=>background};
color: ${({color})=>color};
border-radius: 5px;
margin-top: 10px;
font-size: 16px;
outline: none;
transition: all 0.5s ease-in-out;

:hover {
  border: 0.5px solid ${colors.primary};
}

:focus {
  border: 0.5px solid ${colors.primary};
}

@media (max-width: 768px) {
  font-size: 12px;
}

`;


export const PaySelectorS = styled.select`
width: 23vw;
padding: 15px 10px;
border: 1px solid ${({ border }) => border};;
background-color: ${({background})=>background};
color: ${({color})=>color};
border-radius: 5px;
margin-top: 10px;
font-size: 16px;
outline: none;
transition: all 0.5s ease-in-out;

:hover {
  border: 0.5px solid ${colors.primary};
}

:focus {
  border: 0.5px solid ${colors.primary};
}

@media (max-width: 768px) {
  font-size: 12px;
}

`;




export const AdmitButton = styled.button`
border: none;
  width: 16vw;
  height: 10vh;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-left:1.5rem;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;


export const AdmitButton2 = styled.button`
border: none;
  width: 10vw;
  height: 6.5vh;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 1.3rem;
  font-family: OpenSans;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;

export const AdmitButton3 = styled.button`
border: none;
  width: 16vw;
  
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 1.2rem;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;

export const QuizButton = styled.button`
border: none;
  width: 30%;
  height: 5vh;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
 
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 1.3rem;
  font-family: OpenSans;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;

  }


`;



export const OptionButton = styled.button`
border: none;
  width: 5vw;
  height: 6vh;
  border-radius: 10px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 1.3rem;
  font-family: OpenSans;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;





export const AssSolUpBut = styled.button`
border: none;
  width: 60%;
  height: 6.5vh;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 1.8rem;
  font-family: OpenSans;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;



export const AddGrpBtn = styled.button`
border: none;
  width: 20vw;
  height: 6.5vh;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 1.3rem;
  font-family: OpenSans;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;





export const AddNotes = styled.button`
border: none;
  width: 25vw;
  height: 7vh;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 1.3rem;
  font-family: OpenSans;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;




export const NewStudentListCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 5rem;
  align-items: center;
  color: ${colors.white};
  position: relative;
  z-index: 0;
`;


export const NewStudentListCard2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 3rem;
  align-items: center;
 
  color: ${colors.white};
  position: relative;
  z-index: 1;
`;



export const StudentListResult = styled.div`
  overflow: auto; /* Use auto to allow scrolling when content overflows */

  /* Adjust height to fill available space and leave room for the fixed header */
  height: calc(100% - 3rem);
  margin-top: 3rem; /* Space for the fixed header */
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const VideoListResult = styled.div`
  overflow: auto; /* Use auto to allow scrolling when content overflows */

  /* Adjust height to fill available space and leave room for the fixed header */
  height: calc(100% - 3rem);
  margin-top: 3rem; /* Space for the fixed header */
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;


export const CardText = styled.div`
  font-size: 1rem;
  color: ${colors.lightBlue};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
`;

export const CardTextM = styled.div`
  font-size: 0.8rem;
  color: ${colors.lightBlue};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
`;


export const CardText2 = styled.div`
  font-size: 1rem;
  color: ${colors.lightBlue};
  text-align: center;
 
 
   /* Allow each text element to take equal space */
`;

export const CardTextHeader = styled.div`
  font-size: 1.1rem;
  color: ${colors.lightBlue};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextHeaderM = styled.div`
  font-size: 0.9rem;
  color: ${colors.lightBlue};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextHeader2 = styled.div`
  font-size: 1.1rem;
  color: ${colors.lightBlue};
  text-align: center;
   /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextDateHeader = styled.div`
  font-size: 1.1rem;
  color: ${colors.maingreen};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextActionHeader = styled.div`
  font-size: 1.0rem;
  color: ${colors.maingreen};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

   export const CardTextCreditHeader = styled.div`
  font-size: 1.3rem;
  color: ${colors.mainsecondgreen};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextPayHeader = styled.div`
  font-size: 1.3rem;
  color: ${colors.yellow};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextBillHeader = styled.div`
  font-size: 1.3rem;
  color: ${colors.mainred};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;


export const CardImage = styled.img`
width: 7vw;
height: 10vh;
border-radius: 0.5rem;


`;

export const UpdateProfileImage = styled.img`
width: 100%;
height: 100%;
border-radius: 0.5rem;


`;

export const CardImageM = styled.img`
width: 7vw;
height: 7vh;
border-radius: 0.3rem;


`;

export const CardImage2 = styled.img`
width: 7vw;
height: 7vh;
border-radius: 0.5rem;


`;

export const CardImage3 = styled.img`
width: 95%;
height: 40vh;
border-radius: 0.5rem;


`;

export const FormLoaders = styled.form`
display: flex;
flex-direction: row;
justify-content: space-between;


`;


export const StudDetails = styled.div`
display: flex;
flex-direction: row;
gap:1rem;
height:auto;


`;

export const StudLeft = styled.div`
display: flex;
flex-direction: column;
`;

export const StudRight = styled.div`
display: flex;
flex-direction: column;

`;
export const StudCenter = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`;

export const BiggerImage = styled.img`
width: 40vw;
height: 73vh;
padding:2rem;


@media (max-width: 768px) {
    width: 20vw;
    height: 30vh;

  }
`;


export const BiggerImage3 = styled.img`
width: 50vw;
height: 100vh;
padding:2rem;


@media (max-width: 768px) {
    width: 20vw;
    height: 30vh;

  }
`;

export const BiggerImage4 = styled.img`
width: 30vw;
height: 35vh;
padding:2rem;


@media (max-width: 768px) {
    width: 20vw;
    height: 30vh;

  }
`;


export const BiggerImage2 = styled.img`
width: 35vw;
height: 80vh;
padding:2rem;


@media (max-width: 768px) {
    width: 20vw;
    height: 30vh;

  }
`;



export const StudDetailRow = styled.div`
gap: 1rem;
display: flex;
flex-direction: row;
margin: 1rem;
width: 30vw;
align-items:center;


:hover{
  font-size:1.6rem;
 
}
`;

export const AboutHeader = styled.div`
font-size: 1.4rem;
font-weight: bold;
color: ${colors.white};
text-decoration: underline;
`;

export const AboutHeader2 = styled.div`
font-size: 1.6rem;
font-weight: bold;
color: ${colors.white};
text-decoration: underline;
text-align: center;
`;



export const StudDetailField = styled.div`
font-size: 1.2rem;
color: #979797

`;

export const StudDetailData = styled.div`
font-size: 1rem;
color: ${colors.white}

`;




export const ProfileCoverContainer = styled.div`
  height: 250px;
  display: flex;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  font-family: OpenSans, NotoSans, sans-serif;
  @media (max-width: 768px) {
    height: 125px;
  }
`;


export const ProfileIfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding-left: 5%;
  padding-right: 2%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding: 0px;
    position: relative;
    flex-direction: column;
  }
`;

export const ProfileSectionCard = styled.div`
font-family: OpenSans, NotoSans, sans-serif;
  border-radius: 10px;
  width: 100;
  padding: 10px;
  height: max-content;
  box-shadow: 0 1.5px 5px rgb(0 0 0 / 0.1);
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    border: none;
    box-shadow: none;
  }
`;

export const ProfileInfoSub = styled.div`
  align-self: flex-end;
  padding-bottom: 10px;
  padding-left: 10px;
  flex: 1;
  @media (max-width: 768px) {
    padding: 5px;
    align-self: flex-start;
  }
`;


export const ProfileName = styled.h5`
  font-size: 25px;
  font-family: OpenSans, NotoSans, sans-serif;
 

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;




export const ProfileType = styled.p`
  font-size: 13px;
  color: aqua;
  margin-top: 2px;
  font-family: OpenSans, NotoSans, sans-serif;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ProfileCoverImg = styled.img`
  width: 100%;
  height: 60%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  object-fit: cover;
  position: absolute;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 0;
  }
`;

export const ProfileImg = styled(FaUserCircle)`
  width: 120px;
  height: 120px;
  color: black;
  border: 4px solid white;
  background-color: white;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const ProfileImgUser = styled.img`
  width: 120px;
  height: 120px;
  color: black;
  border: 4px solid white;
  background-color: white;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 70px;
    left: 10px;
    height: 70px;
  }
`;

export const ProfileImgUserDefault = styled(FaUserCircle)`
  width: 120px;
  height: 120px;
  color: black;
  border: 2px solid white;
  background-color: white;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 70px;
    left: 10px;
    height: 70px;
  }
`;

export const ProfileInput = styled.input`
  width: 60%;
  padding: 10px;
  border: 0.5px solid #cdcdcd;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 14px;
  outline: none;
  transition: all 0.5s ease-in-out;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const ProfileInputMulti = styled.textarea`
  width: 60%;
  padding: 10px;
  border: 0.5px solid #cdcdcd;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 14px;
  outline: none;
  transition: all 0.5s ease-in-out;
  margin-bottom: 15px;
  height: 100px;
  resize: none;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const ProfileInputSelect = styled.select`
  width: 60%;
  padding: 10px;
  border: 0.5px solid #cdcdcd;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 14px;
  outline: none;
  transition: all 0.5s ease-in-out;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
`;

export const ProfileDataContainer = styled.div`
  flex: 1;
  display: flex;
  margin-top: 40px;
  font-size: 14px;
  border-bottom: 1px solid #cdcdcd;
  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 12px;
    margin-top: 20px;
  }
`;

export const ProfileDataTitle = styled.div`
  flex: 0.2;
  color: black;
  @media (max-width: 768px) {
    flex: 1;
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

export const ProfileDataInputContainer = styled.div`
  flex: 0.8;
  font-size: 14;
  color: grey;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const ProfileSchoolImg = styled.img`
  width: 60px;
  height: 60px;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

export const ProfileSchoolTitle = styled.h4`
  color: black;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ProfileSchoolTitleHome = styled.h4`
  color: white;
  font-size: 2rem;
  font-family: OpenSans, NotoSans, sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ProfileSchoolCourse = styled.p`
  font-size: 12px;
  font-family: OpenSans, NotoSans, sans-serif;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

export const ProfileIconEdit = styled(MdEditNote)`
  padding: 5px;
  color: black;
  transition: 0.5s all ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  width: 50px;
  height: 50px;
  align-self: flex-end;

  :hover {
    background-color: ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    align-self: flex-start;
    width: 35px;
    height: 35px;
  }
`;

export const ProfileIcconAdd = styled(RiAddFill)`
  padding: 5px;
  color: black;
  transition: 0.5s all ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin-right: 10px;

  :hover {
    background-color: ${colors.primary};
    color: white;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const ProfileIcconRemove = styled(FiMinus)`
  padding: 5px;
  color: black;
  transition: 0.5s all ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin-right: 10px;

  :hover {
    background-color: ${colors.primary};
    color: white;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const DashTitleButton = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DashSearchContainerEdit = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  margin-top: 40px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ProfileButtonContainer = styled.div`
  padding: 5px;
  color: black;
  transition: 0.5s all ease-in-out;
  border-radius: 50%;
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin-right: 10px;

  :hover {
    background-color: rgba(0,0,0,0.5);
    color: white;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const EditCropImage = styled.img`
  width: 500px;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

