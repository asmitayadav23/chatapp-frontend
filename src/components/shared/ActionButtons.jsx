// src/components/shared/ActionButtons.jsx

import { Button, Stack } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../constants/config";
import { useDispatch } from "react-redux";
import adminApi from "../../redux/api/adminApi"; // ✅ import default export

const ActionButtons = ({ userId, isBlocked, isFlagged }) => {
  const dispatch = useDispatch();

  const handleAction = async (type) => {
    try {
      await axios.put(
        `${server}/api/v1/admin/user/${userId}/${type}`,
        {},
        { withCredentials: true }
      );
      toast.success(`User ${type}ed`);

      // ✅ Trigger refresh of user table
      dispatch(adminApi.util.invalidateTags(["AdminUser"]));
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${type} user`);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={() => handleAction("flag")}
        variant="outlined"
        color="warning"
        size="small"
        disabled={isFlagged}
      >
        {isFlagged ? "Flagged" : "Flag"}
      </Button>

      <Button
        onClick={() => handleAction("block")}
        variant="contained"
        color="error"
        size="small"
        disabled={isBlocked}
      >
        Block
      </Button>

      <Button
        onClick={() => handleAction("unblock")}
        variant="contained"
        color="success"
        size="small"
        disabled={!isBlocked}
      >
        Unblock
      </Button>
    </Stack>
  );
};

export default ActionButtons;
