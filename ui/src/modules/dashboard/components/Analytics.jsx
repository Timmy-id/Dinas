import {
  Table,
  Flex,
  Heading,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react';
import {
  StatRoot,
  StatLabel,
  StatValueText,
} from '../../../components/ui/stat';

const Analytics = () => {
  return (
    <Flex h='100vh' overflow='hidden'>
      {/* Main Content */}
      <Box flex='1' p={6} overflowY='auto'>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {/* Card 1: Daily Sales */}
          <GridItem bg='white' boxShadow='md' p={4} borderRadius='lg'>
            <StatRoot>
              <StatLabel>Daily Sales</StatLabel>
              <StatValueText>$1,200</StatValueText>
            </StatRoot>
          </GridItem>

          {/* Card 2: Total Orders */}
          <GridItem bg='white' boxShadow='md' p={4} borderRadius='lg'>
            <StatRoot>
              <StatLabel>Total Orders</StatLabel>
              <StatValueText>45</StatValueText>
            </StatRoot>
          </GridItem>

          {/* Card 3: Inventory Levels */}
          <GridItem bg='white' boxShadow='md' p={4} borderRadius='lg'>
            <StatRoot>
              <StatLabel>Low Stock Items</StatLabel>
              <StatValueText>5</StatValueText>
            </StatRoot>
          </GridItem>
        </Grid>

        {/* Order Management Table */}
        <Box mt={10}>
          <Heading size='md' mb={4}>
            Recent Orders
          </Heading>
          <Table.Root variant='line'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Order ID</Table.ColumnHeader>
                <Table.ColumnHeader>Customer</Table.ColumnHeader>
                <Table.ColumnHeader>Items</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Amount</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>#001</Table.Cell>
                <Table.Cell>John Doe</Table.Cell>
                <Table.Cell>3</Table.Cell>
                <Table.Cell color='green.500'>Completed</Table.Cell>
                <Table.Cell>$45</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>#002</Table.Cell>
                <Table.Cell>Jane Smith</Table.Cell>
                <Table.Cell>2</Table.Cell>
                <Table.Cell color='orange.500'>Pending</Table.Cell>
                <Table.Cell>$30</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>#003</Table.Cell>
                <Table.Cell>Mike Johnson</Table.Cell>
                <Table.Cell>4</Table.Cell>
                <Table.Cell color='red.500'>Canceled</Table.Cell>
                <Table.Cell>$50</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  );
};

export default Analytics;
