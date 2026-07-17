import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ socket }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const getFullName = () => {
    let fname =
      user?.firstName.at(0).toUpperCase() +
      user?.firstName.slice(1).toLowerCase();

    let lname =
      user?.lastName.at(0).toUpperCase() +
      user?.lastName.slice(1).toLowerCase();
    return fname + " " + lname;
  };

  // const getInitials = () => {
  //   if (!user || !user.name) return "";

  //   return user.name
  //     .split(" ")
  //     .map((word) => word[0])
  //     .join("")
  //     .toUpperCase();
  // };
  function getInitials() {
    let f = user?.firstName?.toUpperCase()[0];
    let l = user?.lastName?.toUpperCase()[0];
    return f + l;
  }

  const logout = () => {
    socket.disconnect();

    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa-solid fa-message" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        {user?.profilePic && (
          <img
            src={user?.profilePic}
            alt="profile-pic"
            className="logged-user-profile-pic"
            onClick={() => {
              navigate("/profile");
            }}
          ></img>
        )}
        {!user?.profilePic && (
          <div
            className="logged-user-profile-pic"
            onClick={() => {
              navigate("/profile");
            }}
          >
            {getInitials() || null}
          </div>
        )}
        <div className="logged-user-name">{getFullName()}</div>

        <button className="logout-button" onClick={logout}>
          <i className="fa fa-power-off"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
