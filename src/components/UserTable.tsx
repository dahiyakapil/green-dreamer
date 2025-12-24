import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function UserTable({ users }: any) {
  return (
    <TableContainer component={Paper} className="card">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="subtitle2" className="muted">Name</Typography></TableCell>
            <TableCell><Typography variant="subtitle2" className="muted">Email</Typography></TableCell>
            <TableCell><Typography variant="subtitle2" className="muted">Gender</Typography></TableCell>
            <TableCell><Typography variant="subtitle2" className="muted">Phone</Typography></TableCell>
            <TableCell><Typography variant="subtitle2" className="muted">Company</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u: any) => (
            <TableRow key={u.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
              <TableCell>
                <Link href={`/dashboard/users/${u.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {u.firstName} {u.lastName}
                </Link>
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.gender}</TableCell>
              <TableCell>{u.phone}</TableCell>
              <TableCell>{u.company?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(UserTable);
