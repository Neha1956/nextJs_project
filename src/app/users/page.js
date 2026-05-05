"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import useUserStore from "../../store/userStore";

import TextField from "@mui/material/TextField";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

function UsersPage() {
  const [search, setSearch] = useState("");

  // Zustand state
  const users = useUserStore((state) => state.users);
  const page = useUserStore((state) => state.page);
  const setPage = useUserStore((state) => state.setPage);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const searchUsers = useUserStore((state) => state.searchUsers);

  // 🔹 Load users on page change
  useEffect(() => {
    fetchUsers();
  }, [page]);

  // 🔹 Search handler
  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      fetchUsers(); // reset to normal pagination
    } else {
      searchUsers(value);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      
      {/* Title */}
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Users List
      </Typography>

      {/* Search Box */}
      <TextField
        fullWidth
        label="Search Users"
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Users List */}
      {users?.map((user) => (
        <Link
          href={`/users/${user.id}`}
          key={user.id}
          style={{ textDecoration: "none" }}
        >
          <Card sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">
                {user.firstName} {user.lastName}
              </Typography>

              <Typography>Email: {user.email}</Typography>
              <Typography>Phone: {user.phone}</Typography>
              <Typography>Gender: {user.gender}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}

      {/* Pagination */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <Typography sx={{ mt: 1 }}>
          Page {page}
        </Typography>

        <Button
          variant="contained"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Stack>

    </Container>
  );
}

export default UsersPage;