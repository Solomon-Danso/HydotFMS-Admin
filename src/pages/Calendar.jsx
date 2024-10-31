import React, { useEffect, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { scheduleData } from '../data/champion';
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import { apiServer } from '../data/Endpoint';
import { Show } from '../data/Alerts';

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;


const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();

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

const [scheduleList, setScheduleList] = useState([])

useEffect(() => {
  if (userInfo.UserId) {
    const formData = new FormData();
    formData.append("AdminId", userInfo.UserId);

    fetch(apiServer + "GetSchedule", {
      method: "POST",
      headers: {
        'UserId': userInfo.UserId,
        'SessionId': userInfo.SessionId
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log('Fetched data:', data); // Log fetched data
      // Transform the data to match the expected format for ScheduleComponent
      const formattedData = data.map(item => ({
        Id: item.id,
        Subject: item.Subject,
        StartTime: new Date(item.StartTime).toISOString(),  // Ensure ISO string format
        EndTime: new Date(item.EndTime).toISOString(),      // Ensure ISO string format
        Description: item.Description || '',               // Handle undefined values
        Location: item.Location || '',                     // Handle undefined values
        IsAllDay: item.IsAllDay || false,                  // Handle undefined values
        //RecurrenceRule: item.RecurrenceRule || '',         // Handle undefined values
        CategoryColor: localStorage.getItem("colorMode")     // Example of adding a default color
      }));
          setScheduleList(formattedData);
    })
    .catch(err => console.error(err));
  }
}, [userInfo]);


const handleCreateSchedular= async (args) => {

 

  Show.showLoading("Processing Data");
    try {
  
  const formData = new FormData()
 
  const sdata = args.data[0];

  // Append necessary fields to formData
  formData.append("Description", sdata.Description);
  formData.append("StartTime", sdata.StartTime);  // Ensure StartTime is in correct format
  formData.append("EndTime", sdata.EndTime);      // Ensure EndTime is in correct format
  formData.append("StartTimezone", sdata.StartTimezone);
  formData.append("EndTimezone", sdata.EndTimezone);
  formData.append("Subject", sdata.Subject);
  formData.append("Location", sdata.Location);
  formData.append("IsAllDay", sdata.IsAllDay);
  formData.append("RecurrenceRule", sdata.RecurrenceRule);
  formData.append("ScheduleId", sdata.Id);


  
  
  formData.append("AdminId",userInfo.UserId)
  //console.table(formData)
  
      const response = await fetch(apiServer+"CreateSchedular", {
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
         window.location.reload()
        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {
  
      Show.Attention("An error has occured");
     
    }
  
  }
  
  const handleUpdateSchedular= async (args) => {

 

    Show.showLoading("Processing Data");
      try {
    
    const formData = new FormData()
   
    const sdata = args.data[0];
  
    formData.append("Id", sdata.Id);
    formData.append("Description", sdata.Description);
    formData.append("StartTime", sdata.StartTime);  // Ensure StartTime is in correct format
    formData.append("EndTime", sdata.EndTime);      // Ensure EndTime is in correct format
    formData.append("StartTimezone", sdata.StartTimezone);
    formData.append("EndTimezone", sdata.EndTimezone);
    formData.append("Subject", sdata.Subject);
    formData.append("Location", sdata.Location);
    formData.append("IsAllDay", sdata.IsAllDay);
    formData.append("RecurrenceRule", sdata.RecurrenceRule);
    formData.append("ScheduleId", sdata.Id);
  
  
    
    
    formData.append("AdminId",userInfo.UserId)
    //console.table(formData)
    
        const response = await fetch(apiServer+"UpdateSchedular", {
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
           window.location.reload()
          
        } else {
          Show.Attention(data.message);
        }
      } catch (error) {
    
        Show.Attention("An error has occured");
       
      }
    
    }
 
  const handleDeleteSchedular= async (args) => {

 

      Show.showLoading("Processing Data");
        try {
      
      const formData = new FormData()
     
      const sdata = args.data[0];
    
      formData.append("Id", sdata.Id);

       
      formData.append("AdminId",userInfo.UserId)
      //console.table(formData)
      
          const response = await fetch(apiServer+"DeleteSchedule", {
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
             window.location.reload()
            
          } else {
            Show.Attention(data.message);
          }
        } catch (error) {
      
          Show.Attention("An error has occured");
         
        }
      
      }




  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  const onActionComplete = (args) => {
    if (args.requestType === 'eventCreated') {
      //console.log('Event Created:', args.data[0].Subject);

      handleCreateSchedular(args);
    }
    if(args.requestType === 'eventChanged' ){
      handleUpdateSchedular(args)
     
    }

    if(args.requestType === 'eventRemoved' ){
      handleDeleteSchedular(args)
    }

  };

console.log(scheduleList)

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date()}
        eventSettings={{ dataSource: scheduleList }}
        dragStart={onDragStart}
        actionComplete={onActionComplete}
      >
        <ViewsDirective>
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={new Date()}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>

  );
};

export default Scheduler;
