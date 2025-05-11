import { Avatar, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { transformImage } from "../../lib/features";
import { useAllUsersQuery } from "../../redux/api/adminApi"; // ✅ NEW IMPORT
import ActionButtons from "../../components/shared/ActionButtons"; 

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "actions", // ✅ Add this block
    headerName: "Actions",
    headerClassName: "table-header",
    width: 300,
    renderCell: (params) => (
      <ActionButtons
        userId={params.row.id}
        isBlocked={params.row.isBlocked}
        isFlagged={params.row.flaggedByAdmin}
      />
    ),
  },
];

const UserManagement = () => {
  const { data, isLoading, error } = useAllUsersQuery(); // ✅ NEW

  const [rows, setRows] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");


  useEffect(() => {
  if (data) {
    let allUsers = data.users.map((i) => ({
      ...i,
      id: i._id,
      avatar: transformImage(i.avatar, 50),
      isBlocked: i.isBlocked,
      flaggedByAdmin: i.flaggedByAdmin,
    }));

    let filteredUsers = allUsers;

    if (filterStatus === "flagged") {
      filteredUsers = allUsers.filter((user) => user.flaggedByAdmin);
    } else if (filterStatus === "blocked") {
      filteredUsers = allUsers.filter((user) => user.isBlocked);
    } else if (filterStatus === "active") {
      filteredUsers = allUsers.filter(
        (user) => !user.isBlocked && !user.flaggedByAdmin
      );
    }

    setRows(filteredUsers);
  }
}, [data, filterStatus]);


  if (isLoading) return <Skeleton height={"100vh"} />;
  if (error) return <div>Error loading users</div>;

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
  <label style={{ fontWeight: "bold", fontSize: "16px" }}>Filter by Status:</label>
  
  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "2px solid #1976d2",
      backgroundColor: "#f5faff",
      color: "#1976d2",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
  >
    <option value="">All</option>
    <option value="flagged">Flagged</option>
    <option value="blocked">Blocked</option>
    <option value="active">Active</option>
  </select>
</div>
      <Table heading={"All Users"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
