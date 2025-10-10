import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  const handleLogout = () => {
    fetch(import.meta.env.VITE_LOGOUT_API_URL, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    }).then((res) => {
      if (res.status == 200) {
        alert("You've successfully been logged out!");
        onLogout(false);
        navigate("/login");
      } else {
        console.log("Cookie not deleted, error", res);
      }
    });
  };

  useEffect(() => {
    if (hasLoggedOut.current) return;
    hasLoggedOut.current = true;
    handleLogout();
  }, []);

  return <div>Logout</div>;
}
