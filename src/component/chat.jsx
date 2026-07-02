import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../features/loaderSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNewMessage, getAllMessages } from "./../apiCall/message";
import { clearUnreadMessageCount, getAllChats } from "./../apiCall/chat";
import moment from "moment";

function ChatArea() {
  const dispatch = useDispatch();
  const { selectedChat, user, allUsers, allChats } = useSelector(
    (state) => state.user,
  );
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  if (!selectedChat) {
    return <div>Select a chat</div>;
  }

  const selectedUser = selectedChat.members.find((u) => u.id !== user.id);

  const sendMessage = async () => {
    try {
      const newMessage = {
        chatId: selectedChat.id,
        sender: user.id,
        text: message,
      };
      dispatch(showLoader());
      const response = await createNewMessage(newMessage);

      dispatch(hideLoader());
      if (response.success) {
        setMessage("");
        getMessages();
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };
  const formattime = (timestamp) => {
    const now = moment();
    const diff = now.diff(moment(timestamp), "days");

    if (diff < 1) {
      return `Today ${moment(timestamp).format("hh:mm A")}`;
    } else if (diff === 1) {
      return `Yesterday ${moment(timestamp).format("hh:mm A")}`;
    } else {
      return moment(timestamp).format("MMM D, hh:mm A");
    }
  };

  const getMessages = async () => {
    try {
      dispatch(showLoader());

      const response = await getAllMessages(selectedChat.id);

      dispatch(hideLoader());

      if (response.success) {
        setAllMessages(response.data);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  const clearUnreadMessages = async () => {
    try {
      dispatch(showLoader());

      const response = await clearUnreadMessageCount(selectedChat.id);

      dispatch(hideLoader());

      if (response.success) {
        allChats.map((chat) => {
          if (chat.id === selectedChat.id) {
            return response.data;
          }
          return chat;
        });
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
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
  useEffect(() => {
    getMessages();
    if (selectedChat?.lastMessage?.sender !== user.id) {
      clearUnreadMessages();
    }
  }, [selectedChat]);
  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">{formatName(selectedUser)}</div>

          <div className="main-chat-area">
            {allMessages.map((msg) => {
              const isCurrentUserSender = msg.sender === user.id;

              return (
                <div
                  className="message-container"
                  style={
                    isCurrentUserSender
                      ? { justifyContent: "end" }
                      : { justifyContent: "start" }
                  }
                >
                  <div>
                    <div
                      className={
                        isCurrentUserSender
                          ? "send-message"
                          : "received-message"
                      }
                    >
                      {msg.text}
                    </div>
                    <div
                      className="message-timestamp"
                      style={
                        isCurrentUserSender
                          ? { float: "right" }
                          : { float: "left" }
                      }
                    >
                      {formattime(msg.createdAt)}
                      {isCurrentUserSender && msg.read && (
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                          style={{ color: "#e74c3c" }}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={sendMessage}
            ></button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatArea;
