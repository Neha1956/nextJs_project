import Link from "next/link";
import {
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

async function getUser(id) {
  const response = await fetch(
    `https://dummyjson.com/users/${id}`
  );

  return response.json();
}

async function UserDetails({ params }) {
  const { id } = await params;

  const user = await getUser(id);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>

          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>Gender: {user.gender}</Typography>

          <Typography>
            Company: {user.company?.name || "Not Available"}
          </Typography>

          <Link href="/users">Back to Users</Link>
        </CardContent>
      </Card>
    </Container>
  );
}

export default UserDetails;