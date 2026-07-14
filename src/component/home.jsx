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
    if (user) {
      socket.emit("join-room", user.id);
      socket.emit("user-login", user.id);
      socket.on("online-users", (onlineUsers) => {
        setOnlineUser(onlineUsers);
      });

      socket.on("online-user-update", (onlineUsers) => {
        setOnlineUser(onlineUsers);
      });
    }
  }, [user]);
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
