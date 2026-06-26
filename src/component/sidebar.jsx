import { useState } from "react";
import Search from "./Search";
import UsersList from "./userList";

const SideBar = () => {
  const [searchKey, setSearchKey] = useState("");
  return (
    <div className="app-sidebar">
      <Search searchKey={searchKey} setSearchKey={setSearchKey}></Search>
      <UsersList searchKey={searchKey}></UsersList>
    </div>
  );
};

export default SideBar;
