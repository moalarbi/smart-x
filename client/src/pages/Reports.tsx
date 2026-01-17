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
  Download,
  Calendar,
  TrendingUp,
  LineChart,
  PieChart,
} from "lucide-react";
import { Link } from "wouter";

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthState();
  const [, setLocation] = useLocation();
  const [dateRange, setDateRange] = useState("month");

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

  const kpiData = [
    {
      label: "إجمالي المكالمات",
      value: "2,847",
      change: "+12.5%",
      icon: Phone,
    },
    {
      label: "متوسط مدة المكالمة",
      value: "4:32",
      change: "+5.2%",
      icon: BarChart3,
    },
    {
      label: "معدل الإجابة",
      value: "94.2%",
      change: "+2.1%",
      icon: TrendingUp,
    },
    {
      label: "رضا العملاء",
      value: "4.8/5",
      change: "+0.3%",
      icon: TrendingUp,
    },
  ];

  const teamPerformance = [
    { name: "أحمد محمد", calls: 342, avgDuration: "5:12", satisfaction: "4.9" },
    { name: "فاطمة علي", calls: 298, avgDuration: "4:45", satisfaction: "4.7" },
    { name: "محمود سالم", calls: 276, avgDuration: "4:28", satisfaction: "4.6" },
    { name: "سارة حسن", calls: 251, avgDuration: "4:15", satisfaction: "4.5" },
    { name: "علي خالد", calls: 189, avgDuration: "3:52", satisfaction: "4.4" },
  ];

  const channelStats = [
    { channel: "WhatsApp", messages: 5420, percentage: 45 },
    { channel: "Email", messages: 2180, percentage: 18 },
    { channel: "SMS", messages: 2890, percentage: 24 },
    { channel: "Instagram", messages: 890, percentage: 7 },
    { channel: "Telegram", messages: 520, percentage: 6 },
  ];

  const hourlyData = [
    { hour: "12 AM", calls: 45 },
    { hour: "1 AM", calls: 32 },
    { hour: "2 AM", calls: 28 },
    { hour: "3 AM", calls: 22 },
    { hour: "4 AM", calls: 18 },
    { hour: "5 AM", calls: 25 },
    { hour: "6 AM", calls: 45 },
    { hour: "7 AM", calls: 78 },
    { hour: "8 AM", calls: 125 },
    { hour: "9 AM", calls: 189 },
    { hour: "10 AM", calls: 245 },
    { hour: "11 AM", calls: 278 },
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
              <h1 className="text-2xl font-bold">التقارير والتحليلات</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">مرحباً، {user?.username || "المستخدم"}</span>
              <div className="w-10 h-10 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {/* Filters */}
          <div className="flex gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              >
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="quarter">هذا الربع</option>
                <option value="year">هذه السنة</option>
              </select>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Download className="w-4 h-4 ml-2" />
              تحميل PDF
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              <Download className="w-4 h-4 ml-2" />
              تحميل Excel
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={index}
                  className="p-6 border border-gray-300 rounded bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Icon className="w-8 h-8 text-red-600" />
                    <span className="text-sm font-semibold text-green-600">
                      {kpi.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-2">{kpi.label}</h3>
                  <p className="text-3xl font-bold">{kpi.value}</p>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Hourly Activity Chart */}
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-red-600" />
                النشاط بالساعة
              </h2>
              <div className="space-y-3">
                {hourlyData.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-16 text-sm text-gray-600">{data.hour}</span>
                    <div className="flex-1 h-6 bg-gray-100 rounded relative overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded transition-all"
                        style={{ width: `${(data.calls / 300) * 100}%` }}
                      ></div>
                    </div>
                    <span className="w-12 text-right text-sm font-semibold">
                      {data.calls}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Distribution */}
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-red-600" />
                توزيع القنوات
              </h2>
              <div className="space-y-3">
                {channelStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-gray-600">
                      {stat.channel}
                    </span>
                    <div className="flex-1 h-6 bg-gray-100 rounded relative overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded transition-all flex items-center justify-end pr-2"
                        style={{ width: `${stat.percentage}%` }}
                      >
                        {stat.percentage > 15 && (
                          <span className="text-white text-xs font-semibold">
                            {stat.percentage}%
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="w-16 text-right text-sm font-semibold">
                      {stat.messages}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Performance Table */}
          <div className="p-6 border border-gray-300 rounded bg-white mb-8">
            <h2 className="text-lg font-bold mb-4">أداء الفريق</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      اسم الموظف
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      عدد المكالمات
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      متوسط المدة
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      رضا العملاء
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      الترتيب
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamPerformance.map((member, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">{member.name}</td>
                      <td className="py-3 px-4 text-center font-semibold">
                        {member.calls}
                      </td>
                      <td className="py-3 px-4 text-center">{member.avgDuration}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                          {member.satisfaction}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white font-bold">
                          {index + 1}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h3 className="text-gray-600 text-sm mb-2">إجمالي الرسائل</h3>
              <p className="text-3xl font-bold">12,890</p>
              <p className="text-sm text-green-600 mt-2">+8.2% من الأسبوع الماضي</p>
            </div>
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h3 className="text-gray-600 text-sm mb-2">وقت الانتظار المتوسط</h3>
              <p className="text-3xl font-bold">2:15</p>
              <p className="text-sm text-green-600 mt-2">-12.5% من الأسبوع الماضي</p>
            </div>
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h3 className="text-gray-600 text-sm mb-2">معدل التحويل</h3>
              <p className="text-3xl font-bold">87.3%</p>
              <p className="text-sm text-green-600 mt-2">+3.1% من الأسبوع الماضي</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
