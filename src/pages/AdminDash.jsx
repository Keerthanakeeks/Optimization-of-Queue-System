import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";

const AdminDash = () => {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const token = localStorage.getItem("admin-token");
  const navigate = useNavigate();

  // Fetch Users
  const fetchUser = async () => {
    try {
      if (token) {
        const response = await axios.get(`${backendURL}/api/user/get-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setUsers(response.data.users);

          // Store each user's notificationDate in selectedDate state
          const userDates = response.data.users.reduce((acc, user) => {
            acc[user._id] = user.notificationDate || ""; // Set to empty string if no date exists
            return acc;
          }, {});
          setSelectedDate(userDates);
        } else {
          console.error("Error fetching users:", response.data.message);
          toast.error(response.data.message);
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      toast.error(error.message);
    }
  };

  // Handle Date Change
  const handleDateChange = (userId, event) => {
    const date = event.target.value;
    setSelectedDate((prev) => ({
      ...prev,
      [userId]: date,
    }));
  };

  // Submit the selected date
  const handleDateSubmit = async (userId) => {
    try {
      const date = selectedDate[userId];
      if (date) {
        const response = await axios.put(
          `${backendURL}/api/user/update-date/${userId}`,
          { date },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          toast.success("Date updated successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Please select a date");
      }
    } catch (error) {
      toast.error("Error updating the date");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold py-3 lg:text-xl">ADMIN DASHBOARD</h1>
      <div className="flex flex-col">
        {users && users.length > 0
          ? users.map((item) => (
              <div
                key={item._id}
                className="p-4 border-b flex flex-col justify-center gap-2 lg:flex-row lg:items-center lg:justify-between lg:text-xl"
              >
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <input
                  type="date"
                  className="px-3 py-3 border-1"
                  value={selectedDate[item._id] || ""} // Bind the input value to selectedDate
                  onChange={(e) => handleDateChange(item._id, e)} // Update the selectedDate state
                />
                <button
                  onClick={() => handleDateSubmit(item._id)} // Submit the selected date
                  className="bg-blue-500 text-white px-4 py-2 mt-2"
                >
                  Set Date
                </button>
              </div>
            ))
          : <p>No users found.</p>}
      </div>
    </div>
  );
};

export default AdminDash;
