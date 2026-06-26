import { useSelector } from "react-redux";
import ChatArea from "./chat";
import Header from "./header";
import SideBar from "./sidebar";
function Home() {
  const { selectedChat } = useSelector((state) => state.user);
  return (
    <div className="home-page">
      <Header></Header>
      <div className="main-content">
        <SideBar></SideBar>
        {selectedChat && <ChatArea></ChatArea>}
      </div>
    </div>
  );
}

export default Home;
