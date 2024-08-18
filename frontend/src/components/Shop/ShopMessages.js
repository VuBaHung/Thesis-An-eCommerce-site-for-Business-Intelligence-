import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import socketIo from "socket.io-client";
import styles from "../../styles/styles";
import { format } from "timeago.js";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });
const ShopMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const { user } = useSelector((state) => state.user);
  const [conversation, setConversation] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  // Get conversation
  useEffect(() => {
    const messageList = async () => {
      try {
        await axios
          .get(`${server}/chat/get-all-seller-conversation/${seller[0]._id}`)
          .then((res) => setConversation(res.data.conversation));
      } catch (error) {
        console.log(error);
      }
    };
    messageList();
  }, [seller]);
  //getMessages
  useEffect(() => {
    const getMessage = async () => {
      try {
        await axios
          .get(`${server}/chat/get-all-messages/${currentChat._id}`)
          .then((res) => {
            setMessages(res.data.messages);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);
  //step 1: get userID and socketId from server
  useEffect(() => {
    if (seller) {
      const userId = seller[0]._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);
  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller[0]._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    online ? setActiveStatus(true) : setActiveStatus(false);
  };

  //createNewMessages
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: seller[0]._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member.id !== seller[0]._id
    );
    socketId.emit("sendMessage", {
      senderId: seller[0]._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/chat/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessagesId: seller[0].id,
    });
    await axios
      .put(`${server}/chat/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessagesId: seller[0].id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((err) => console.log(err));
  };
  console.log({ user });
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {conversation &&
            conversation.map((item, index) => (
              <MessagesList
                conversation={item}
                key={index}
                index={index}
                open={open}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller[0]._id}
                userData={user}
                setUserData={setUserData}
                online={activeStatus}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          messages={messages}
          setMessages={setMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          sellerId={seller[0]._id}
          userData={user}
          online={activeStatus}
        />
      )}
    </div>
  );
};

const MessagesList = ({
  conversation,
  index,
  open,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard-messages/${id}`);
    setOpen(true);
  };

  useEffect(() => {
    const userId = conversation.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/get-user/${userId}`);
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, conversation]);

  return (
    <div
      className={`w-full flex p-2 px-3 border-[1px] ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      } cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(conversation._id) ||
        setCurrentChat(conversation)
      }
    >
      <div className="relative">
        <img
          src={`${userData?.avatar}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />

        {online ? (
          <div className="w-[15px] h-[15px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
        ) : (
          <div className="w-[15px] h-[15px] bg-gray-400 rounded-full absolute top-[2px] right-[2px]"></div>
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{userData?.name}</h1>
        <p className="text-[15px] text-[#000c]">
          {conversation.lastMessagesId !== userData?._id
            ? "You:"
            : userData?.name.split(" ")[0] + ": "}
          {conversation?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  messages,
  setMessages,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  sellerId,
  userData,
  online,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src={`${userData?.avatar}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{online ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => {
            return (
              <div
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                // ref={scrollRef}
                key={index}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${userData?.avatar}`}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                {item.images && (
                  <img
                    src={`${item.images?.url}`}
                    className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                    alt=""
                  />
                )}
                {item.text !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded ${
                        item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                      } text-[#fff] h-min`}
                    >
                      <p>{item.text}</p>
                    </div>

                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* send message input */}
      <form
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px] mb-[20px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            // onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer " size={25} />
          </label>
        </div>
        <div className="w-full items-center">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={25}
              className="absolute right-5 top-8 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};
export default ShopMessages;
