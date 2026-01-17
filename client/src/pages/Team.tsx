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
  Plus,
  Edit2,
  Trash2,
  Search,
  Mail,
  Phone as PhoneIcon,
  Calendar,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "wouter";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "supervisor" | "agent" | "viewer";
  department: string;
  joinDate: string;
  status: "active" | "inactive" | "on_leave";
  performance: number;
}

export default function Team() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthState();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@smartx.com",
      phone: "+966501234567",
      role: "admin",
      department: "الإدارة",
      joinDate: "2024-01-15",
      status: "active",
      performance: 95,
    },
    {
      id: 2,
      name: "فاطمة علي",
      email: "fatima@smartx.com",
      phone: "+966509876543",
      role: "supervisor",
      department: "المبيعات",
      joinDate: "2024-02-20",
      status: "active",
      performance: 88,
    },
    {
      id: 3,
      name: "محمود سالم",
      email: "mahmoud@smartx.com",
      phone: "+966505555555",
      role: "agent",
      department: "خدمة العملاء",
      joinDate: "2024-03-10",
      status: "active",
      performance: 82,
    },
    {
      id: 4,
      name: "سارة حسن",
      email: "sarah@smartx.com",
      phone: "+966502222222",
      role: "agent",
      department: "خدمة العملاء",
      joinDate: "2024-03-15",
      status: "on_leave",
      performance: 79,
    },
    {
      id: 5,
      name: "علي خالد",
      email: "ali@smartx.com",
      phone: "+966503333333",
      role: "agent",
      department: "التسويق",
      joinDate: "2024-04-01",
      status: "active",
      performance: 75,
    },
    {
      id: 6,
      name: "ليلى أحمد",
      email: "layla@smartx.com",
      phone: "+966504444444",
      role: "viewer",
      department: "التقارير",
      joinDate: "2024-04-10",
      status: "inactive",
      performance: 0,
    },
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.includes(searchTerm) || member.email.includes(searchTerm);
    const matchesRole = filterRole === "all" || member.role === filterRole;
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "مسؤول";
      case "supervisor":
        return "مشرف";
      case "agent":
        return "وكيل";
      case "viewer":
        return "مشاهد";
      default:
        return role;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">نشط</span>;
      case "inactive":
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">غير نشط</span>;
      case "on_leave":
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">في إجازة</span>;
      default:
        return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";
      case "supervisor":
        return "bg-blue-100 text-blue-700";
      case "agent":
        return "bg-green-100 text-green-700";
      case "viewer":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
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
              <h1 className="text-2xl font-bold">إدارة الفريق</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">مرحباً، {user?.username || "المستخدم"}</span>
              <div className="w-10 h-10 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">فريق العمل</h2>
              <p className="text-gray-600">إدارة أعضاء الفريق والصلاحيات</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="w-4 h-4 ml-2" />
              إضافة موظف جديد
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن موظف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
            >
              <option value="all">جميع الأدوار</option>
              <option value="admin">مسؤول</option>
              <option value="supervisor">مشرف</option>
              <option value="agent">وكيل</option>
              <option value="viewer">مشاهد</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="on_leave">في إجازة</option>
            </select>
          </div>

          {/* Team Members Table */}
          <div className="border border-gray-300 rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">الاسم</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">البريد الإلكتروني</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">الدور</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">القسم</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">الحالة</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">الأداء</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.joinDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {member.email}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(member.role)}`}>
                          {getRoleLabel(member.role)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">{member.department}</td>
                      <td className="py-4 px-6">{getStatusBadge(member.status)}</td>
                      <td className="py-4 px-6">
                        {member.performance > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-600 transition-all"
                                style={{ width: `${member.performance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold">{member.performance}%</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedMember(member);
                              setShowModal(true);
                            }}
                            className="p-2 hover:bg-blue-100 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h3 className="text-gray-600 text-sm mb-2">إجمالي الموظفين</h3>
              <p className="text-3xl font-bold">{teamMembers.length}</p>
              <p className="text-sm text-green-600 mt-2">+2 هذا الشهر</p>
            </div>
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h3 className="text-gray-600 text-sm mb-2">الموظفين النشطين</h3>
              <p className="text-3xl font-bold">{teamMembers.filter(m => m.status === "active").length}</p>
              <p className="text-sm text-green-600 mt-2">100% متاح</p>
            </div>
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h3 className="text-gray-600 text-sm mb-2">متوسط الأداء</h3>
              <p className="text-3xl font-bold">83%</p>
              <p className="text-sm text-green-600 mt-2">+5% من الشهر الماضي</p>
            </div>
            <div className="p-6 border border-gray-300 rounded bg-white">
              <h3 className="text-gray-600 text-sm mb-2">الإجازات</h3>
              <p className="text-3xl font-bold">{teamMembers.filter(m => m.status === "on_leave").length}</p>
              <p className="text-sm text-yellow-600 mt-2">في الإجازة حالياً</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
