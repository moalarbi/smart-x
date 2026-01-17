import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/useAuthState";
import {
  BarChart3,
  Phone,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Send,
  User,
  MessageCircle,
  Mail,
  Instagram,
  Check,
  CheckCheck,
  Paperclip,
} from "lucide-react";
import { Link } from "wouter";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  channel: "whatsapp" | "email" | "sms" | "instagram" | "telegram";
  status: "active" | "closed" | "pending";
  messages: Message[];
}

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthState();
  const [, setLocation] = useLocation();
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterChannel, setFilterChannel] = useState("all");
  const [newMessage, setNewMessage] = useState("");

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  const menuItems = [
    { icon: BarChart3, label: "لوحة التحكم", href: "/dashboard" },
    { icon: Phone, label: "المكالمات", href: "/calls" },
    { icon: MessageSquare, label: "الرسائل", href: "/messages" },
    { icon: Users, label: "الفريق", href: "/team" },
    { icon: BarChart3, label: "التقارير", href: "/reports" },
    { icon: Settings, label: "الإعدادات", href: "/settings" },
  ];

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "أحمد محمد",
      avatar: "AM",
      lastMessage: "شكراً على المساعدة",
      lastMessageTime: "الآن",
      unreadCount: 3,
      channel: "whatsapp",
      status: "active",
      messages: [
        { id: 1, sender: "أحمد", content: "السلام عليكم", timestamp: "10:00 AM", isOwn: false, status: "read" },
        { id: 2, sender: "أنت", content: "وعليكم السلام ورحمة الله", timestamp: "10:01 AM", isOwn: true, status: "read" },
        { id: 3, sender: "أحمد", content: "أريد الاستفسار عن الخدمات", timestamp: "10:02 AM", isOwn: false, status: "read" },
        { id: 4, sender: "أنت", content: "تفضل، كيف يمكنني مساعدتك؟", timestamp: "10:03 AM", isOwn: true, status: "read" },
        { id: 5, sender: "أحمد", content: "شكراً على المساعدة", timestamp: "10:05 AM", isOwn: false, status: "read" },
      ],
    },
    {
      id: 2,
      name: "فاطمة علي",
      avatar: "FA",
      lastMessage: "تم الاتفاق على الموعد",
      lastMessageTime: "منذ ساعة",
      unreadCount: 0,
      channel: "email",
      status: "active",
      messages: [
        { id: 1, sender: "فاطمة", content: "السلام عليكم", timestamp: "09:00 AM", isOwn: false, status: "read" },
        { id: 2, sender: "أنت", content: "وعليكم السلام", timestamp: "09:05 AM", isOwn: true, status: "read" },
      ],
    },
    {
      id: 3,
      name: "محمود سالم",
      avatar: "MS",
      lastMessage: "هل يمكنك مساعدتي؟",
      lastMessageTime: "منذ ساعتين",
      unreadCount: 1,
      channel: "sms",
      status: "pending",
      messages: [
        { id: 1, sender: "محمود", content: "هل يمكنك مساعدتي؟", timestamp: "08:00 AM", isOwn: false, status: "delivered" },
      ],
    },
    {
      id: 4,
      name: "سارة حسن",
      avatar: "SH",
      lastMessage: "شكراً على الخدمة",
      lastMessageTime: "أمس",
      unreadCount: 0,
      channel: "instagram",
      status: "closed",
      messages: [
        { id: 1, sender: "سارة", content: "مرحبا", timestamp: "أمس", isOwn: false, status: "read" },
      ],
    },
    {
      id: 5,
      name: "علي خالد",
      avatar: "AK",
      lastMessage: "موافق على العرض",
      lastMessageTime: "منذ 3 أيام",
      unreadCount: 0,
      channel: "telegram",
      status: "active",
      messages: [
        { id: 1, sender: "علي", content: "موافق على العرض", timestamp: "منذ 3 أيام", isOwn: false, status: "read" },
      ],
    },
    {
      id: 6,
      name: "ليلى أحمد",
      avatar: "LA",
      lastMessage: "متى موعد الاجتماع؟",
      lastMessageTime: "منذ 5 أيام",
      unreadCount: 2,
      channel: "whatsapp",
      status: "active",
      messages: [
        { id: 1, sender: "ليلى", content: "متى موعد الاجتماع؟", timestamp: "منذ 5 أيام", isOwn: false, status: "read" },
      ],
    },
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.includes(searchTerm);
    const matchesFilter = filterChannel === "all" || conv.channel === filterChannel;
    return matchesSearch && matchesFilter;
  });

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageCircle className="w-5 h-5 text-green-600" />;
      case "email":
        return <Mail className="w-5 h-5 text-blue-600" />;
      case "sms":
        return <MessageCircle className="w-5 h-5 text-purple-600" />;
      case "instagram":
        return <Instagram className="w-5 h-5 text-pink-600" />;
      case "telegram":
        return <Send className="w-5 h-5 text-cyan-600" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return "WhatsApp";
      case "email":
        return "البريد الإلكتروني";
      case "sms":
        return "رسالة نصية";
      case "instagram":
        return "Instagram";
      case "telegram":
        return "Telegram";
      default:
        return channel;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">نشطة</span>;
      case "pending":
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">قيد الانتظار</span>;
      case "closed":
        return <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">مغلقة</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen bg-black text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden z-40`}
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600"></div>
            <span className="text-xl font-bold">Smart X</span>
          </div>
        </div>

        <nav className="p-6 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} href={item.href}>
                <a className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-900 transition-colors cursor-pointer">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white justify-center">
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "mr-64" : "mr-0"}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-300 sticky top-0 z-30">
          <div className="flex justify-between items-center p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold">الرسائل والمحادثات</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">مرحباً، {user?.username || "المستخدم"}</span>
              <div className="w-10 h-10 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
            {/* Conversations List */}
            <div className="lg:col-span-1 flex flex-col border border-gray-300 rounded overflow-hidden">
              {/* Search and Filter */}
              <div className="p-4 border-b border-gray-300 space-y-3">
                <div className="relative">
                  <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن محادثة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                  />
                </div>
                <select
                  value={filterChannel}
                  onChange={(e) => setFilterChannel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600 text-sm"
                >
                  <option value="all">جميع القنوات</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">البريد الإلكتروني</option>
                  <option value="sms">رسالة نصية</option>
                  <option value="instagram">Instagram</option>
                  <option value="telegram">Telegram</option>
                </select>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                      selectedConversation === conv.id ? "bg-red-50 border-r-4 border-r-red-600" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold truncate">{conv.name}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {getChannelIcon(conv.channel)}
                          <span className="text-xs text-gray-500">{getChannelLabel(conv.channel)}</span>
                        </div>
                      </div>
                      {conv.unreadCount > 0 && (
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {currentConversation && (
              <div className="lg:col-span-2 flex flex-col border border-gray-300 rounded overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {currentConversation.avatar}
                    </div>
                    <div>
                      <h2 className="font-semibold">{currentConversation.name}</h2>
                      <div className="flex items-center gap-2">
                        {getChannelIcon(currentConversation.channel)}
                        <span className="text-xs text-gray-500">{getChannelLabel(currentConversation.channel)}</span>
                        {getStatusBadge(currentConversation.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                      <User className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {currentConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.isOwn
                            ? "bg-white border border-gray-300"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className={`flex items-center gap-1 mt-1 text-xs ${msg.isOwn ? "text-gray-500" : "text-red-100"}`}>
                          <span>{msg.timestamp}</span>
                          {msg.isOwn && (
                            msg.status === "read" ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-300 bg-white">
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white p-2">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <input
                      type="text"
                      placeholder="اكتب رسالتك..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                    />
                    <Button className="bg-red-600 hover:bg-red-700 text-white p-2">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
