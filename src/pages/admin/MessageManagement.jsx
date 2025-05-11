import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from "../../components/shared/Table";
import { fileFormat, transformImage } from "../../lib/features";
import { useAllMessagesQuery } from "../../redux/api/adminApi"; // ✅ NEW
import { useErrors } from "../../hooks/hook";

const columns = [
  { field: "id", headerName: "ID", headerClassName: "table-header", width: 200 },
  { 
    field: "attachments", 
    headerName: "Attachments", 
    headerClassName: "table-header", 
    width: 200, 
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box key={url}>
                <a href={url} download target="_blank" style={{ color: "black" }}>
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    }
  },
  { field: "content", headerName: "Content", headerClassName: "table-header", width: 400 },
  { 
    field: "sender", 
    headerName: "Sent By", 
    headerClassName: "table-header", 
    width: 200, 
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ) 
  },
  { field: "chat", headerName: "Chat", headerClassName: "table-header", width: 220 },
  { field: "groupChat", headerName: "Group Chat", headerClassName: "table-header", width: 100 },
  { field: "createdAt", headerName: "Time", headerClassName: "table-header", width: 250 },
];

const MessageManagement = () => {
  const { data, isLoading, error } = useAllMessagesQuery(); // ✅ NEW
  useErrors([{ isError: error, error }]);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.messages.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: transformImage(i.sender.avatar, 50),
          },
          createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);

  useEffect(() => {
  if (searchTerm.trim() === "") {
    setFilteredRows(rows);
  } else {
    const lowerKeyword = searchTerm.toLowerCase();
    const matched = rows.filter((row) =>
      row.content?.toLowerCase().includes(lowerKeyword)
    );
    setFilteredRows(matched);
  }
}, [searchTerm, rows]);


return (
 <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      )}
    </AdminLayout>
);


};

export default MessageManagement;
