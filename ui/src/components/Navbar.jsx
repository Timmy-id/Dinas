import { Box, Container, Flex, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';

const Navbar = () => {
  return (
    <Box py='4' bgColor='red.400'>
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between'>
          <Link to='/'>
            <Box
              fontSize='2xl'
              fontWeight='bold'
              color='white'
              letterSpacing='widest'
              fontFamily='mono'
            >
              DINAS
            </Box>
          </Link>
          <IconButton bgColor='red.400'>
            <FaCartShopping />
          </IconButton>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
