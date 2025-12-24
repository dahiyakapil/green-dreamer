import { Box, Typography } from "@mui/material";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserDetail({ params }: PageProps) {
  const { id } = await params; // ✅ REQUIRED IN NEXT 15+

  try {
    if (!id) {
      throw new Error("Missing route `id` parameter");
    }

    if (!/^\d+$/.test(id)) {
      throw new Error(`Invalid id parameter: "${id}"`);
    }

    const res = await fetch(`https://dummyjson.com/users/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user (${res.status})`);
    }

    const user = await res.json();

    return (
      <Box p={3}>
        <Typography variant="h5">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Company: {user.company?.name ?? "-"}</Typography>
      </Box>
    );
  } catch (err: any) {
    return (
      <Box p={3}>
        <Typography variant="h6">User details unavailable</Typography>
        <Typography color="error">{err.message}</Typography>
      </Box>
    );
  }
}
