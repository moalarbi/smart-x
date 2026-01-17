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
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  PhoneOff,
  Download,
  RefreshCw,
} from "lucide-react";
import { Link } from "wouter";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthState();
  const [, setLocation] = useLocation();

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

  const stats = [
    { label: "إجمالي المكالمات", value: "1,234", change: "+12%", icon: Phone, color: "red" },
    { label: "المحادثات النشطة", value: "45", change: "+5%", icon: MessageSquare, color: "blue" },
    { label: "الفريق النشط", value: "23", change: "+2%", icon: Users, color: "green" },
    { label: "معدل الرضا", value: "94%", change: "+3%", icon: TrendingUp, color: "purple" },
  ];

  const recentCalls = [
    { id: 1, caller: "أحمد محمد", number: "+966501234567", duration: "5:23", status: "completed", time: "10:30 AM" },
    { id: 2, caller: "فاطمة علي", number: "+966509876543", duration: "3:45", status: "completed", time: "10:15 AM" },
    { id: 3, caller: "محمود سالم", number: "+966505555555", duration: "0:00", status: "missed", time: "09:50 AM" },
    { id: 4, caller: "سارة حسن", number: "+966502222222", duration: "7:12", status: "completed", time: "09:30 AM" },
  ];

  const alerts = [
    { id: 1, title: "مكالمة مفقودة", message: "تم تفويت مكالمة من محمود سالم", time: "منذ 40 دقيقة", type: "warning" },
    { id: 2, title: "رسالة جديدة", message: "رسالة جديدة من أحمد محمد عبر WhatsApp", time: "منذ 15 دقيقة", type: "info" },
    { id: 3, title: "تقرير يومي", message: "تم إنشاء التقرير اليومي بنجاح", time: "منذ 2 ساعة", type: "success" },
  ];

  // Data for charts
  const lineChartData = [
    { time: "12 AM", calls: 45, messages: 32 },
    { time: "2 AM", calls: 32, messages: 28 },
    { time: "4 AM", calls: 28, messages: 22 },
    { time: "6 AM", calls: 45, messages: 35 },
    { time: "8 AM", calls: 78, messages: 65 },
    { time: "10 AM", calls: 125, messages: 98 },
    { time: "12 PM", calls: 189, messages: 145 },
    { time: "2 PM", calls: 245, messages: 178 },
    { time: "4 PM", calls: 198, messages: 156 },
    { time: "6 PM", calls: 156, messages: 134 },
    { time: "8 PM", calls: 89, messages: 76 },
    { time: "10 PM", calls: 56, messages: 45 },
  ];

  const barChartData = [
    { day: "الأحد", inbound: 240, outbound: 221 },
    { day: "الاثنين", inbound: 221, outbound: 229 },
    { day: "الثلاثاء", inbound: 229, outbound: 200 },
    { day: "الأربعاء", inbound: 200, outbound: 248 },
    { day: "الخميس", inbound: 248, outbound: 210 },
    { day: "الجمعة", inbound: 210, outbound: 229 },
    { day: "السبت", inbound: 229, outbound: 200 },
  ];

  const pieChartData = [
    { name: "WhatsApp", value: 45 },
    { name: "Email", value: 18 },
    { name: "SMS", value: 24 },
    { name: "Instagram", value: 7 },
    { name: "Telegram", value: 6 },
  ];

  const COLORS = ["#dc2626", "#2563eb", "#16a34a", "#f59e0b", "#8b5cf6"];

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
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-gray-600">مرحباً، {user?.username || "المستخدم"}</span>
              <div className="w-10 h-10 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="p-6 border border-gray-300 rounded bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Icon className="w-8 h-8 text-red-600" />
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-2">{stat.label}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Line Chart */}
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h2 className="text-lg font-bold mb-4">النشاط على مدار اليوم</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="#dc2626"
                    strokeWidth={2}
                    dot={{ fill: "#dc2626", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="المكالمات"
                  />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: "#2563eb", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="الرسائل"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h2 className="text-lg font-bold mb-4">المكالمات الواردة والصادرة</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="inbound" fill="#dc2626" name="واردة" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="outbound" fill="#2563eb" name="صادرة" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart and Recent Calls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Pie Chart */}
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h2 className="text-lg font-bold mb-4">توزيع القنوات</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Calls */}
            <div className="lg:col-span-2 p-6 border border-gray-300 rounded bg-white">
              <h2 className="text-lg font-bold mb-4">المكالمات الأخيرة</h2>
              <div className="space-y-3">
                {recentCalls.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{call.caller}</p>
                        <p className="text-xs text-gray-500">{call.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{call.duration}</p>
                        <p className="text-xs text-gray-500">{call.time}</p>
                      </div>
                      {call.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <PhoneOff className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="p-6 border border-gray-300 rounded bg-white">
            <h2 className="text-lg font-bold mb-4">الإشعارات والتنبيهات</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-4 p-4 rounded border-l-4 ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border-l-yellow-400"
                      : alert.type === "info"
                      ? "bg-blue-50 border-l-blue-400"
                      : "bg-green-50 border-l-green-400"
                  }`}
                >
                  <div
                    className={`p-2 rounded ${
                      alert.type === "warning"
                        ? "bg-yellow-200"
                        : alert.type === "info"
                        ? "bg-blue-200"
                        : "bg-green-200"
                    }`}
                  >
                    {alert.type === "warning" ? (
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    ) : alert.type === "info" ? (
                      <Clock className="w-5 h-5 text-blue-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{alert.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
