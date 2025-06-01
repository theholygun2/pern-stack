import Navbar from '@/components/ui/Navbar'
import { Container, Table } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';

const HistoryPage = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/order", {withCredentials: true}); // Or your endpoint
        console.log(res.data.data.orderHistory)
        setOrders(res.data.data.orderHistory)
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders(); // Call the async function
  }, []);

  


  function historyTable() {
    return (
      <Table.Root variant="outline" striped showColumnBorder>
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
            <Table.Row key={order.order_code}>
            <Table.Cell>{order.order_code}</Table.Cell>
            <Table.Cell>{order.created_at}</Table.Cell>
            <Table.Cell>{new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(order.total_price)}</Table.Cell>
            <Table.Cell>{order.status}</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>{order.shipping_address}</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
          </Table.Row>
          ))}
          
        </Table.Body>
      </Table.Root>
    )
  }
  return (
    <>
    <Navbar/>
    <Container p="4px">
        {historyTable()}
    </Container>
    </>
  )
}

export default HistoryPage