import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function UserTable({ users }: any) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Company</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((u: any) => (
          <TableRow key={u.id}>
            <TableCell>
              <Link href={`/dashboard/users/${u.id}`}>
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
  );
}

export default React.memo(UserTable);
