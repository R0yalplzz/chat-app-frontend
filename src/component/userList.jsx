import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createNewChat } from "../apiCall/chat";
import { hideLoader, showLoader } from "../features/loaderSlice";
import { setAllChats, setSelectedChat } from "../features/userSlice";
import moment from "moment";

function UsersList({ searchKey }) {
  const {
    allUsers = [],
    allChats = [],
    user: currentUser,
    selectedChat,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const startNewChat = async (searchedUserId) => {
    try {
      dispatch(showLoader());

      const response = await createNewChat([currentUser.id, searchedUserId]);

      dispatch(hideLoader());

      if (response?.success) {
        toast.success(response.message);

        const newChat = response.data;

        dispatch(setAllChats([...allChats, newChat]));
        dispatch(setSelectedChat(newChat));
      } else {
        toast.error(response?.message || "Failed to create chat");
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error("Failed to create chat");
      console.error(error);
    }
  };

  const openChat = (selectedUserId) => {
    const chat = allChats.find(
      (chat) =>
        chat.members?.includes(currentUser.id) &&
        chat.members?.includes(selectedUserId),
    );

    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  const IsSelectedChat = (user) => {
    if (!selectedChat) return false;

    return selectedChat.members?.includes(user.id);
  };

  const getLastMessageTimeStamp = (userId) => {
    const chat = allChats.find((chat) => chat.members.includes(userId));

    if (!chat || chat?.lastMessage) {
      return "";
    } else {
      return moment(chat?.lastMessage?.createdAt).format("hh:mm A");
    }
  };

  const getLastMessage = (userId) => {
    const chat = allChats.find((chat) => chat.members.includes(userId));

    if (!chat || !chat.lastMessage) {
      return "";
    } else {
      const msgPrefix =
        chat?.lastMessage?.sender === currentUser.id ? " you: " : "";
      return msgPrefix + chat?.lastMessage?.text?.substring(0, 25);
    }
  };
  function formatName(user) {
    let fname =
      user.firstName.at(0).toUpperCase() +
      user.firstName.slice(1).toLowerCase();

    let lname =
      user.lastName.at(0).toUpperCase() + user.lastName.slice(1).toLowerCase();
    return fname + " " + lname;
  }

  return allUsers
    .filter((user) => {
      const matchesSearch =
        searchKey &&
        (user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchKey.toLowerCase()));

      const hasChat = allChats.some((chat) => chat.members?.includes(user.id));

      return matchesSearch || hasChat;
    })
    .map((user) => {
      const hasExistingChat = allChats.some((chat) =>
        chat.members?.includes(user.id),
      );

      return (
        <div
          className="user-search-filter"
          key={user.id}
          onClick={() => openChat(user.id)}
        >
          <div
            className={IsSelectedChat(user) ? "selected-user" : "filtered-user"}
          >
            <div className="filter-user-display">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="user-profile-image"
                />
              ) : (
                <div
                  className={
                    IsSelectedChat(user)
                      ? "user-selected-avatar"
                      : "user-default-avatar"
                  }
                >
                  {user.firstName.charAt(0).toUpperCase()}
                  {user.lastName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="filter-user-details">
                <div className="user-display-name">{formatName(user)}</div>

                <div className="user-display-email">
                  {getLastMessage(user.id) || user.email}
                </div>
                <div className="last-message-timestamp">
                  {getLastMessageTimeStamp(user.id)}
                </div>
                {!allChats.find((chat) => chat.members.includes(user.id)) && (
                  <div className="user-start-chat">
                    <button
                      type="button"
                      className="user-start-chat-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        startNewChat(user.id);
                      }}
                    >
                      Start Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
}

export default UsersList;
