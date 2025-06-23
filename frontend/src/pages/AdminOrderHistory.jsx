// pages/AdminOrderHistory.jsx

import {
    Container, Heading, Table, Spinner, Text, Center, Box
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
  const AdminOrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
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
        <Heading mb={4}>All Order History</Heading>
        <Table.Root variant="simple">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.order_code}</td>
                <td>{order.user?.email || "N/A"}</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order.total_price)}
                </td>
                <td>{order.status}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table.Root>
      </Container>
    );
  };
  
  export default AdminOrderHistory;
  