import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, Phone, BarChart3, Users, Zap, CheckCircle2 } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
      {/* Navigation */}
      <nav className="border-b border-black py-4 px-6 md:px-8">
        <div className="container flex items-center justify-between">
          <div className="text-2xl font-bold">Smart X</div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm">{user?.name}</span>
                <button onClick={logout} className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-all">
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <a href={getLoginUrl()} className="px-4 py-2 bg-red-600 text-white hover:opacity-90 transition-all">
                تسجيل الدخول
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-black py-20 md:py-32 px-6 md:px-8">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-3 h-3 bg-red-600"></div>
              <span className="text-sm font-semibold tracking-wider">منصة الاتصالات الموحدة</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              إدارة تجربة العملاء بذكاء
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              منصة سحابية متكاملة تجمع بين الكول سنتر والمحادثات الرقمية والشات بوت الذكي لتحسين تواصلك مع العملاء.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-red-600 text-white font-semibold hover:opacity-90 transition-all">
                طلب تجربة مجانية
              </button>
              <button className="px-8 py-3 border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all">
                تعرف أكثر
              </button>
            </div>
          </div>
          <div className="bg-gray-100 aspect-square flex items-center justify-center border-2 border-black">
            <div className="text-center">
              <Phone className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <p className="text-gray-600">واجهة لوحة التحكم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-black py-16 md:py-20 px-6 md:px-8 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="border-r border-black pr-8">
              <div className="text-4xl font-bold mb-2">15K+</div>
              <p className="text-gray-700">شركة موثوقة</p>
            </div>
            <div className="border-r border-black pr-8">
              <div className="text-4xl font-bold mb-2">50%</div>
              <p className="text-gray-700">زيادة الإنتاجية</p>
            </div>
            <div className="border-r border-black pr-8">
              <div className="text-4xl font-bold mb-2">70%</div>
              <p className="text-gray-700">استجابة أسرع</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-gray-700">دعم فني</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-black py-20 md:py-32 px-6 md:px-8">
        <div className="container">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-red-600"></div>
              <span className="text-sm font-semibold">الميزات الرئيسية</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              كل ما تحتاجه في منصة واحدة
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="border border-black p-8">
              <div className="w-12 h-12 bg-red-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-3">كول سنتر سحابي</h3>
              <p className="text-gray-700 mb-4">
                إدارة المكالمات الواردة والصادرة مع تسجيل ومراقبة في الوقت الفعلي.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  أرقام موحدة (9200)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  نظام IVR ذكي
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  تسجيل المكالمات
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="border border-black p-8">
              <div className="w-12 h-12 bg-red-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-3">محادثات موحدة</h3>
              <p className="text-gray-700 mb-4">
                دمج واتساب، إنستقرام، مسنجر، تليجرام والبريد الإلكتروني في منصة واحدة.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  منصة موحدة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  إدارة سهلة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  تتبع العملاء
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="border border-black p-8">
              <div className="w-12 h-12 bg-red-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-3">شات بوت ذكي</h3>
              <p className="text-gray-700 mb-4">
                ردود تلقائية مدعومة بالذكاء الاصطناعي مع سيناريوهات تفاعلية.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  ردود ذكية
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  توجيه تلقائي
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  تعلم مستمر
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="border border-black p-8">
              <div className="w-12 h-12 bg-red-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-3">تقارير متقدمة</h3>
              <p className="text-gray-700 mb-4">
                تحليلات شاملة ومؤشرات أداء رئيسية لاتخاذ قرارات مبنية على البيانات.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  تقارير مفصلة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  مؤشرات KPIs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  تصدير البيانات
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="border border-black p-8">
              <div className="w-12 h-12 bg-red-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-3">إدارة الفريق</h3>
              <p className="text-gray-700 mb-4">
                إدارة الموارد البشرية والصلاحيات ومراقبة الأداء الفردي.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  إدارة الموارد
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  صلاحيات مرنة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  مراقبة الأداء
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="border border-black p-8">
              <div className="w-12 h-12 bg-red-600 mb-6"></div>
              <h3 className="text-xl font-bold mb-3">رسائل جماعية</h3>
              <p className="text-gray-700 mb-4">
                إرسال رسائل مخصصة لآلاف العملاء مع جدولة زمنية ذكية.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  جدولة الرسائل
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  تخصيص المحتوى
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  تتبع الأداء
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-black py-20 md:py-32 px-6 md:px-8 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            جاهز لتحسين تجربة عملائك؟
          </h2>
          <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
            انضم إلى آلاف الشركات التي تثق في Smart X لإدارة اتصالاتها.
          </p>
          <button className="px-8 py-4 bg-red-600 text-white font-semibold text-lg hover:opacity-90 transition-all">
            ابدأ التجربة المجانية الآن
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black py-12 px-6 md:px-8 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-black">
            <div>
              <h4 className="font-bold mb-4">عن Smart X</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-red-600">من نحن</a></li>
                <li><a href="#" className="hover:text-red-600">الأخبار</a></li>
                <li><a href="#" className="hover:text-red-600">الوظائف</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">المنتجات</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-red-600">كول سنتر</a></li>
                <li><a href="#" className="hover:text-red-600">محادثات موحدة</a></li>
                <li><a href="#" className="hover:text-red-600">شات بوت</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">الموارد</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-red-600">التوثيق</a></li>
                <li><a href="#" className="hover:text-red-600">المدونة</a></li>
                <li><a href="#" className="hover:text-red-600">الدعم</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">التواصل</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>البريد: info@smartx.com</li>
                <li>الهاتف: +966 9200 33333</li>
                <li>WhatsApp: +966 92000 7031</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>&copy; 2026 Smart X. جميع الحقوق محفوظة.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-600">سياسة الخصوصية</a>
              <a href="#" className="hover:text-red-600">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
