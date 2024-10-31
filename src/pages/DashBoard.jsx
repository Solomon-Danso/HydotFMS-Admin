import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoChevronRight } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { BsKanban, BsBarChart, BsBoxSeam, BsShield, BsChatLeft } from 'react-icons/bs';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { websiteData,earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData, PortfolioStats} from '../data/champion';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import { FaPeopleGroup } from 'react-icons/fa6';
import { format } from 'date-fns';
import { MdOutlineLocalPolice, MdOutlineSecurity, MdOutlineSupervisorAccount, MdWork, MdWorkspaces } from 'react-icons/md';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { auditTrialData, contextMenuItems, auditTrialGrid } from '../data/champion';
import { colors } from '../data/Colors';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { apiMedia, apiServer } from '../data/Endpoint';
import { HiOutlineRefresh } from 'react-icons/hi';
import { GiSunkenEye } from 'react-icons/gi';
import { Search, Toolbar } from '@syncfusion/ej2-react-grids';
import { FcGlobe, FcProcess } from "react-icons/fc";
import { FaPeoplePulling } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdMarkEmailRead } from "react-icons/md";
import { GrShieldSecurity } from 'react-icons/gr';
import { SiSecurityscorecard } from 'react-icons/si';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const DashBoard = () => {
  const { currentColor, currentMode } = useStateContext();

  const currentMonthYear = format(new Date(), 'MMMM yyyy');
  const currentYear = format(new Date(), 'yyyy');
  const editing = { allowDeleting: false, allowEditing: true };



const iconMapper = (icon) =>{

  switch(icon){
    case "IoChatbubbleEllipsesOutline":
      return <IoChatbubbleEllipsesOutline/>
      break;
    case "MdMarkEmailRead":
      return < MdMarkEmailRead/>
      break;
    case "FcGlobe":
      return <FcGlobe/>
      break;
    case "FaPeoplePulling":
      return <FaPeoplePulling/>
      break;
    case "MdOutlineSupervisorAccount":
      return <MdOutlineSupervisorAccount/>
      break;
    case "BsBoxSeam":
        return <BsBoxSeam/>
        break;

    case "FiBarChart":
          return <FiBarChart/>
          break;
    case "HiOutlineRefresh":
            return <HiOutlineRefresh/>
            break;
    case "BsCurrencyDollar":
      return <BsCurrencyDollar/>
      break;
    case "BsShield":
        return <BsShield/>
        break;
    case "FiShoppingCart":
          return <FiShoppingCart/>
          break;
    case "GiSunkenEye":
            return <GiSunkenEye/>
            break;
    case "BsChatLeft":
              return <BsChatLeft/>
              break;

    case "GrShieldSecurity":
            return <GrShieldSecurity/>
            break;
    case "SiSecurityscorecard":
              return <SiSecurityscorecard/>
              break;
    case "MdOutlineSecurity":
                return <MdOutlineSecurity/>
                break;
    case "MdOutlineLocalPolice":
                  return <MdOutlineLocalPolice/>
                  break;






      

    default:
      return <MdOutlineSupervisorAccount/>
    
  }

}


  const navigate = useNavigate()

  function formatMoney(amount) {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatCount(amount) {
    return amount.toLocaleString();
  }

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


const [Totalsales, setTotalsales] = useState(0)

useEffect(() => {
  if (userInfo.UserId && userInfo.SessionId) {
    fetch(apiServer + "ViewTotalSales", {
      method: "POST",
      headers: {
        'UserId': userInfo.UserId,
        'SessionId': userInfo.SessionId
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.payments !== undefined) {
          setTotalsales(data.payments);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch(error => console.error(error));
  }
}, [userInfo]);



const [TotalExpenses, setTotalExpenses] = useState(0)

useEffect(() => {
  if (userInfo.UserId && userInfo.SessionId) {
    fetch(apiServer + "ViewTotalExpenses", {
      method: "POST",
      headers: {
        'UserId': userInfo.UserId,
        'SessionId': userInfo.SessionId
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.expenses !== undefined) {
          setTotalExpenses(data.expenses);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch(error => console.error(error));
  }
}, [userInfo]);

const [SparkLineData, setSparkLineData] = useState([]);
const [totalSales, setTotalSales] = useState(0)

useEffect(() => {
  if (userInfo.UserId && userInfo.SessionId) {
    fetch(apiServer + "ViewTotalSalesForCurrentMonth", {
      method: "POST",
      headers: {
        'UserId': userInfo.UserId,
        'SessionId': userInfo.SessionId
      },
    })
      .then(res => res.json())
      .then(data => {
        setSparkLineData(data.SparklineAreaData)
        setTotalSales(data.totalSales)
      })
      .catch(error => console.error(error));
  }
}, [userInfo]);

const [thisYearSales, setThisYearSales] = useState(0);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "ThisYearSales", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
             if (data.thisYearSales !== undefined) {
            setThisYearSales(data.thisYearSales);
          } else {
            console.error("thisYearSales not found in the response");
          }
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);

 
  const [yearListData, setyearListData] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "ViewTotalYearlySales", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
              setyearListData(data.payments);
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);


  const [Totalcustomers, setTotalcustomers] = useState(0);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "ViewTotalYearlySales", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {

          if (data.customers !== undefined) {
            setTotalcustomers(data.customers);
          } else {
            console.error("customers not found in the response");
          }
           
         
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);

  const [earnData, setearnData] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "EarningData", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
          setearnData(data.earningData);
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);



  const [rTransactionData, setrTransactionData] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "RecentTransaction", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
          setrTransactionData(data.recentTransactions);
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);



  const [weeklyStat, setweeklyStats] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "WeeklyStats", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
          setweeklyStats(data.weeklyStats);
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);


  const [topCustomers, settopCustomers] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "TopCustomers", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
          settopCustomers(data.topCustomers);
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);

  const [topPortfolio, settopPortfolio] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "TopTrendingPortfolio", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
          if (data.PortfolioStats !== undefined) {
            settopPortfolio(data.PortfolioStats);
          } else {
            console.error("Unexpected response format:", data);
          }
         
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);


  const [Audit, setAudit] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "Auditing", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
          if (data.auditTrials !== undefined) {
            setAudit(data.auditTrials);
          } else {
            console.error("Unexpected response format:", data);
          }
         
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);

  const [Totalvisitors, setTotalvisitors] = useState(0);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "CountVisitors", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {

          if (data.visitors !== undefined) {
            setTotalvisitors(data.visitors);
          } else {
            console.error("customers not found in the response");
          }
           
         
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);

  const [TheWebsiteData, setTheWebsiteData] = useState([]);

  useEffect(() => {
    if (userInfo.UserId && userInfo.SessionId) {
      fetch(apiServer + "CountCountryVisitors", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
      })
        .then(res => res.json())
        .then(data => {
           
          if (data !== undefined) {
            setTheWebsiteData(data);
          } else {
            console.error("Unexpected response format:", data);
          }
         
          
        })
        .catch(error => console.error(error));
    }
  }, [userInfo, apiServer]);



  return (
    <div className="mt-24">

      <div className="flex flex-wrap lg:flex-nowrap justify-center ">




        <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-white">Total Visitors</p>
              <p className="text-2xl text-white">{formatCount(Totalvisitors)}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: colors.body }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <FaPeopleGroup />
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={colors.body}
              text="View Visitors"
              borderRadius="10px"
              click="main/visitors"
            />
          </div>
          </div>



       
      <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {TheWebsiteData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {iconMapper(item.icon)}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
       

      </div>



      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl" style={{color:currentColor}}>Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoChevronRight />
                </span>
                <span>Earnings</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoChevronRight />
                </span>
                <span>Expenses</span>
              </p>
            </div>
          </div>

          <div  className="mt-10 flex gap-10 flex-wrap justify-center">
            <div  className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">₵{formatMoney(Totalsales)}</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                   
                  {((Totalsales * 100) / (Totalsales + TotalExpenses)).toFixed(2)}%

                  </span>
                </p>
                <p className="text-gray-500 mt-1">Earnings</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold" style={{color:"red"}}>₵{formatMoney(TotalExpenses)}</p>

                <p className="text-gray-500 mt-1" style={{color:"brown"}}>Expense</p>
              </div>

              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="View BreakDown"
                  borderRadius="10px"
                  click="main/payments"
                />
              </div>
            </div>
            
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>

          </div>
        </div>



        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">₵{formatMoney(totalSales)}</p>
                <p className="text-gray-200">{currentMonthYear}, revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine currentColor={currentColor} id="column-sparkLine" height="100px" type="Column" data={SparkLineData} width="320" color="rgb(242, 252, 253)" />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">₵{formatMoney(thisYearSales)}</p>
              <p className="text-gray-400">{currentYear} sales</p>
            </div>

            <div className="w-40">
              <Pie id="pie-chart" data={yearListData} legendVisiblity={false} height="160px" />
            </div>
          </div>
        </div>
      </div>


      <div  className="flex flex-wrap lg:flex-nowrap justify-center ">

      <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
          <div className="flex justify-between items-center">
            <div >
              <p className="font-bold text-white">Total Earnings</p>
              <p className="text-2xl text-white">₵{formatMoney(Totalsales)}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
             ₵
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={colors.body}
              text="View Earnings"
              borderRadius="10px"
             click="main/payments"
            />
          </div>
        </div>

        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earnData.map((item) => (
          
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {iconMapper(item.icon)}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{formatMoney(item.amount)}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>





      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold" style={{color:currentColor}}>Recent Transactions</p>
           
          </div>
          <div className="mt-10 w-72 md:w-400">
            {rTransactionData.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {iconMapper(item.icon)}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{formatMoney(item.amount)}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold" style={{color:currentColor}}>Sales Overview</p>
           
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>



      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold" style={{color:currentColor}}>Weekly Stats</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
            {weeklyStat.map((item) => (
              <div key={item.title} className="flex justify-between mt-4 w-full">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {iconMapper(item.icon)}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
      
          </div>

        </div>

        
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold" style={{color:currentColor}}>Top Customers</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
            {topCustomers.map((item) => (
              <div key={item.title} className="flex justify-between mt-4 w-full">
                <div className="flex gap-4">
                 
                  <div>
                    <p className="text-md font-semibold">{item.title} ({item.userId})</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>₵{item.amount}</p>
              </div>
            ))}
      
          </div>

        </div>


        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold" style={{color:currentColor}}>Top Trending Portfolios</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
            {topPortfolio.map((item) => (
              <div key={item.title} className="flex justify-between mt-4 w-full">
                <div className="flex gap-4">
                     
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>₵{item.amount}</p>
              </div>
            ))}
      
          </div>

        </div>


      </div>


<div style={{marginTop:"5rem"}}>

<GridComponent
       id="gridcomp"
      toolbar={['Search']}  // Add the search bar
      dataSource={Audit}
      allowPaging
      allowSorting
      allowExcelExport
      allowPdfExport
      contextMenuItems={contextMenuItems}
      editSettings={editing}
      style={{ backgroundColor: localStorage.getItem("colorMode") }}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {auditTrialGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>
      <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Toolbar]} />
    </GridComponent>

</div>
     



    </div>
  );
};

export default DashBoard;
