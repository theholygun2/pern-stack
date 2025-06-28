// pages/AdminOrderHistory.jsx

import { Button, Container, Heading, Table, Spinner, Text, Center, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@chakra-ui/react";

  
  
  const AdminOrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
  
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const res = await axios.get("http://localhost:3000/api/admin/orders", {
              withCredentials: true,
            });
            console.log("ADMIN ORDERS:", res.data.data); // should be array
            setOrders(res.data.data);
          } catch (err) {
            console.error("Error fetching admin orders:", err.response?.data || err.message);
          } finally {
            setLoading(false)
          }
        };
      
        fetchOrders();
      }, []);
      
  
    if (loading) {
      return (
        <Center minH="60vh">
          <Spinner />
        </Center>
      );
    }
  
    return (
      <Container py={6}>
        <Button variant="ghost" mb={6} onClick={() => navigate('/admin/dashboard')}> <ArrowLeftIcon size={16} style={{ marginRight: '8px' }} /> Back to Dashboard </Button>
        <Heading mb={4}>All Order History</Heading>
        <Table.Root variant="simple">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Order ID</Table.ColumnHeader>
            <Table.ColumnHeader>User</Table.ColumnHeader>
            <Table.ColumnHeader>Total</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map((order) => (
            <Table.Row key={order.order_code}>
              <Table.Cell>{order.order_code}</Table.Cell>
              <Table.Cell>{order.user?.email || "N/A"}</Table.Cell>
              <Table.Cell>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(order.total_price)}
              </Table.Cell>
              <Table.Cell>
                <Badge colorPalette={ order.status === "pending" ? "yellow" : order.status === "failed" ? "red" : "green" }> {order.status} </Badge>
              </Table.Cell>
              <Table.Cell>
                {new Date(order.created_at).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        </Table.Root>
      </Container>
    );
  };
  
  export default AdminOrderHistory;
  