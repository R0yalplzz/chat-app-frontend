import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../features/loaderSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNewMessage, getAllMessages } from "./../apiCall/message";
import { clearUnreadMessageCount, getAllChats } from "./../apiCall/chat";
import moment from "moment";
import { store } from "../store/store";
import EmojiPicker from "emoji-picker-react";

function ChatArea({ socket }) {
  const dispatch = useDispatch();
  const { selectedChat, user, allUsers, allChats } = useSelector(
    (state) => state.user,
  );
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (!selectedChat) {
    return <div>Select a chat</div>;
  }

  const selectedUser = selectedChat.members.find((u) => u.id !== user.id);

  const sendMessage = async (image) => {
    try {
      const newMessage = {
        chatId: selectedChat.id,
        sender: user.id,
        text: message,
        image: image,
      };

      socket.emit("send-message", {
        ...newMessage,
        members: selectedChat.members.map((m) => m.id),
        read: false,
        createdAt: moment().format("YYY-MM-DD HH:mm:ss"),
      });
      const response = await createNewMessage(newMessage);
      if (response.success) {
        setMessage("");
        setShowEmojiPicker(false);
        getMessages();
      }
    } catch (error) {
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
      socket.emit("clear-unread-messages", {
        chatId: selectedChat.id,
        members: selectedChat.members.map((m) => m.id),
      });

      const response = await clearUnreadMessageCount(selectedChat.id);

      if (response.success) {
        allChats.map((chat) => {
          if (chat.id === selectedChat.id) {
            return response.data;
          }
          return chat;
        });
      }
    } catch (error) {
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

  const sendImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      sendMessage(reader.result);
    };
  };

  useEffect(() => {
    getMessages();
    if (selectedChat?.lastMessage?.sender !== user.id) {
      clearUnreadMessages();
    }
    socket.on("receive-message", (message) => {
      const selectedChat = store.getState().user.selectedChat;
      if (selectedChat.id === message.chatId) {
        setAllMessages((prevmsg) => [...prevmsg, message]);
      }
      if (selectedChat.id === message.chatId && message.sender !== user.id) {
        clearUnreadMessages();
      }
    });

    socket.on("message-count-cleared", (data) => {
      const selectedChat = store.getState().user.selectedChat;
      const allChats = store.getState().user.allChats;
      if (selectedChat.id === data.chatId) {
        //Updating unread message count in chat object
        const updatedChats = allChats.map((chat) => {
          if (chat.id === data.chatId) {
            return {
              ...chat,
              unreadMessageCount: 0,
            };
          }
          return chat;
        });
        dispatch(setAllChats(updatedChats));
        //updating read property in message object

        setAllMessages((prevMsgs) => {
          return prevMsgs.map((msg) => {
            return { ...msg, read: true };
          });
        });
      }
    });

    socket.on("started-typing", (data) => {
      if (selectedChat.id === data.chatId && data.sender !== user.id) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    });
  }, [selectedChat]);

  useEffect(() => {
    const msgContainer = document.getElementById("main-chat-area");
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, [allMessages, isTyping]);
  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">{formatName(selectedUser)}</div>

          <div className="main-chat-area" id="main-chat-area">
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
                      <div>{msg.text}</div>
                      <div>
                        {msg.image && (
                          <img
                            src={msg.image}
                            alt="image"
                            height="120"
                            width="120"
                          ></img>
                        )}
                      </div>
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
            <div className="typing-indicator">
              {isTyping && <i>typing...</i>}
            </div>
          </div>
          {showEmojiPicker && (
            <div>
              <EmojiPicker
                onEmojiClick={(e) => setMessage(message + e.emoji)}
              ></EmojiPicker>
            </div>
          )}

          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                socket.emit("user-typing", {
                  chatId: selectedChat.id,
                  members: selectedChat.members.map((m) => m.id),
                  sender: user.id,
                });
              }}
            />
            <label for="file">
              <i className="fa fa-picture-o send-image-btn"></i>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={sendImage}
              ></input>
            </label>

            <button
              className="fa-regular fa-face-smile send-emoji-btn"
              aria-hidden="true"
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
              }}
            ></button>

            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={() => sendMessage("")}
            ></button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatArea;
