import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Filter } from "lucide-react";
import axios from "axios";
import BACKEND_URL from "../config/backend";

const LeaveRequest = () => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [pendingSaves, setPendingSaves] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8086/leave/requests", {
          withCredentials: true,
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };
    getRequests();
  }, []);

  const handleAction = (id, action, e) => {
    if (e) e.preventDefault();
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: action === "approve" ? "Approved" : "Rejected" }
          : req
      )
    );
    if (!pendingSaves.includes(id)) {
      setPendingSaves((prev) => {
        const updated = [...prev, id];
        return updated;
      });
    }
  };

  const handleSave = async (id, e) => {
    if (e) e.preventDefault();
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    try {
      const res = await axios.put(
        `${BACKEND_URL}/leave/requests/${id}`,
        { status: req.status },
        { withCredentials: true }
      );
      console.log(res)
      setPendingSaves((prev) => prev.filter((pid) => pid !== id));
      setMessage({ type: "success", text: res.data });
      setTimeout(() => setMessage(null), 3000);
      // Optionally update requests with backend response if needed
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to save status. Please try again.",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filteredRequests =
    selectedStatus === "all"
      ? requests
      : requests.filter(
        (req) => req.status.toLowerCase() === selectedStatus
      );

  return (
    <div className="animate-fade-in p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Admin Leave Requests</h2>
          <p className="text-gray-600 m-0">
            Review and manage all employee leave requests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* ✅ Feedback message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">
                  Employee
                </th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">
                  Type
                </th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">
                  Start
                </th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">
                  End
                </th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">
                  Reason
                </th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">
                  Status
                </th>
                <th className="bg-gray-50 font-semibold text-gray-700 text-sm px-4 py-3 border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {req.employeeName}
                    </td>
                    <td className="px-4 py-3">{req.type}</td>
                    <td className="px-4 py-3">{req.startDate}</td>
                    <td className="px-4 py-3">{req.endDate}</td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      {req.reason}
                    </td>
                    <td className="px-4 py-3">
                      {req.status === "Approved" && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle size={14} className="mr-1" /> Approved
                        </span>
                      )}
                      {req.status === "Rejected" && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          <XCircle size={14} className="mr-1" /> Rejected
                        </span>
                      )}
                      {req.status === "Pending" && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {req.status === "Pending" || (pendingSaves.includes(req.id) && req.status !== "Pending") ? (
                        <div className="flex gap-2">
                          {req.status === "Pending" && (
                            <>
                              <button
                                className="px-3 py-1 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 text-xs font-semibold"
                                onClick={(e) => handleAction(req.id, "approve", e)}
                              >
                                Approve
                              </button>
                              <button
                                className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold"
                                onClick={(e) => handleAction(req.id, "reject", e)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {pendingSaves.includes(req.id) && req.status !== "Pending" && (
                            <button
                              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                              onClick={(e) => handleSave(req.id, e)}
                            >
                              Save
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
