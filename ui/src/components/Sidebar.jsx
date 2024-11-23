import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import { FcShop } from 'react-icons/fc';
import {
  FaUtensils,
  FaChartLine,
  FaTruck,
  FaMartiniGlassCitrus,
} from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

const SidebarLink = () => {
  const { pathname } = useLocation();

  const LINKS = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <FaChartLine />,
    },
    { name: 'Menu', href: '/menus', icon: <FaUtensils /> },
    { name: 'Orders', href: '/orders', icon: <FaTruck /> },
    {
      name: 'Tables',
      href: '/tables',
      icon: <FaMartiniGlassCitrus />,
    },
  ];
  return (
    <Flex direction='column' gap='2'>
      {LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          color='white'
          px='3'
          py='2'
          variant='plain'
          _hover={{ layerStyle: 'fill.solid', textDecor: 'none' }}
          layerStyle={pathname === link.href ? 'fill.muted' : ''}
        >
          <IconButton rounded='full'>{link.icon}</IconButton>
          {link.name}
        </Link>
      ))}
    </Flex>
  );
};

const Sidebar = () => {
  return (
    <Flex
      direction='column'
      bgColor='blackAlpha.900'
      color='white'
      p='3'
      w='60'
      minH='88.7vh'
    >
      <Flex align='center' gap='2' px='3' py='3'>
        <IconButton variant='ghost'>
          <FcShop />
        </IconButton>
        <Text>My Shop</Text>
      </Flex>
      <Box order='1' py='8'>
        <SidebarLink />
      </Box>
    </Flex>
  );
};

export default Sidebar;
