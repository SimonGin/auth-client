// Hooks
import { useState, useEffect } from "react";
// Libs
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// Constants
import { ACCESS_TOKEN_COOKIE } from "../constants/key";
// Components
import { Button, List, ListItem, Card } from "@material-tailwind/react";
// Icons
import {
  FaUserCircle,
  FaPowerOff,
  FaTag,
  FaMailBulk,
  FaCalendar,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    if (!Cookies.get(ACCESS_TOKEN_COOKIE)) {
      navigate("/auth/login");
    }
    console.log(Cookies.get(ACCESS_TOKEN_COOKIE));
    fetch(`${import.meta.env.VITE_API_URL}/me`, {
      credentials: "include",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_COOKIE)}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProfile(data.metadata);
        } else {
          Cookies.remove(ACCESS_TOKEN_COOKIE);
          navigate("/auth/login");
        }
      });
  }, []);

  const logOut = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    navigate("/auth/login");
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <FaUserCircle size={200} />
        <Card className="w-96" {...({} as any)}>
          <List {...({} as any)}>
            <ListItem
              className="text-xl font-bold flex flex-row justify-center gap-3 select-none"
              {...({} as any)}
            >
              <FaTag />
              {profile.name}
            </ListItem>
            <ListItem
              className="text-xl font-bold flex flex-row justify-center gap-3 select-none"
              {...({} as any)}
            >
              <FaMailBulk />
              {profile.email}
            </ListItem>
            <ListItem
              className="text-xl font-bold flex flex-row justify-center gap-3 select-none"
              {...({} as any)}
            >
              <FaCalendar />
              {formatDate(profile.createdAt)}
            </ListItem>
          </List>
        </Card>
        <Button
          onClick={logOut}
          color="red"
          className="w-48 my-2 flex flex-row items-center justify-center gap-2"
          {...({} as any)}
        >
          <FaPowerOff />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
