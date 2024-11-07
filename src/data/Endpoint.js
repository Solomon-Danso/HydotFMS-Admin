const isLocalhost = window.location.hostname === "localhost";

// Set API endpoints based on environment
export const apiServer = isLocalhost 
  ? "http://127.0.0.1:8000/api/" 
  : "https://motorsapi.hydottech.com/api/";

export const apiMedia = isLocalhost 
  ? "http://127.0.0.1:8000/storage/" 
  : "https://motorsapi.hydottech.com/storage/";
