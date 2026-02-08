import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

// Connect to the socket server
const socket = io.connect("http://localhost:5000");

const Message = () => {
  const { id } = useParams(); // This is the conversationId
  const [messages, setMessages] = useState([]);
  const [writeMsg, setWriteMsg] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 1. Join the specific chat room
  useEffect(() => {
    socket.emit("join_room", id);
  }, [id]);

  // 2. Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup when leaving the page
    return () => socket.off("receive_message");
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${id}`, { withCredentials: true });
      setMessages(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchMessages(); }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!writeMsg) return;

    const messageData = {
      conversationId: id,
      desc: writeMsg,
      userId: currentUser._id,
    };

    try {
      // Save to Database
      await axios.post(`http://localhost:5000/api/messages`, messageData, { withCredentials: true });
      
      // Send to Socket (Real-time)
      socket.emit("send_message", messageData);

      // Add to our own UI
      setMessages((prev) => [...prev, messageData]);
      setWriteMsg("");
    } catch (err) { console.log(err); }
  };

  return (
    <div className="pt-32 px-10 flex flex-col items-center">
      <div className="w-full max-w-3xl flex flex-col gap-5 h-[500px] overflow-y-scroll p-5 border rounded-md bg-white shadow-inner">
        {messages.map((m, index) => (
          <div key={index} className={`flex gap-3 max-w-[70%] ${m.userId === currentUser._id ? "self-end flex-row-reverse" : "self-start"}`}>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className="w-8 h-8 rounded-full" />
            <div className={`p-3 rounded-2xl shadow-sm ${m.userId === currentUser._id ? "bg-green-600 text-white rounded-tr-none" : "bg-gray-200 text-gray-800 rounded-tl-none"}`}>
              {m.desc}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl flex mt-5 gap-2 pb-10">
        <input 
          type="text" placeholder="Type a message..." className="flex-1 p-4 border rounded-full shadow-sm outline-green-500"
          value={writeMsg} onChange={(e) => setWriteMsg(e.target.value)}
        />
        <button className="bg-green-600 text-white px-10 py-4 rounded-full font-bold hover:bg-green-700 transition">Send</button>
      </form>
    </div>
  );
};

export default Message;