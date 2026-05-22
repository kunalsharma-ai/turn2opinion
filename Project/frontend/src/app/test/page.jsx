"use client";
import DataCards from "@/components/DataCards";
import React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";

const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 9876543210",
    role: "Admin",
    status: "Active",
    company: "TechNova Solutions",
    city: "Delhi",
    joinedAt: "2025-01-12",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    phone: "+91 9812345678",
    role: "Manager",
    status: "Active",
    company: "PixelCraft",
    city: "Mumbai",
    joinedAt: "2024-11-08",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: "+91 9898989898",
    role: "User",
    status: "Inactive",
    company: "CloudSphere",
    city: "Bangalore",
    joinedAt: "2023-07-19",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    phone: "+91 9765432109",
    role: "Support",
    status: "Active",
    company: "NextEdge",
    city: "Pune",
    joinedAt: "2025-03-01",
  },
  {
    id: 5,
    name: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    phone: "+91 9123456780",
    role: "User",
    status: "Pending",
    company: "BrightStack",
    city: "Hyderabad",
    joinedAt: "2024-08-21",
  },
  {
    id: 6,
    name: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    phone: "+91 9988776655",
    role: "Manager",
    status: "Active",
    company: "DataNest",
    city: "Chennai",
    joinedAt: "2022-12-15",
  },
  {
    id: 7,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 9090909090",
    role: "Admin",
    status: "Suspended",
    company: "AlphaByte",
    city: "Noida",
    joinedAt: "2021-09-30",
  },
  {
    id: 8,
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    phone: "+91 9345678123",
    role: "User",
    status: "Active",
    company: "InnoWorks",
    city: "Ahmedabad",
    joinedAt: "2025-04-05",
  },
  {
    id: 9,
    name: "Rahul Nair",
    email: "rahul.nair@example.com",
    phone: "+91 9881122334",
    role: "Developer",
    status: "Active",
    company: "QuantumLeap",
    city: "Kochi",
    joinedAt: "2023-05-11",
  },
  {
    id: 10,
    name: "Divya Patel",
    email: "divya.patel@example.com",
    phone: "+91 9776655443",
    role: "HR",
    status: "Inactive",
    company: "CoreBridge",
    city: "Surat",
    joinedAt: "2024-01-27",
  },
  {
    id: 11,
    name: "Aditya Rao",
    email: "aditya.rao@example.com",
    phone: "+91 9654321870",
    role: "Support",
    status: "Pending",
    company: "ByteForge",
    city: "Jaipur",
    joinedAt: "2025-02-17",
  },
  {
    id: 12,
    name: "Neha Chawla",
    email: "neha.chawla@example.com",
    phone: "+91 9567890123",
    role: "Designer",
    status: "Active",
    company: "Visionary Labs",
    city: "Chandigarh",
    joinedAt: "2023-10-03",
  },
];

function page() {
  return (
    <Box px={3}>
      <DataCards
        title="Users"
        data={users}
        pageSize={6}
        getSearchText={(row) =>
          `${row.name} ${row.email} ${row.company} ${row.city} ${row.role} ${row.status} ${row.phone} ${row.joinedAt} `
        }
        card={(user) => (
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {user.name[0]}
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {user.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="body2">Company: {user.company}</Typography>

              <Typography variant="body2">Role: {user.role}</Typography>

              <Typography variant="body2">City: {user.city}</Typography>

              <Typography variant="body2">Status: {user.status}</Typography>
            </Box>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                gap: 1,
              }}
            >
              <button>Edit</button>
              <button>View</button>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
}

export default page;
