// Hooks
import { useEffect } from "react";
// Libs
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// Constants
import { USER_ID, ACCESS_TOKEN_COOKIE } from "../constants/key";
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

  useEffect(() => {
    if (!Cookies.get(ACCESS_TOKEN_COOKIE)) {
      navigate("/auth/login");
    }
  }, []);

  const logOut = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(USER_ID);
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
              Simon Gin
            </ListItem>
            <ListItem
              className="text-xl font-bold flex flex-row justify-center gap-3 select-none"
              {...({} as any)}
            >
              <FaMailBulk />
              tm@gmail.com
            </ListItem>
            <ListItem
              className="text-xl font-bold flex flex-row justify-center gap-3 select-none"
              {...({} as any)}
            >
              <FaCalendar />
              01/01/2000
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
