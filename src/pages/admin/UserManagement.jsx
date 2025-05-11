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

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
          isBlocked: i.isBlocked,
          flaggedByAdmin: i.flaggedByAdmin,
        }))
      );
    }
  }, [data]);

  if (isLoading) return <Skeleton height={"100vh"} />;
  if (error) return <div>Error loading users</div>;

  return (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
