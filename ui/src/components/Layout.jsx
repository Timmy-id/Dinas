import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Box bg='gray.100'>
      <Navbar />
      <Flex direction='row'>
        <Sidebar />
        <main>{children}</main>
      </Flex>
    </Box>
  );
};

export default Layout;
