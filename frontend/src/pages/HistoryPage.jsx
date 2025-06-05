import {
  Badge,
  Box,
  Button,
  Collapsible,
  Container,
  Flex,
  Heading,
  Image,
  Table,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/order", {
          withCredentials: true,
        });
        setOrders(res.data.data.orderHistory);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <Container py={6}>
      <Heading mb="2">Transaction</Heading>
      <Table.Root variant="outline" showColumnBorder>
        <Table.Header>
          <Table.Row fontWeight="medium">
            <Table.ColumnHeader>Order ID</Table.ColumnHeader>
            <Table.ColumnHeader>Date Ordered</Table.ColumnHeader>
            <Table.ColumnHeader>Total Amount</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Items Summary</Table.ColumnHeader>
            <Table.ColumnHeader>Shipping Address</Table.ColumnHeader>
            <Table.ColumnHeader>View Details</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map((order) => (
            <React.Fragment key={order.order_code}>
              <Table.Row fontWeight="medium">
                <Table.Cell>{order.order_code}</Table.Cell>
                <Table.Cell>
                  {new Date(order.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Table.Cell>
                <Table.Cell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(order.total_price)}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    colorPalette={
                      order.status === "pending"
                        ? "yellow"
                        : order.status === "failed"
                        ? "red"
                        : "green"
                    }
                  >
                    {order.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{order.quantity} items</Table.Cell>
                <Table.Cell>{order.shipping_address}</Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    onClick={() => toggleExpand(order.order_code)}
                  >
                    {expandedOrder === order.order_code ? "Hide" : "View"}
                  </Button>
                </Table.Cell>
              </Table.Row>

              {/* Collapsible row */}
              <Table.Row>
                <Table.Cell colSpan={7} padding={0}>
                  <Collapsible.Root
                    open={expandedOrder === order.order_code}
                    unmountOnExit
                  >
                    <Collapsible.Content>
                    <Box p="4" borderTop="1px solid #E2E8F0">
  <strong>Order Items:</strong>
  <Box mt={3}>
    {order.items.map((item) => (
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
          src={item.image || "/placeholder.png"} // fallback image
          alt={item.name}
          borderRadius="md"
        />
        <Box flex="1">
          <a href={`/product/${item.slug}`} style={{ fontWeight: "bold" }}>
            {item.name}
          </a>
          <Box fontSize="sm">
            Price:
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(item.price)}
          </Box>
          <Box fontSize="sm">
            Quantity: {item.quantity}
          </Box>
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

export default HistoryPage;
