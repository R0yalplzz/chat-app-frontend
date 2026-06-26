import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user); // ← Fixed this line
  // console.log(user);
  const getFullName = () => {
    let fname =
      user?.firstName.at(0).toUpperCase() +
      user?.firstName.slice(1).toLowerCase();

    let lname =
      user?.lastName.at(0).toUpperCase() + user?.lastName.slice(1).toLowerCase();
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
  const getInitials = () => {
    let f = user?.firstName?.toUpperCase()[0];
    let l = user?.lastName?.toUpperCase()[0];
    return f + l;
  };
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa-solid fa-message" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">{getFullName()}</div>
        <div className="logged-user-profile-pic">{getInitials() || null}</div>
      </div>
    </div>
  );
};

export default Header;
