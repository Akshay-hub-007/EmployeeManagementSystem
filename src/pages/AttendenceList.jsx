import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import dayjs from "dayjs"; // install dayjs for date handling

const AttendanceList = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("today"); // default date filter
    const [statusFilter, setStatusFilter] = useState("all"); // status filter

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8086/attendance/getAttendence",
                    { withCredentials: true }
                );
                setAttendanceList(response.data);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    // Filter attendance based on dropdown selection and status
    useEffect(() => {
        const today = dayjs();
        let filtered = attendanceList;

        // Date filter
        switch (filter) {
            case "today":
                filtered = filtered.filter((att) =>
                    dayjs(att.date).isSame(today, "day")
                );
                break;
            case "yesterday":
                filtered = filtered.filter((att) =>
                    dayjs(att.date).isSame(today.subtract(1, "day"), "day")
                );
                break;
            case "last3days":
                filtered = filtered.filter((att) =>
                    dayjs(att.date).isAfter(today.subtract(3, "day").startOf("day"))
                );
                break;
            default:
                break;
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter((att) =>
                att.status && att.status.toLowerCase() === statusFilter
            );
        }

        setFilteredList(filtered);
    }, [attendanceList, filter, statusFilter]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
                Loading...
            </div>
        );

    const renderStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "present":
                return (
                    <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-semibold text-sm">
                        <CheckCircle size={16} /> {status}
                    </span>
                );
            case "absent":
                return (
                    <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-0.5 rounded-full font-semibold text-sm">
                        <XCircle size={16} /> {status}
                    </span>
                );
            case "half-day":
                return (
                    <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full font-semibold text-sm">
                        <AlertCircle size={16} /> {status}
                    </span>
                );
            case "leave":
                return (
                    <span className="flex items-center gap-1 text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-semibold text-sm">
                        <AlertCircle size={16} /> {status}
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium text-sm">
                        {status || "N/A"}
                    </span>
                );
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Attendance List
            </h2>

            {/* Filter Dropdowns */}
            <div className="mb-4 flex flex-wrap gap-4 items-center">
                <div>
                    <label className="mr-2 font-medium text-gray-700">Date:</label>
                    <select
                        className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="last3days">Last 3 Days</option>
                    </select>
                </div>
                <div>
                    <label className="mr-2 font-medium text-gray-700">Status:</label>
                    <select
                        className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="half-day">Half-day</option>
                        <option value="leave">Leave</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Employee
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Date
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Check In
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Check Out
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Status
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Work Hours
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                Remarks
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredList.map((att) => (
                            <tr key={att.attendanceId} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-700">{att.attendanceId}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{att.employeeName || "N/A"}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{dayjs(att.date).format("DD MMM YYYY")}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {att.checkInTime ? dayjs(att.checkInTime).format("hh:mm A") : "-"}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {att.checkOutTime ? dayjs(att.checkOutTime).format("hh:mm A") : "-"}
                                </td>
                                <td className="px-4 py-2">{renderStatusBadge(att.status)}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{att.workHours?.toFixed(2) || "-"}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{att.remarks || "-"}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AttendanceList;
