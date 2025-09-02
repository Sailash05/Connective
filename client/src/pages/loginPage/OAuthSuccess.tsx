import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");

    if (token && userId) {
        // Store the credentials
        localStorage.setItem("Token", token);
        localStorage.setItem("UserId", userId);

        // Clear URL params for security
        window.history.replaceState({}, document.title, "/");

        // Redirect user to dashboard (or wherever)
        navigate("/home");
    }
    else {
        // If something failed, send them to login page
        navigate("/auth");
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
    
}

export default OAuthSuccess;