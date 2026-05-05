import Link from "next/link";
import {
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

async function getProduct(id) {
  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  return response.json();
}

async function ProductDetails({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>

          <Typography>
            Price: ${product.price}
          </Typography>

          <Typography>
            Rating: {product.rating}
          </Typography>

          <Typography>
            Category: {product.category}
          </Typography>

          <Typography>
            {product.description}
          </Typography>

          <Link href="/products">
            Back to Products
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetails;