import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from "../../components/shared/Table";
import { fileFormat, transformImage } from "../../lib/features";
import { useAllMessagesQuery } from "../../redux/api/adminApi";
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
    },
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
    ),
  },
  { field: "chat", headerName: "Chat", headerClassName: "table-header", width: 220 },
  { field: "groupChat", headerName: "Group Chat", headerClassName: "table-header", width: 100 },
  { field: "createdAt", headerName: "Time", headerClassName: "table-header", width: 250 },
];

const MessageManagement = () => {
  const { data, isLoading, error } = useAllMessagesQuery();
  useErrors([{ isError: error, error }]);

  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    if (data) {
      const mapped = data.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }));
      setRows(mapped);
      setFilteredRows(mapped);
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
    {isLoading ? (
      <Skeleton height={"100vh"} />
    ) : (
      <div className="p-4">
  <div className="bg-white p-6 rounded shadow relative" style={{ minHeight: "700px" }}>

    {/* Table */}
    <div className="pb-24"> {/* give padding bottom to avoid search box overlap */}
      <Table
        heading={"All Messages"}
        columns={columns}
        rows={filteredRows}
        rowHeight={200}
      />
    </div>

    {/* Search Box */}
   <input
  type="text"
  placeholder="Search messages..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="absolute bottom-6 right-6 w-[28rem] px-6 py-4 text-xl text-black placeholder-black border border-gray-300 rounded-xl shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
/>

  </div>
</div>

    )}
  </AdminLayout>
);

};

export default MessageManagement;
