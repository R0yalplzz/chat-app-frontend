import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user?.profilePic) {
      setImage(user.profilePic);
    }
  }, [user]);

  function getInitials() {
    let f = user?.firstName?.toUpperCase()[0];
    let l = user?.lastName?.toUpperCase()[0];
    return f + l;
  }

  const getFullName = () => {
    let fname =
      user?.firstName.at(0).toUpperCase() +
      user?.firstName.slice(1).toLowerCase();

    let lname =
      user?.lastName.at(0).toUpperCase() +
      user?.lastName.slice(1).toLowerCase();
    return fname + " " + lname;
  };

  const onFileSelect = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      setImage(reader.result);
    };
  };
  return (
    <div className="profile-page-container">
      <div className="profile-pic-container">
        {image && (
          <img
            src={image}
            alt="Profile Pic"
            className="user-profile-pic-upload"
          />
        )}
        {!image &&(
          <div className="user-default-profile-avatar">{getInitials()}</div>
        )}
      </div>

      <div className="profile-info-container">
        <div className="user-profile-name">
          <h1>{getFullName()}</h1>
        </div>
        <div>
          <b>Email: </b>
          {user?.email}
        </div>
        <div>
          <b>Account Created: </b>
          {moment(user?.createdAt).format("MMM DD, YYYY")}
        </div>
        <div className="select-profile-pic-container">
          <input type="file" onChange={onFileSelect} />
        </div>
      </div>
    </div>
  );
}
export default Profile;
