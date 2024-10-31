import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import { AdmitButton3, AdmitStudentRole } from '../../data/Profile';
import { Header } from '../../components';
import Bigselector from '../../data/Bigselector';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';

const RevokeRoles = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [CustomerId, setCustomerId] = useState("");
  const [StaffMembers, setStaffMembers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [UserOldRole, setUserOldRole] = useState([]);

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

    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    if (userInfo.UserId) {
      const formData = new FormData();
      formData.append("AdminId",userInfo.UserId)
      
      fetch(apiServer + "ViewAllAdmin", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body:formData
      })
        .then(res => res.json())
        .then(data => setStaffMembers(data))
        .catch(error => console.error(error));
    }
  }, [userInfo]);


  useEffect(() => {
    if (userInfo.UserId && CustomerId) {
      const formData = new FormData();
      formData.append("UserId", CustomerId);

      fetch(apiServer + "ViewUserFunctions", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => setUserOldRole(data || []))  // Ensure it's an array
        .catch(error => console.error(error));
    }
  }, [userInfo, CustomerId]);

  const handleRoleChange = (role) => {
    setSelectedRoles(prevRoles => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter(r => r !== role);
      } else {
        return [...prevRoles, role];
      }
    });
  };



  return (
    <div>
      <Header category="System Operations" title="View Roles" />
      <div className="wwd-column">
        <div className="Bigcard" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "2rem" }}>View Roles</div>
          <AdmitStudentRole>
            <Bigselector placeholder="Select Staff Member" dataList={StaffMembers} dataKey="UserId" dataValue="Username" setMethod={(method) => setCustomerId(method)} />
          </AdmitStudentRole>

          <div className='roleSelector'>
            {UserOldRole.map(role => (
              <div key={role.Function} className='roleItem'>
                <label className='roleLabel'>
                  <input
                    type="checkbox"
                    value={role.Function}
                    onChange={() => handleRoleChange(role.Function)}
                    checked={selectedRoles.includes(role.Function)}
                  />
                  <span className='roleText' style={{ color: localStorage.getItem("colorMode") }}>
                    {role.Function.replace(/_/g, ' ')}
                  </span>
                </label>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default RevokeRoles;
