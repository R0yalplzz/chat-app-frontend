import { useSelector } from "react-redux";
import ChatArea from "./chat";
import Header from "./header";
import SideBar from "./sidebar";
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:8000");
function Home() {
  const { selectedChat, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      socket.emit("join-room", user.id);
    }
  }, [user]);
  return (
    <div className="home-page">
      <Header></Header>
      <div className="main-content">
        <SideBar></SideBar>
        {selectedChat && <ChatArea socket={socket}></ChatArea>}
      </div>
    </div>
  );
}

export default Home;
