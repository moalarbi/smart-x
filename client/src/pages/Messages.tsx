import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Send,
  Search,
  Plus,
  Phone,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState("");

  const conversations = [
    {
      id: 1,
      customerName: "أحمد محمد",
      customerPhone: "+966501234567",
      channels: ["whatsapp", "email"],
      lastMessage: "شكراً على الخدمة الممتازة",
      lastMessageTime: "10:30 AM",
      status: "active",
      unread: 2,
    },
    {
      id: 2,
      customerName: "فاطمة علي",
      customerPhone: "+966509876543",
      channels: ["instagram", "sms"],
      lastMessage: "متى يتوفر المنتج الجديد؟",
      lastMessageTime: "09:15 AM",
      status: "active",
      unread: 0,
    },
    {
      id: 3,
      customerName: "محمود سالم",
      customerPhone: "+966505555555",
      channels: ["telegram"],
      lastMessage: "تم حل المشكلة",
      lastMessageTime: "Yesterday",
      status: "resolved",
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "أحمد محمد",
      content: "السلام عليكم، أريد الاستفسار عن الخدمات",
      channel: "whatsapp",
      time: "10:00 AM",
      direction: "inbound",
    },
    {
      id: 2,
      sender: "Support",
      content: "وعليكم السلام، كيف يمكننا مساعدتك؟",
      channel: "whatsapp",
      time: "10:05 AM",
      direction: "outbound",
    },
    {
      id: 3,
      sender: "أحمد محمد",
      content: "أريد معرفة أسعار الخطط المختلفة",
      channel: "whatsapp",
      time: "10:10 AM",
      direction: "inbound",
    },
    {
      id: 4,
      sender: "Support",
      content: "تم إرسال الأسعار إليك عبر البريد الإلكتروني",
      channel: "email",
      time: "10:15 AM",
      direction: "outbound",
    },
    {
      id: 5,
      sender: "أحمد محمد",
      content: "شكراً على الخدمة الممتازة",
      channel: "whatsapp",
      time: "10:30 AM",
      direction: "inbound",
    },
  ];

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  return (
    <div className="h-screen flex flex-col bg-white" dir="rtl">
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className="w-full md:w-80 border-l border-gray-300 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-xl font-bold mb-4">المحادثات</h2>
            <div className="relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                  selectedConversation === conv.id
                    ? "bg-red-50 border-l-4 border-red-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold">{conv.customerName}</p>
                  {conv.unread > 0 && (
                    <span className="bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conv.lastMessage}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-1">
                    {conv.channels.map((ch) => (
                      <span
                        key={ch}
                        className="text-xs px-2 py-1 bg-gray-100 rounded"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {conv.lastMessageTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col hidden md:flex">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{selectedConv.customerName}</p>
                  <p className="text-sm text-gray-600">
                    {selectedConv.customerPhone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.direction === "outbound"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.direction === "outbound"
                          ? "bg-gray-100 text-gray-900"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs opacity-70">{msg.time}</span>
                        <span className="text-xs px-2 py-0.5 bg-black bg-opacity-20 rounded">
                          {msg.channel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-300">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="اكتب رسالتك..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  />
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">اختر محادثة للبدء</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
