import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: BarChart3, label: "لوحة التحكم", href: "/dashboard" },
    { icon: Phone, label: "المكالمات", href: "/calls" },
    { icon: MessageSquare, label: "الرسائل", href: "/messages" },
    { icon: Users, label: "الفريق", href: "/team" },
    { icon: BarChart3, label: "التقارير", href: "/reports" },
    { icon: Settings, label: "الإعدادات", href: "/settings" },
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
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-900 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-6 right-6 left-6">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-900 transition-colors border-t border-gray-800 pt-6"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "mr-64" : "mr-0"}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-300 sticky top-0 z-30">
          <div className="px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-600"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">لوحة التحكم</h1>
            <p className="text-gray-700">مرحباً بك في Smart X</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Phone,
                label: "المكالمات اليومية",
                value: "1,234",
                change: "+12%",
                color: "red",
              },
              {
                icon: MessageSquare,
                label: "الرسائل",
                value: "5,678",
                change: "+8%",
                color: "blue",
              },
              {
                icon: Users,
                label: "المستخدمين النشطين",
                value: "45",
                change: "+3%",
                color: "green",
              },
              {
                icon: TrendingUp,
                label: "معدل الرضا",
                value: "94%",
                change: "+2%",
                color: "purple",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="p-6 border border-gray-300 hover:border-red-600 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-green-600 text-sm mt-2">{stat.change}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-red-600 opacity-20" />
                </div>
              </Card>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Calls */}
            <div className="lg:col-span-2">
              <Card className="p-6 border border-gray-300">
                <h2 className="text-xl font-bold mb-4">المكالمات الأخيرة</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-right py-3 px-4 font-semibold">
                          المتصل
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          المدة
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          الحالة
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          الوقت
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          caller: "أحمد محمد",
                          duration: "5:23",
                          status: "مكتملة",
                          time: "10:30 AM",
                        },
                        {
                          caller: "فاطمة علي",
                          duration: "3:45",
                          status: "مكتملة",
                          time: "10:15 AM",
                        },
                        {
                          caller: "محمود سالم",
                          duration: "7:12",
                          status: "مكتملة",
                          time: "09:50 AM",
                        },
                        {
                          caller: "سارة حسن",
                          duration: "2:30",
                          status: "مكتملة",
                          time: "09:30 AM",
                        },
                      ].map((call, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">{call.caller}</td>
                          <td className="py-3 px-4">{call.duration}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-green-100 text-green-700 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              {call.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {call.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="p-6 border border-gray-300 mb-6">
                <h2 className="text-xl font-bold mb-4">الإجراءات السريعة</h2>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white justify-start">
                    <Phone className="w-4 h-4 ml-2" />
                    مكالمة جديدة
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-black text-black hover:bg-black hover:text-white justify-start"
                  >
                    <MessageSquare className="w-4 h-4 ml-2" />
                    رسالة جديدة
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-black text-black hover:bg-black hover:text-white justify-start"
                  >
                    <BarChart3 className="w-4 h-4 ml-2" />
                    عرض التقارير
                  </Button>
                </div>
              </Card>

              {/* Alerts */}
              <Card className="p-6 border border-gray-300">
                <h2 className="text-xl font-bold mb-4">التنبيهات</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">
                        استهلاك الحزمة مرتفع
                      </p>
                      <p className="text-xs text-gray-600">
                        تم استهلاك 85% من الحزمة
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded border border-blue-200">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">
                        تحديث النظام متاح
                      </p>
                      <p className="text-xs text-gray-600">
                        نسخة جديدة متاحة للتحديث
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Performance Chart */}
          <Card className="p-6 border border-gray-300 mt-6">
            <h2 className="text-xl font-bold mb-4">أداء المكالمات</h2>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">سيتم عرض الرسم البياني هنا</p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
