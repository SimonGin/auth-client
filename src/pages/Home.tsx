import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE } from "../constants/key";
import { Link } from "react-router-dom";
import { Button, Alert } from "@material-tailwind/react";
import { RiLoginBoxLine } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";
import { FaUserCircle, FaPowerOff } from "react-icons/fa";
const HomePage = () => {
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    fetch(`https://fluffy-express-api.vercel.app/profile`, {
      credentials: "include",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_COOKIE)}`,
        "Access-Control-Allow-Origin": "https://fluffy-express-api.vercel.app",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      });
  }, [authorized]);

  const logOut = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    setAuthorized(false);
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5">
          {authorized ? (
            <Alert
              icon={<FaUserCircle />}
              color="green"
              className="flex flex-row  items-center gap-2"
            >
              You have logged in
            </Alert>
          ) : (
            <Alert
              icon={<TiWarning />}
              color="red"
              className="flex flex-row  items-center gap-2"
            >
              You haven't logged in yet
            </Alert>
          )}
          <Link to="/profile">
            <Button
              color="blue"
              className="w-48 my-2 flex flex-row items-center justify-center gap-2"
              {...({} as any)}
            >
              <FaUserCircle />
              Profile page
            </Button>
          </Link>
          {authorized ? (
            <Button
              onClick={logOut}
              color="red"
              className="w-48 my-2 flex flex-row items-center justify-center gap-2"
              {...({} as any)}
            >
              <FaPowerOff />
              Log Out
            </Button>
          ) : (
            <Link to="/login">
              <Button
                color="blue"
                className="w-48 my-2 flex flex-row items-center justify-center gap-2"
                {...({} as any)}
              >
                Log In
                <RiLoginBoxLine />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
