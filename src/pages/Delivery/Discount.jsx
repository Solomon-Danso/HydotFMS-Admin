import React, { useEffect, useState } from 'react';
import "../Website/Website.css";
import { AdmitButton3, AdmitStudentRole, FormInputDiscount, FormInputStudent, FormLable } from '../../data/Profile';
import { Header } from '../../components';
import Bigselector from '../../data/Bigselector';
import { AES, enc } from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { apiMedia, apiServer } from '../../data/Endpoint';
import { Show } from '../../data/Alerts';

const Roles = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [CustomerId, setCustomerId] = useState("");
  const [StaffMembers, setStaffMembers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [deadline, setDeadline] = useState(0);




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
      formData.append("AdminId", userInfo.UserId);
      
      fetch(apiServer + "ViewAllAdmin", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => setStaffMembers(data))
        .catch(error => console.error(error));
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.UserId) {
      const formData = new FormData();
      formData.append("AdminId", userInfo.UserId);

      fetch(apiServer + "ViewProductAdmin", {
        method: "POST",
        headers: {
          'UserId': userInfo.UserId,
          'SessionId': userInfo.SessionId
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          setProducts(Array.isArray(data) ? data : []);
        })
        .catch(error => console.error(error));
    }
  }, [userInfo]);

  const handleProductChange = (product) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter(p => p !== product);
      } else {
        return [...prevSelected, product];
      }
    });
  };

  const handleAssignProducts = async () => {
    Show.showLoading("Processing Data...");
    
    try {
      const productPromises = selectedProducts.map(async (product) => {
        const formData = new FormData();
        formData.append("DiscountPercentage", percentage);
        formData.append("ProductId", product.ProductId);
        formData.append("AdminId", userInfo.UserId);
        formData.append("ValidUntil", deadline);
  
        const response = await fetch(apiServer + "RunPromotion", {
          method: "POST",
          headers: {
            'UserId': userInfo.UserId,
            'SessionId': userInfo.SessionId
          },
          body: formData
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "An error has occurred");
        }
  
        return data.message;
      });
  
      const results = await Promise.all(productPromises);
  
      Show.hideLoading();
  
      results.forEach(message => Show.Success(message));
  
    } catch (error) {
      Show.hideLoading();
      Show.Attention(error.message || "An error has occurred");
    }
  };

  const handleRevertProducts = async () => {
    Show.showLoading("Processing Data...");
    
    try {
      const productPromises = selectedProducts.map(async (product) => {
        const formData = new FormData();
        formData.append("ProductId", product.ProductId);
        formData.append("AdminId", userInfo.UserId);
  
        const response = await fetch(apiServer + "RevertPromotion", {
          method: "POST",
          headers: {
            'UserId': userInfo.UserId,
            'SessionId': userInfo.SessionId
          },
          body: formData
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || "An error has occurred");
        }
  
        return data.message;
      });
  
      const results = await Promise.all(productPromises);
  
      Show.hideLoading();
  
      results.forEach(message => Show.Success(message));
  
    } catch (error) {
      Show.hideLoading();
      Show.Attention(error.message || "An error has occurred");
    }
  };

  const filteredProducts = products.filter(product =>
    product.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header category="Product Management" title="Discount" />
      <div className="wwd-column">
        <div className="Bigcard" style={{ backgroundColor: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white", padding: "2rem" }}>
          <div className="sec-title" style={{ color: localStorage.getItem("colorMode"), padding: "1rem" }}>Select Products</div>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: 1, marginRight: "1rem" }}>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Discount Percentage</FormLable>
              <FormInputDiscount
                type="number"
                required
                placeholder=""
                onChange={(e)=>{setPercentage(e.target.value)}}
              />
            </div>

            <div style={{ flex: 1 }}>
              <FormLable style={{ color: localStorage.getItem("colorMode") }}>Deadline</FormLable>
              <FormInputDiscount
                type="datetime-local"
                required
                placeholder=""
                onChange={(e)=>{setDeadline(e.target.value)}}
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "1rem", padding: "1rem", width: "100%", borderRadius:"1rem" }}
          />

          <div className='productSelector'>
            <div className="product-table-container">
              <table className="product-table">
                <thead>
                  <tr>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Select</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Picture</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Title</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Price</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Quantity</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Size</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Views</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Purchases</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Discounted Price</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Discount Percentage</th>
                    <th style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>Deadline</th>


                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.ProductId}>
                      <td style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
                        <input
                          type="checkbox"
                          value={product.ProductId}
                          onChange={() => handleProductChange(product)}
                          checked={selectedProducts.includes(product)}
                          style={{
                            width: "10px",
                            height: "10px",
                            transform: "scale(2)",
                          }}
                        />
                      </td>
                      <td style={{ color: localStorage.getItem("themeMode") === "Light" ? "#26293C" : "white" }}>
                        <img src={apiMedia + product.Picture} alt={product.Title} className="product-image" />
                      </td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.Title}</td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.Price}</td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.Quantity}</td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.Size}</td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.ViewsCounter}</td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.PurchaseCounter}</td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.DiscountPrice}</td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.DiscountPercentage} %</td>
                      <td style={{ color: localStorage.getItem("themeMode") !== "Light" ? "#26293C" : "white" }}>{product.ValidUntil}</td>
             
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <AdmitButton3
              background={localStorage.getItem("colorMode")}
              color="white"
              border={localStorage.getItem("colorMode")}
              style={{ marginBottom: "1rem" }}
              onClick={handleAssignProducts}
            >
              Apply Discount
            </AdmitButton3>

            <AdmitButton3
              background={localStorage.getItem("colorMode")}
              color="white"
              border={localStorage.getItem("colorMode")}
              style={{ marginBottom: "1rem" }}
              onClick={handleRevertProducts}
            >
              Revoke Discount
            </AdmitButton3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
