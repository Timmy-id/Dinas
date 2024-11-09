import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import {
  FaChartLine,
  FaUtensils,
  FaUsers,
  FaTruck,
} from 'react-icons/fa6';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Analytics from './Analytics';
import Inventory from '../../Menu/components/Menu';

const DashboardPage = () => {
  const [active, setActive] = useState('Analytics');

  const navigate = useNavigate();

  const sections = [
    { label: 'Analytics', icon: <FaChartLine /> },
    { label: 'Orders', icon: FaUtensils },
    { label: 'Staff', icon: FaUsers },
    { label: 'Inventory', icon: FaTruck },
  ];

  const renderContent = () => {
    switch (active) {
      case 'Analytics':
        return <Analytics />;

      case 'Orders':
        return <Text>Orders</Text>;

      case 'Staff':
        return <Text>Staff</Text>;

      case 'Inventory':
        return <Inventory />;
      default:
        return null;
    }
  };

  return (
    <Flex h='100vh'>
      {/* Sidebar */}
      <Box w='250px' bg='teal.700' color='white' p={4}>
        <Heading size='lg' mb={6}>
          Dashboard
        </Heading>
        <VStack align='start' spacing={4}>
          {sections.map((section) => (
            <Flex
              key={section.label}
              align='center'
              p={2}
              borderRadius='md'
              cursor='pointer'
              bg={
                active === section.label ? 'teal.500' : 'transparent'
              }
              _hover={{ bg: 'teal.600' }}
              onClick={() => setActive(section.label)}
            >
              <IconButton
                icon={<section.icon />}
                aria-label={section.label}
                variant='ghost'
                color='white'
                mr={2}
              />
              <Text>{section.label}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box flex='1' p={6} overflowY='auto' bg='gray.100'>
        <Heading mb={6}>{active}</Heading>
        <Box p={4} bg='white' borderRadius='md' boxShadow='md'>
          {renderContent()}
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
