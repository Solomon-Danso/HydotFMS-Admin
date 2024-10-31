import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { apiServer } from '../data/Endpoint';

const ProtectedRoute = ({ element: Component, roles }) => {
  const [RoleList, setRoleList] = useState([]);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const encryptedData = sessionStorage.getItem("userDataEnc");
    const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
    try {
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
      setUserInfo(parsedData);
    } catch (error) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (userInfo) {
      const formData = new FormData();
      formData.append("UserId", userInfo.UserId);

      fetch(apiServer + "ViewUserFunctions", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setRoleList(data);
          } else {
            console.error("Invalid data format", data);
          }
        })
        .catch(error => console.error(error));
    }
  }, [userInfo]);

  // Function to check if a role is in the user's roles
  const hasRole = (role) => RoleList.some(r => r.Function === role);

  // Check if the user has access
  const hasAccess = hasRole("SuperAdmin") || roles.some(role => hasRole(role.role));

  return hasAccess ? <Component /> : <Navigate to="/roles" />;
};

export default ProtectedRoute;
