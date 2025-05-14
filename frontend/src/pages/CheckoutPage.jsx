import { Grid, GridItem, Box } from "@chakra-ui/react"

const CheckoutPage = () => {
  return (
    <Grid
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem bgColor="red">
        <Box>rowSpan=2</Box>
      </GridItem>
      <GridItem bgColor={"blue"}>
        <Box>colSpan=2</Box>
      </GridItem>
      <GridItem rowSpan={2} bgColor={"yellow"}>
        <Box>colSpan=2</Box>
      </GridItem>
      <GridItem rowSpan={2} bgColor={"purple"}>
        <Box>colSpan=4</Box>
      </GridItem>
    </Grid>
  )
}

export default CheckoutPage