import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Phone,
  MessageSquare,
  BarChart3,
  Users,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const loginUrl = getLoginUrl();

  return (
    <div className="min-h-screen bg-white text-black" dir="rtl">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600"></div>
            <span className="text-2xl font-bold">Smart X</span>
          </div>
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <span className="text-sm">مرحباً {user?.name}</span>
                <Button
                  onClick={() => logout()}
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white"
                >
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <a href={loginUrl}>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  دخول
                </Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100 -z-10 clip-path-polygon"></div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-1 bg-red-600 mb-6"></div>
              <h1 className="typography-hero mb-6">
                منصة الاتصالات المتكاملة
              </h1>
              <p className="typography-subtitle text-gray-700 mb-8">
                إدارة كاملة لمركز الاتصالات السحابي مع محادثات موحدة وشات بوت ذكي
                وتقارير متقدمة
              </p>
              <div className="flex gap-4">
                <a href={isAuthenticated ? "/dashboard" : loginUrl}>
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
                    ابدأ الآن
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white px-8 py-3 text-lg"
                >
                  طلب عرض توضيحي
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                <Phone className="w-32 h-32 text-red-600 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-t border-b border-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <p className="text-gray-700">شركة موثوقة</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">99.9%</div>
              <p className="text-gray-700">توفر الخدمة</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">1M+</div>
              <p className="text-gray-700">مكالمة يومية</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <p className="text-gray-700">دعم فني</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
            <h2 className="typography-section-title">الميزات الرئيسية</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              كل ما تحتاجه لإدارة اتصالات عملائك بكفاءة واحترافية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: "كول سنتر سحابي",
                description:
                  "إدارة المكالمات الواردة والصادرة مع تسجيل ومراقبة فورية",
              },
              {
                icon: MessageSquare,
                title: "محادثات موحدة",
                description:
                  "دمج واتساب وإنستقرام والبريد الإلكتروني في منصة واحدة",
              },
              {
                icon: Zap,
                title: "شات بوت ذكي",
                description:
                  "ردود تلقائية وسيناريوهات تفاعلية مدعومة بالذكاء الاصطناعي",
              },
              {
                icon: BarChart3,
                title: "تقارير متقدمة",
                description:
                  "تحليلات شاملة ومؤشرات أداء رئيسية في الوقت الفعلي",
              },
              {
                icon: Users,
                title: "إدارة الفريق",
                description:
                  "تعيين الأدوار والصلاحيات ومراقبة أداء الموظفين",
              },
              {
                icon: Shield,
                title: "أمان عالي",
                description:
                  "تشفير كامل للبيانات والمكالمات مع الامتثال للمعايير الدولية",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 border border-gray-300 hover:border-red-600 hover:shadow-lg transition-all"
              >
                <feature.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
            <h2 className="typography-section-title">الخدمات الإضافية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: Clock,
                title: "نظام IVR",
                description:
                  "توجيه تلقائي للمكالمات مع رسائل صوتية مخصصة وخيارات تفاعلية",
              },
              {
                icon: TrendingUp,
                title: "رسائل جماعية",
                description:
                  "إرسال رسائل مخصصة لآلاف العملاء مع جدولة زمنية متقدمة",
              },
              {
                icon: CheckCircle,
                title: "نسخ صوتية",
                description:
                  "تحويل المكالمات المسجلة إلى نصوص قابلة للبحث والتحليل",
              },
              {
                icon: ArrowRight,
                title: "تكامل CRM",
                description:
                  "ربط سلس مع أنظمة إدارة العلاقات الخارجية والأنظمة الموجودة",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 border-l-4 border-red-600 bg-white"
              >
                <service.icon className="w-12 h-12 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
            <h2 className="typography-section-title">الأسعار</h2>
            <p className="text-xl text-gray-700">
              خطط مرنة تناسب جميع احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "بدء التشغيل",
                price: "499",
                features: [
                  "حتى 5 مستخدمين",
                  "1000 دقيقة شهرية",
                  "محادثات أساسية",
                  "تقارير بسيطة",
                ],
              },
              {
                name: "احترافي",
                price: "999",
                featured: true,
                features: [
                  "حتى 20 مستخدم",
                  "10000 دقيقة شهرية",
                  "محادثات موحدة كاملة",
                  "شات بوت ذكي",
                  "تقارير متقدمة",
                ],
              },
              {
                name: "مؤسسي",
                price: "2499",
                features: [
                  "مستخدمين غير محدود",
                  "دقائق غير محدودة",
                  "جميع الميزات",
                  "دعم مخصص 24/7",
                  "تكاملات مخصصة",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`p-8 border-2 transition-all ${
                  plan.featured
                    ? "border-red-600 shadow-lg scale-105"
                    : "border-gray-300"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-red-600">
                    {plan.price}
                  </span>
                  <span className="text-gray-700"> ر.س/شهر</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full py-3 ${
                    plan.featured
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  اختر الخطة
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            هل أنت مستعد للبدء؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى مئات الشركات التي تثق بـ Smart X
          </p>
          <a href={isAuthenticated ? "/dashboard" : loginUrl}>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
              ابدأ التجربة المجانية الآن
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-red-600"></div>
                <span className="text-xl font-bold">Smart X</span>
              </div>
              <p className="text-gray-400">
                منصة الاتصالات المتكاملة للشركات الحديثة
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">المنتجات</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-600">
                    كول سنتر
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    محادثات موحدة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    شات بوت
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">الشركة</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-600">
                    عن Smart X
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    المدونة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    الوظائف
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">قانوني</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-red-600">
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    الشروط والأحكام
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    اتفاقية الخدمة
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Smart X. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
