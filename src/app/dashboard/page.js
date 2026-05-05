"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h3" align="center" gutterBottom>
              Dashboard
            </Typography>

            <Typography variant="h6" align="center" sx={{ mb: 4 }}>
              Welcome to the dashboard! You are successfully logged in.
            </Typography>

            <Stack spacing={2}>
              <Button
                variant="contained"
                onClick={() => router.push("/users")}
              >
                View Users
              </Button>

              <Button
                variant="contained"
                onClick={() => router.push("/products")}
              >
                View Products
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </ProtectedRoute>
  );
}

export default Dashboard;