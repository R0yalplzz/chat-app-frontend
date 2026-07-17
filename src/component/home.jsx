import { useSelector } from "react-redux";
import ChatArea from "./chat";
import Header from "./header";
import SideBar from "./sidebar";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:8000");
function Home() {
  const { selectedChat, user } = useSelector((state) => state.user);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (!user) return;

    const handleConnect = () => {
      console.log("Connected:", socket.id);

      socket.emit("join-room", user.id);
      socket.emit("user-login", user.id);
    };

    const handleUsers = (users) => {
      setOnlineUser([...users]);
    };

    socket.on("online-users", handleUsers);
    socket.on("online-users-updated", handleUsers);

    if (socket.connected) {
      handleConnect();
    } else {
      socket.connect();
      socket.once("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("online-users", handleUsers);
      socket.off("online-users-updated", handleUsers);
    };
  }, [user, onlineUser]);

  return (
    <div className="home-page">
      <Header socket={socket}></Header>
      <div className="main-content">
        <SideBar socket={socket} onlineUser={onlineUser}></SideBar>
        {selectedChat && <ChatArea socket={socket}></ChatArea>}
      </div>
    </div>
  );
}

export default Home;
