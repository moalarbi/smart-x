import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  PhoneOff,
  Download,
  Filter,
  Search,
  Play,
  Pause,
  Volume2,
} from "lucide-react";

export default function Calls() {
  const [selectedCall, setSelectedCall] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const calls = [
    {
      id: 1,
      caller: "أحمد محمد",
      number: "+966501234567",
      duration: "5:23",
      status: "completed",
      direction: "inbound",
      time: "10:30 AM",
      recordingUrl: "#",
      transcription: "مرحبا، أريد الاستفسار عن الخدمات...",
    },
    {
      id: 2,
      caller: "فاطمة علي",
      number: "+966509876543",
      duration: "3:45",
      status: "completed",
      direction: "outbound",
      time: "10:15 AM",
      recordingUrl: "#",
      transcription: "تم الاتفاق على موعد الاجتماع غدا...",
    },
    {
      id: 3,
      caller: "محمود سالم",
      number: "+966505555555",
      duration: "0:00",
      status: "missed",
      direction: "inbound",
      time: "09:50 AM",
      recordingUrl: null,
      transcription: null,
    },
    {
      id: 4,
      caller: "سارة حسن",
      number: "+966502222222",
      duration: "7:12",
      status: "completed",
      direction: "inbound",
      time: "09:30 AM",
      recordingUrl: "#",
      transcription: "تم حل المشكلة بنجاح...",
    },
  ];

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.caller.includes(searchTerm) || call.number.includes(searchTerm);
    const matchesFilter =
      filterStatus === "all" || call.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 md:p-8 space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">المكالمات</h1>
        <p className="text-gray-700">إدارة وتتبع جميع المكالمات الواردة والصادرة</p>
      </div>

      {/* Controls */}
      <Card className="p-6 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن متصل أو رقم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
          >
            <option value="all">جميع الحالات</option>
            <option value="completed">مكتملة</option>
            <option value="missed">مفقودة</option>
            <option value="rejected">مرفوضة</option>
          </select>

          {/* Action Button */}
          <Button className="bg-red-600 hover:bg-red-700 text-white justify-center">
            <Phone className="w-4 h-4 ml-2" />
            مكالمة جديدة
          </Button>
        </div>
      </Card>

      {/* Calls List */}
      <div className="space-y-4">
        {filteredCalls.map((call) => (
          <Card
            key={call.id}
            className={`p-6 border-2 cursor-pointer transition-all ${
              selectedCall === call.id
                ? "border-red-600 bg-red-50"
                : "border-gray-300 hover:border-red-600"
            }`}
            onClick={() =>
              setSelectedCall(selectedCall === call.id ? null : call.id)
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4">
              {/* Caller Info */}
              <div>
                <p className="font-semibold">{call.caller}</p>
                <p className="text-sm text-gray-600">{call.number}</p>
              </div>

              {/* Duration */}
              <div>
                <p className="text-sm text-gray-600">المدة</p>
                <p className="font-semibold">{call.duration}</p>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm text-gray-600">الحالة</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded text-sm font-semibold ${
                    call.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : call.status === "missed"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {call.status === "completed"
                    ? "مكتملة"
                    : call.status === "missed"
                    ? "مفقودة"
                    : "مرفوضة"}
                </span>
              </div>

              {/* Direction */}
              <div>
                <p className="text-sm text-gray-600">الاتجاه</p>
                <div className="flex items-center gap-2">
                  {call.direction === "inbound" ? (
                    <>
                      <Phone className="w-4 h-4 text-green-600" />
                      <span>واردة</span>
                    </>
                  ) : (
                    <>
                      <PhoneOff className="w-4 h-4 text-blue-600" />
                      <span>صادرة</span>
                    </>
                  )}
                </div>
              </div>

              {/* Time */}
              <div className="text-right">
                <p className="text-sm text-gray-600">الوقت</p>
                <p className="font-semibold">{call.time}</p>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedCall === call.id && (
              <div className="border-t border-gray-300 pt-4 mt-4 space-y-4">
                {/* Recording */}
                {call.recordingUrl && (
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold mb-3">التسجيل الصوتي</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          className="p-2 border-black text-black hover:bg-black hover:text-white"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                        <span className="text-sm text-gray-600">
                          {call.duration}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white"
                      >
                        <Download className="w-4 h-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                )}

                {/* Transcription */}
                {call.transcription && (
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold mb-2">النص المنسوخ</p>
                    <p className="text-gray-700">{call.transcription}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Phone className="w-4 h-4 ml-2" />
                    إعادة الاتصال
                  </Button>
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white"
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تحميل التسجيل
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCalls.length === 0 && (
        <Card className="p-12 border border-gray-300 text-center">
          <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">لا توجد مكالمات مطابقة</p>
        </Card>
      )}
    </div>
  );
}
