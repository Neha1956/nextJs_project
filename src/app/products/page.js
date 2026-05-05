"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import useProductStore from "../../store/productStore";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Stack,
} from "@mui/material";

function ProductsPage() {
  const [search, setSearch] = useState("");

  const products = useProductStore((state) => state.products);
  const page = useProductStore((state) => state.page);
  const setPage = useProductStore((state) => state.setPage);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  // 🔹 Load products on page change
  useEffect(() => {
    fetchProducts();
  }, [page]);

  // 🔹 Search handler
  const handleSearch = (value) => {
    setSearch(value);

    setSearchQuery(value);

    fetchProducts();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      
      {/* Title */}
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Products List
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        label="Search Products"
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link
              href={`/products/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">
                    {product.title}
                  </Typography>

                  <Typography>Price: ${product.price}</Typography>
                  <Typography>Rating: {product.rating}</Typography>
                  <Typography>Category: {product.category}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
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

export default ProductsPage;