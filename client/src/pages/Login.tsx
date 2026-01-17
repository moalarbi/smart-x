import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // محاكاة تأخير الخادم
    setTimeout(() => {
      if (username.trim() && password.trim()) {
        // حفظ بيانات المستخدم في localStorage
        localStorage.setItem("user", JSON.stringify({
          username: username,
          loginTime: new Date().toISOString(),
        }));
        // إعادة التوجيه إلى Dashboard
        setLocation("/dashboard");
      } else {
        setError("الرجاء إدخال اسم المستخدم وكلمة المرور");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white text-2xl font-bold">SX</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Smart X</h1>
          <p className="text-gray-600">منصة الاتصالات المتكاملة</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold mb-2">اسم المستخدم</label>
              <Input
                type="text"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
              <p className="text-xs text-gray-500 mt-1">يمكنك إدخال أي اسم مستخدم</p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">كلمة المرور</label>
              <Input
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
              />
              <p className="text-xs text-gray-500 mt-1">يمكنك إدخال أي كلمة مرور</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded mt-6"
            >
              {loading ? "جاري التحميل..." : "تسجيل الدخول"}
            </Button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded">
            <p className="text-sm text-blue-700 font-semibold mb-2">🔓 وضع التجربة</p>
            <p className="text-xs text-blue-600">
              يمكنك تسجيل الدخول باستخدام أي اسم مستخدم وكلمة مرور. هذا وضع تجريبي فقط.
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>© 2026 Smart X. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  );
}
