import { useState } from "react";
import Search from "./Search";
import UsersList from "./userList";

const SideBar = ({ socket, onlineUser }) => {
  const [searchKey, setSearchKey] = useState("");
  return (
    <div className="app-sidebar">
      <Search searchKey={searchKey} setSearchKey={setSearchKey}></Search>
      <UsersList
        searchKey={searchKey}
        socket={socket}
        onlineUser={onlineUser}
      ></UsersList>
    </div>
  );
};

export default SideBar;
