import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";

const TOKEN_DURATION = 30 * 60 * 1000; // 5 minutes validity
function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  function handleClick() {
    setMessage("");
    const expiry = Date.now() + TOKEN_DURATION;
    sessionStorage.setItem(
      "access",
      JSON.stringify({ granted: true, expiry})
    );
    navigate("/test");
  }
  return (
    <>
      <p>{message}</p>
      <Button onClick={handleClick}>Click Me to redirect</Button>
      <Link to="/something">
        <Button>Go to Page Not Found</Button>
      </Link>
    </>
  );
}

export default Home;