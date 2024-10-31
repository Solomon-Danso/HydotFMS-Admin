import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/champion'; // Import the links array
import { useStateContext } from '../contexts/ContextProvider';
import { apiServer } from '../data/Endpoint';
import { AES, enc } from 'crypto-js';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [RoleList, setRoleList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  
  const navigate = useNavigate();

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

  const hasRole = (roles) => {
    if (!Array.isArray(RoleList)) {
      console.error("RoleList is not an array");
      return false;
    }
    return RoleList.some(role => roles.includes(role.Function));
  };

  const toggleSection = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/main/DashBoard" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <span>Hydot FMS</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links
              .filter(section => section.permissions && section.permissions.some(permission => hasRole([permission.role])))
              .map((section) => (
                <div key={section.title}>
                  <div
                    className="flex items-center justify-between text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase cursor-pointer"
                    onClick={() => toggleSection(section.title)}
                  >
                    <p className="flex items-center gap-3 text-dark-400 dark:text-gray-400 m-3 mt-4 uppercase cursor-pointer">
      
                      {section.icon} {section.title}
                     </p>
                    {expandedSections[section.title] ? <FaChevronDown /> : <FaChevronRight />}
                  </div>
                  {expandedSections[section.title] && section.links
                    .filter(link => hasRole(link.roles?.map(r => r.role) || []))
                    .map((link) => (
                      <NavLink
                        to={`/main/${link.name}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {link.icon}
                        <span className="capitalize">{link.name}</span>
                      </NavLink>
                    ))}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
