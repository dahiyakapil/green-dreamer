// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   Grid,
//   Stack,
//   Typography,
// } from "@mui/material";

// type PageProps = {
//   params: Promise<{
//     id: string;
//   }>;
// };

// export default async function UserDetail({ params }: PageProps) {
//   const { id } = await params; // ✅ REQUIRED IN NEXT 15+

//   try {
//     if (!id) {
//       throw new Error("Missing route `id` parameter");
//     }

//     if (!/^\d+$/.test(id)) {
//       throw new Error(`Invalid id parameter: "${id}"`);
//     }

//     const res = await fetch(`https://dummyjson.com/users/${id}`, {
//       next: { revalidate: 60 },
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch user (${res.status})`);
//     }

//     const user = await res.json();

//     const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
//     const avatarSrc = user.image ?? user.avatar ?? null;

//     return (
//       <Box p={3}>
//         <Card elevation={2}>
//           <CardContent>
//             <Grid container spacing={2} alignItems="center">
//               <Grid item>
//                 <Avatar
//                   src={avatarSrc}
//                   sx={{ width: 96, height: 96, bgcolor: "primary.main" }}
//                   alt={fullName || "User"}
//                 >
//                   {(!avatarSrc && fullName) ? fullName.charAt(0) : null}
//                 </Avatar>
//               </Grid>

//               <Grid item xs>
//                 <Stack spacing={0.5}>
//                   <Typography variant="h5">{fullName || "Unknown User"}</Typography>
//                   <Stack direction="row" spacing={1} alignItems="center">
//                     <Typography color="text.secondary">{user.username}</Typography>
//                     <Chip label={user.gender} size="small" />
//                   </Stack>
//                   <Typography color="text.secondary">{user.company?.name ?? "-"}</Typography>
//                 </Stack>
//               </Grid>

//               <Grid item>
//                 <Stack direction="row" spacing={1}>
//                   <Button variant="outlined" size="small">Message</Button>
//                   <Button variant="contained" size="small">Edit</Button>
//                 </Stack>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 2 }} />

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <Typography variant="subtitle2">Contact</Typography>
//                   <Typography>Email: {user.email}</Typography>
//                   <Typography>Phone: {user.phone}</Typography>
//                   <Typography>Birthdate: {user.birthDate ?? "-"}</Typography>
//                 </Stack>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <Typography variant="subtitle2">Address</Typography>
//                   <Typography>
//                     {user.address?.address ?? ""}
//                     {user.address ? ", " + (user.address?.city ?? "") : ""}
//                   </Typography>
//                   <Typography>{user.address?.postalCode ?? ""}</Typography>
//                 </Stack>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Box>
//     );
//   } catch (err: any) {
//     return (
//       <Box p={3}>
//         <Typography variant="h6">User details unavailable</Typography>
//         <Typography color="error">{err.message}</Typography>
//       </Box>
//     );
//   }
// }

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserDetail({ params }: PageProps) {
  const { id } = await params; // ✅ Required in Next.js 15+

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

    const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const avatarSrc = user.image ?? user.avatar ?? null;

    return (
      <Box p={3}>
        <Card elevation={2}>
          <CardContent>
            {/* Header */}
            <Grid container spacing={2} alignItems="center">
              <Grid>
                <Avatar
                  src={avatarSrc}
                  sx={{ width: 96, height: 96, bgcolor: "primary.main" }}
                  alt={fullName || "User"}
                >
                  {!avatarSrc && fullName ? fullName.charAt(0) : null}
                </Avatar>
              </Grid>

              <Grid size="grow">
                <Stack spacing={0.5}>
                  <Typography variant="h5">
                    {fullName || "Unknown User"}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography color="text.secondary">
                      {user.username}
                    </Typography>
                    <Chip label={user.gender} size="small" />
                  </Stack>

                  <Typography color="text.secondary">
                    {user.company?.name ?? "-"}
                  </Typography>
                </Stack>
              </Grid>

              <Grid>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" size="small">
                    Message
                  </Button>
                  <Button variant="contained" size="small">
                    Edit
                  </Button>
                </Stack>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Details */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Contact</Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Typography>Phone: {user.phone}</Typography>
                  <Typography>
                    Birthdate: {user.birthDate ?? "-"}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Address</Typography>
                  <Typography>
                    {user.address?.address ?? ""}
                    {user.address ? ", " + (user.address?.city ?? "") : ""}
                  </Typography>
                  <Typography>
                    {user.address?.postalCode ?? ""}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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
