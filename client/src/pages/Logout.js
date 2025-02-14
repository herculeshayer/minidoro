import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  try {
    const navigate = useNavigate();

    const handleLogout = () => {
      fetch(process.env.REACT_APP_LOGOUT_API_URL, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.status == 200) {
          console.log("Coookie deleted", res);
          onLogout(false);
          navigate("/login");
        } else {
          console.log("Cookie not deleted, error", res);
        }
      });
    };

    useEffect(() => {
      handleLogout();
    });
  } catch (error) {
    throw console.error("Error with Logout: ", error);
  }

  return <div>Logout</div>;
}
