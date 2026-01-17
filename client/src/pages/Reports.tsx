import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Users,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState("calls");
  const [dateRange, setDateRange] = useState("month");

  const reports = [
    {
      id: "calls",
      title: "تقرير المكالمات",
      icon: Phone,
      metrics: [
        { label: "إجمالي المكالمات", value: "1,234", change: "+12%" },
        { label: "المكالمات المكتملة", value: "1,150", change: "+15%" },
        { label: "المكالمات المفقودة", value: "84", change: "-8%" },
        { label: "متوسط المدة", value: "4:32", change: "+2%" },
      ],
    },
    {
      id: "messages",
      title: "تقرير الرسائل",
      icon: MessageSquare,
      metrics: [
        { label: "إجمالي الرسائل", value: "5,678", change: "+8%" },
        { label: "الرسائل المسلمة", value: "5,500", change: "+10%" },
        { label: "الرسائل المقروءة", value: "4,200", change: "+5%" },
        { label: "معدل الاستجابة", value: "92%", change: "+3%" },
      ],
    },
    {
      id: "team",
      title: "تقرير أداء الفريق",
      icon: Users,
      metrics: [
        { label: "عدد الموظفين النشطين", value: "45", change: "+5%" },
        { label: "متوسط وقت الاستجابة", value: "2:15", change: "-10%" },
        { label: "معدل الرضا", value: "94%", change: "+2%" },
        { label: "الإنتاجية", value: "87%", change: "+4%" },
      ],
    },
  ];

  const selectedReportData = reports.find((r) => r.id === selectedReport);
  const ReportIcon = selectedReportData?.icon || BarChart3;

  return (
    <div className="p-6 md:p-8 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">التقارير والتحليلات</h1>
          <p className="text-gray-700">عرض شامل لأداء العمليات والفريق</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Download className="w-4 h-4 ml-2" />
          تحميل التقرير
        </Button>
      </div>

      {/* Controls */}
      <Card className="p-6 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              نطاق التاريخ
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
            >
              <option value="week">هذا الأسبوع</option>
              <option value="month">هذا الشهر</option>
              <option value="quarter">هذا الربع</option>
              <option value="year">هذا العام</option>
              <option value="custom">مخصص</option>
            </select>
          </div>

          {/* Report Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              نوع التقرير
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
            >
              <option value="calls">تقرير المكالمات</option>
              <option value="messages">تقرير الرسائل</option>
              <option value="team">تقرير أداء الفريق</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Report Title */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
          <ReportIcon className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{selectedReportData?.title}</h2>
          <p className="text-gray-600">
            {dateRange === "week"
              ? "هذا الأسبوع"
              : dateRange === "month"
              ? "هذا الشهر"
              : dateRange === "quarter"
              ? "هذا الربع"
              : "هذا العام"}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {selectedReportData?.metrics.map((metric, index) => (
          <Card key={index} className="p-6 border border-gray-300">
            <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
            <p className="text-3xl font-bold mb-2">{metric.value}</p>
            <p className="text-green-600 text-sm font-semibold">{metric.change}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <Card className="p-6 border border-gray-300">
          <h3 className="text-xl font-bold mb-4">الاتجاهات</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">سيتم عرض الرسم البياني هنا</p>
            </div>
          </div>
        </Card>

        {/* Chart 2 */}
        <Card className="p-6 border border-gray-300">
          <h3 className="text-xl font-bold mb-4">التوزيع</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">سيتم عرض الرسم البياني هنا</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="p-6 border border-gray-300">
        <h3 className="text-xl font-bold mb-4">البيانات التفصيلية</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-right py-3 px-4 font-semibold">التاريخ</th>
                <th className="text-right py-3 px-4 font-semibold">العدد</th>
                <th className="text-right py-3 px-4 font-semibold">النسبة</th>
                <th className="text-right py-3 px-4 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "2026-01-17", count: "234", percentage: "18.9%", status: "مرتفع" },
                { date: "2026-01-16", count: "198", percentage: "16.1%", status: "متوسط" },
                { date: "2026-01-15", count: "156", percentage: "12.6%", status: "متوسط" },
                { date: "2026-01-14", count: "212", percentage: "17.2%", status: "مرتفع" },
                { date: "2026-01-13", count: "145", percentage: "11.8%", status: "منخفض" },
              ].map((row, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{row.date}</td>
                  <td className="py-3 px-4 font-semibold">{row.count}</td>
                  <td className="py-3 px-4">{row.percentage}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        row.status === "مرتفع"
                          ? "bg-green-100 text-green-700"
                          : row.status === "متوسط"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
