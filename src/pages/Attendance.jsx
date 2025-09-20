import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:8086/attendance/getAttendenceById",{withCredentials:true});
        const data = res.data;
        console.log(data)
        // Transform API data for table
        const formatted = data.map((item) => ({
          date: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          status: item.status,
          checkIn: item.checkInTime
            ? new Date(item.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "-",
          checkOut: item.checkOutTime
            ? new Date(item.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "-",
          hours: item.workHours ? item.workHours.toFixed(1) : "0",
        }));

        setAttendanceRecords(formatted);

        // Today's record
        const today = new Date().toISOString().split("T")[0];
        const todayRecord = data.find((item) => item.date === today);
        if (todayRecord) {
          setTodayAttendance({
            status: todayRecord.status,
            checkIn: todayRecord.checkInTime
              ? new Date(todayRecord.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "-",
            checkOut: todayRecord.checkOutTime
              ? new Date(todayRecord.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "-",
            hours: todayRecord.workHours ? todayRecord.workHours.toFixed(1) : "0",
          });
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Today's Status */}
      <div className="shadow-lg border rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold mb-4">Today's Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
            <CheckCircle className="text-green-600 mb-2" size={28} />
            <p className="font-semibold">Check In</p>
            <p className="text-lg">{todayAttendance?.checkIn || "-"}</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
            <XCircle className="text-red-600 mb-2" size={28} />
            <p className="font-semibold">Check Out</p>
            <p className="text-lg">{todayAttendance?.checkOut || "-"}</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
            <Clock className="text-blue-600 mb-2" size={28} />
            <p className="font-semibold">Worked Hours</p>
            <p className="text-lg">{todayAttendance?.hours || "0"}</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
            <p className="font-semibold">Status</p>
            <span
              className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                todayAttendance?.status === "Present"
                  ? "bg-green-100 text-green-700"
                  : todayAttendance?.status === "Absent"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {todayAttendance?.status || "Not Recorded"}
            </span>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="shadow-lg border rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold mb-4">Attendance History</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Check In</th>
                <th className="p-3 border">Check Out</th>
                <th className="p-3 border">Hours Worked</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 border">{record.date}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          record.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : record.status === "Absent"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="p-3 border">{record.checkIn}</td>
                    <td className="p-3 border">{record.checkOut}</td>
                    <td className="p-3 border">{record.hours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
