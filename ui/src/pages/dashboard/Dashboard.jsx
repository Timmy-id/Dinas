import {
  Box,
  Center,
  Circle,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  Tabs,
} from '@chakra-ui/react';
import { Tooltip } from '../../components/ui/tooltip';
import {
  FaTableList,
  FaUtensils,
  FaUsers,
  FaChartLine,
  FaTruck,
  FaMartiniGlassCitrus,
} from 'react-icons/fa6';
import Menu from '../menus/Menu';
import Analytics from '../analytics/Analytics';

const Dashboard = () => {
  return (
    <Flex minH='100dvh' bgColor='red.400'>
      <Tabs.Root
        orientation='vertical'
        variant='plain'
        defaultValue='analytics'
      >
        <Box bg='bg.muted' w='260px'>
          <Stack h='full' px='3' py='2'>
            <Box px='2'>
              <Tooltip
                content='Close sidebar'
                positioning={{ placement: 'right' }}
                showArrow
              >
                <IconButton variant='ghost'>
                  <FaTableList />
                </IconButton>
              </Tooltip>
            </Box>

            <Stack px='2' gap='3' mt='5'>
              <Tabs.List>
                <HStack
                  _hover={{
                    layerStyle: 'fill.muted',
                    textDecor: 'none',
                  }}
                  px='1'
                  h='10'
                  borderRadius='lg'
                  w='100%'
                  cursor='pointer'
                >
                  <Tabs.Trigger value='analytics'>
                    <Link
                      href='#'
                      variant='plain'
                      _hover={{ textDecor: 'none' }}
                    >
                      <Circle size='6' bg='bg' borderWidth='1px'>
                        <FaChartLine />
                      </Circle>
                      <Text fontSize='sm' fontWeight='medium'>
                        Analytics
                      </Text>
                    </Link>
                  </Tabs.Trigger>
                </HStack>

                <HStack
                  _hover={{
                    layerStyle: 'fill.muted',
                    textDecor: 'none',
                  }}
                  px='1'
                  h='10'
                  borderRadius='lg'
                  w='100%'
                  cursor='pointer'
                >
                  <Tabs.Trigger value='menu'>
                    <Link
                      href='#'
                      variant='plain'
                      _hover={{ textDecor: 'none' }}
                    >
                      <Circle size='6' bg='bg' borderWidth='1px'>
                        <FaUtensils />
                      </Circle>
                      <Text fontSize='sm' fontWeight='medium'>
                        Menu
                      </Text>
                    </Link>
                  </Tabs.Trigger>
                </HStack>

                <HStack
                  _hover={{
                    layerStyle: 'fill.muted',
                    textDecor: 'none',
                  }}
                  px='1'
                  h='10'
                  borderRadius='lg'
                  w='100%'
                  cursor='pointer'
                >
                  <Tabs.Trigger value='orders'>
                    <Link
                      href='#'
                      variant='plain'
                      _hover={{ textDecor: 'none' }}
                    >
                      <Circle size='6' bg='bg' borderWidth='1px'>
                        <FaTruck />
                      </Circle>
                      <Text fontSize='sm' fontWeight='medium'>
                        Orders
                      </Text>
                    </Link>
                  </Tabs.Trigger>
                </HStack>

                <HStack
                  _hover={{
                    layerStyle: 'fill.muted',
                    textDecor: 'none',
                  }}
                  px='1'
                  h='10'
                  borderRadius='lg'
                  w='100%'
                  cursor='pointer'
                >
                  <Tabs.Trigger value='tables'>
                    <Link
                      href='#'
                      variant='plain'
                      _hover={{ textDecor: 'none' }}
                    >
                      <Circle size='6' bg='bg' borderWidth='1px'>
                        <FaMartiniGlassCitrus />
                      </Circle>
                      <Text fontSize='sm' fontWeight='medium'>
                        Tables
                      </Text>
                    </Link>
                  </Tabs.Trigger>
                </HStack>

                <HStack
                  _hover={{
                    layerStyle: 'fill.muted',
                    textDecor: 'none',
                  }}
                  px='1'
                  h='10'
                  borderRadius='lg'
                  w='100%'
                  cursor='pointer'
                >
                  <Tabs.Trigger value='staff'>
                    <Link
                      href='#'
                      variant='plain'
                      _hover={{ textDecor: 'none' }}
                    >
                      <Circle size='6' bg='bg' borderWidth='1px'>
                        <FaUsers />
                      </Circle>
                      <Text fontSize='sm' fontWeight='medium'>
                        Staff
                      </Text>
                    </Link>
                  </Tabs.Trigger>
                </HStack>
              </Tabs.List>
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Stack h='full'>
            <Box>Top</Box>
            <Center flex='1'>
              <Tabs.Content value='analytics'>
                <Analytics />
              </Tabs.Content>

              <Tabs.Content value='menu'>
                <Menu />
              </Tabs.Content>
              <Tabs.Content value='orders'>Orders</Tabs.Content>
              <Tabs.Content value='tables'>Tables</Tabs.Content>
              <Tabs.Content value='staff'>Staff</Tabs.Content>
            </Center>
            <Box pb='2'>Bottom</Box>
          </Stack>
        </Box>
      </Tabs.Root>
    </Flex>
  );
};

export default Dashboard;
