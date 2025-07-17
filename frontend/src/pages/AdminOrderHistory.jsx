// pages/AdminOrderHistory.jsx

import { Button, Container, Heading, Table, Spinner, Text, Image, Flex, Center, Box, Collapsible } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@chakra-ui/react";

  
  
  const AdminOrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const navigate = useNavigate()

    const toggleExpand = (orderId) => { setExpandedOrder((prev) => (prev === orderId ? null : orderId)); };

  
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            console.log(`${import.meta.env.VITE_API_BASE_URL}`)
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`, {
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
            <React.Fragment key={order.order_code}>
              <Table.Row key={order.order_code}>
              <Table.Cell>{order.order_code}</Table.Cell>
              <Table.Cell>{order.user_name|| "N/A"}</Table.Cell>
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
              <Table.Cell>
                  <Button size="sm" onClick={() => toggleExpand(order.order_code)}>
                    {expandedOrder === order.order_code ? "Hide" : "View"}
                  </Button>
                </Table.Cell>
            </Table.Row>

             <Table.Row>
                <Table.Cell colSpan={6} p={0}>
                  <Collapsible.Root open={expandedOrder === order.order_code} unmountOnExit>
                    <Collapsible.Content>
                      <Box p={4} borderTop="1px solid #E2E8F0">
                        <strong>Order Items:</strong>
                        <Box mt={3}>
                          {order.items?.map((item) => (
                            <Flex
                              key={item.product_id}
                              p={2}
                              border="1px solid #EDF2F7"
                              borderRadius="md"
                              align="center"
                              gap={4}
                              mb={3}
                            >
                              <Image
                                boxSize="64px"
                                objectFit="cover"
                                src={item.image || "/placeholder.png"}
                                alt={item.name}
                                borderRadius="md"
                              />
                              <Box flex="1">
                                <a href={`/product/${item.slug}`} style={{ fontWeight: "bold" }}>
                                  {item.name}
                                </a>
                                <Box fontSize="sm">
                                  Price:{" "}
                                  {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                  }).format(item.price)}
                                </Box>
                                <Box fontSize="sm">Quantity: {item.quantity}</Box>
                              </Box>
                            </Flex>
                          ))}
                        </Box>
                      </Box>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Table.Cell>
              </Table.Row>
            </React.Fragment>     
          ))}
        </Table.Body>
        </Table.Root>
      </Container>
    );
  };
  
  export default AdminOrderHistory;
  