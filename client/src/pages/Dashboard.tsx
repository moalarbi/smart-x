import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
} from "lucide-react";
import { Link } from "wouter";

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
              <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">مرحباً، {user?.username || "المستخدم"}</span>
              <div className="w-10 h-10 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 border border-gray-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded ${
                      stat.color === "red" ? "bg-red-100" :
                      stat.color === "blue" ? "bg-blue-100" :
                      stat.color === "green" ? "bg-green-100" :
                      "bg-purple-100"
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        stat.color === "red" ? "text-red-600" :
                        stat.color === "blue" ? "text-blue-600" :
                        stat.color === "green" ? "text-green-600" :
                        "text-purple-600"
                      }`} />
                    </div>
                  </div>
                  <p className="text-green-600 text-sm font-semibold">{stat.change}</p>
                </Card>
              );
            })}
          </div>

          {/* Recent Calls Table */}
          <Card className="p-6 border border-gray-300">
            <h2 className="text-xl font-bold mb-4">آخر المكالمات</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-right py-3 px-4 font-semibold">المتصل</th>
                    <th className="text-right py-3 px-4 font-semibold">الرقم</th>
                    <th className="text-right py-3 px-4 font-semibold">المدة</th>
                    <th className="text-right py-3 px-4 font-semibold">الحالة</th>
                    <th className="text-right py-3 px-4 font-semibold">الوقت</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCalls.map((call) => (
                    <tr key={call.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{call.caller}</td>
                      <td className="py-3 px-4 text-gray-600">{call.number}</td>
                      <td className="py-3 px-4 font-semibold">{call.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded text-sm font-semibold ${
                          call.status === "completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {call.status === "completed" ? "مكتملة" : "مفقودة"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{call.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Alerts */}
            <Card className="lg:col-span-2 p-6 border border-gray-300">
              <h2 className="text-xl font-bold mb-4">التنبيهات والإشعارات</h2>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex gap-4 p-4 bg-gray-50 rounded border border-gray-200">
                    <div className={`p-2 rounded ${
                      alert.type === "warning" ? "bg-yellow-100" :
                      alert.type === "info" ? "bg-blue-100" :
                      "bg-green-100"
                    }`}>
                      {alert.type === "warning" ? <AlertCircle className="w-5 h-5 text-yellow-600" /> :
                       alert.type === "info" ? <Clock className="w-5 h-5 text-blue-600" /> :
                       <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{alert.title}</p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border border-gray-300">
              <h2 className="text-xl font-bold mb-4">إجراءات سريعة</h2>
              <div className="space-y-3">
                <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white justify-center">
                  <Phone className="w-4 h-4 ml-2" />
                  مكالمة جديدة
                </Button>
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white justify-center">
                  <MessageSquare className="w-4 h-4 ml-2" />
                  رسالة جديدة
                </Button>
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white justify-center">
                  <BarChart3 className="w-4 h-4 ml-2" />
                  تقرير جديد
                </Button>
              </div>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card className="p-6 border border-gray-300">
            <h2 className="text-xl font-bold mb-4">أداء اليوم</h2>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600">سيتم عرض الرسم البياني هنا</p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
