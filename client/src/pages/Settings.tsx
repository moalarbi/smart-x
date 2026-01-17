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
  Save,
  Bell,
  Lock,
  Building2,
  User,
  Mail,
  Globe,
  Eye,
  EyeOff,
  Smartphone,
  CreditCard,
  Shield,
  Zap,
} from "lucide-react";
import { Link } from "wouter";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthState();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@smartx.com",
    phone: "+966501234567",
    companyName: "شركة سمارت اكس",
    companyEmail: "info@smartx.com",
    companyPhone: "+966920033333",
    website: "www.smartx.com",
    address: "الرياض، المملكة العربية السعودية",
    timezone: "Asia/Riyadh",
  });

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

  const tabs = [
    { id: "account", label: "حسابي", icon: User },
    { id: "company", label: "الشركة", icon: Building2 },
    { id: "notifications", label: "الإشعارات", icon: Bell },
    { id: "security", label: "الأمان", icon: Lock },
    { id: "billing", label: "الفواتير", icon: CreditCard },
    { id: "integrations", label: "التكاملات", icon: Zap },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
              <h1 className="text-2xl font-bold">الإعدادات</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">مرحباً، {user?.username || "المستخدم"}</span>
              <div className="w-10 h-10 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Tabs Navigation */}
            <div className="lg:col-span-1">
              <div className="border border-gray-300 rounded p-4 space-y-2 sticky top-24">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors text-right ${
                        activeTab === tab.id
                          ? "bg-red-600 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {/* Account Tab */}
              {activeTab === "account" && (
                <div className="border border-gray-300 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">معلومات الحساب الشخصي</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">الاسم الأول</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">الاسم الأخير</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">المنطقة الزمنية</label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                      >
                        <option value="Asia/Riyadh">الرياض (UTC+3)</option>
                        <option value="Asia/Dubai">دبي (UTC+4)</option>
                        <option value="Asia/Kuwait">الكويت (UTC+3)</option>
                        <option value="Europe/London">لندن (UTC+0)</option>
                      </select>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ التغييرات
                    </Button>
                  </div>
                </div>
              )}

              {/* Company Tab */}
              {activeTab === "company" && (
                <div className="border border-gray-300 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">معلومات الشركة</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">اسم الشركة</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">البريد الإلكتروني للشركة</label>
                        <input
                          type="email"
                          name="companyEmail"
                          value={formData.companyEmail}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">هاتف الشركة</label>
                        <input
                          type="tel"
                          name="companyPhone"
                          value={formData.companyPhone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">الموقع الإلكتروني</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">العنوان</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ التغييرات
                    </Button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="border border-gray-300 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">إعدادات الإشعارات</h2>
                  <div className="space-y-4">
                    {[
                      { label: "إشعارات المكالمات الجديدة", enabled: true },
                      { label: "إشعارات الرسائل الجديدة", enabled: true },
                      { label: "إشعارات تقارير الأداء", enabled: false },
                      { label: "إشعارات تحديثات النظام", enabled: true },
                      { label: "إشعارات تنبيهات الأمان", enabled: true },
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded">
                        <span className="font-semibold">{notification.label}</span>
                        <input
                          type="checkbox"
                          defaultChecked={notification.enabled}
                          className="w-5 h-5 rounded"
                        />
                      </div>
                    ))}
                    <Button className="bg-red-600 hover:bg-red-700 text-white w-full mt-6">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ التغييرات
                    </Button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="border border-gray-300 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">إعدادات الأمان</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">تغيير كلمة المرور</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">كلمة المرور الحالية</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="أدخل كلمة المرور الحالية"
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute left-3 top-3"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">كلمة المرور الجديدة</label>
                          <input
                            type="password"
                            placeholder="أدخل كلمة المرور الجديدة"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">تأكيد كلمة المرور</label>
                          <input
                            type="password"
                            placeholder="أعد إدخال كلمة المرور الجديدة"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 pt-6">
                      <h3 className="text-lg font-semibold mb-4">المصادقة الثنائية</h3>
                      <p className="text-gray-600 mb-4">قم بتفعيل المصادقة الثنائية لحماية حسابك بشكل أفضل</p>
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        <Shield className="w-4 h-4 ml-2" />
                        تفعيل المصادقة الثنائية
                      </Button>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ التغييرات
                    </Button>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <div className="border border-gray-300 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">إدارة الفواتير والاشتراكات</h2>
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-300 rounded bg-gray-50">
                      <h3 className="text-lg font-semibold mb-4">الخطة الحالية</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">الخطة</p>
                          <p className="text-xl font-bold">Pro</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">السعر الشهري</p>
                          <p className="text-xl font-bold">999 ر.س</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">تاريخ التجديد</p>
                          <p className="text-xl font-bold">2026-02-17</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">الحالة</p>
                          <p className="text-xl font-bold text-green-600">نشطة</p>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                      ترقية الخطة
                    </Button>
                  </div>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === "integrations" && (
                <div className="border border-gray-300 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">التكاملات الخارجية</h2>
                  <div className="space-y-4">
                    {[
                      { name: "Stripe", status: "متصل", icon: CreditCard },
                      { name: "Google Workspace", status: "غير متصل", icon: Mail },
                      { name: "Slack", status: "متصل", icon: Smartphone },
                      { name: "Zapier", status: "غير متصل", icon: Zap },
                    ].map((integration, index) => {
                      const Icon = integration.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded">
                          <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-red-600" />
                            <div>
                              <p className="font-semibold">{integration.name}</p>
                              <p className={`text-sm ${integration.status === "متصل" ? "text-green-600" : "text-gray-600"}`}>
                                {integration.status}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                            {integration.status === "متصل" ? "قطع الاتصال" : "الاتصال"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
