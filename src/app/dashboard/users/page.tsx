"use client";

import { useEffect, useState } from "react";
import { useUsersStore } from "@/store/usersStore";
import UserTable from "@/components/UserTable";
import { TextField, Box, Pagination } from "@mui/material";

export default function UsersPage() {
  const { users, total, fetchUsers } = useUsersStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers((page - 1) * 10, search);
  }, [page, search]);

  return (
    <Box p={3}>
      <TextField
        label="Search User"
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <UserTable users={users} />

      <Pagination
        count={Math.ceil(total / 10)}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
