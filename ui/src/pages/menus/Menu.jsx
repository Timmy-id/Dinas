import { useState, useEffect } from 'react';
import { Box, Table, Heading, IconButton } from '@chakra-ui/react';
import { Checkbox } from '../../components/ui/checkbox';
import { Tooltip } from '../../components/ui/tooltip';
import {
  DialogTrigger,
  DialogRoot,
} from '../../components/ui/dialog';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa6';
import { useMenuStore } from '../../store/menuStore';
import MenuForm from './MenuForm';

const Menu = () => {
  const { menus, fetchMenus } = useMenuStore();

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const [editMenu, setEditMenu] = useState(null);

  const openEditForm = (menu) => setEditMenu(menu);
  const closeForm = () => setEditMenu(null);

  return (
    <Box p={6}>
      <Heading mb={6} color='white'>
        Menu Management
      </Heading>

      <DialogRoot motionPreset='slide-in-bottom'>
        <DialogTrigger asChild>
          <IconButton mb='3' bgColor='green.400'>
            <Tooltip
              content='Add menu'
              positioning={{ placement: 'top' }}
            >
              <FaPlus />
            </Tooltip>
          </IconButton>
        </DialogTrigger>
        <MenuForm />
      </DialogRoot>

      <Table.Root
        variant='simple'
        bg='white'
        boxShadow='md'
        borderRadius='md'
        minW='75vw'
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader fontWeight='bold'>
              Name
            </Table.ColumnHeader>
            <Table.ColumnHeader fontWeight='bold'>
              Description
            </Table.ColumnHeader>
            <Table.ColumnHeader fontWeight='bold'>
              Price ($)
            </Table.ColumnHeader>
            <Table.ColumnHeader fontWeight='bold'>
              Available
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {menus.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>
                {item.isAvailable ? (
                  <Checkbox checked disabled>
                    {item.isAvailable}
                  </Checkbox>
                ) : (
                  <Checkbox disabled>{item.isAvailable}</Checkbox>
                )}
              </Table.Cell>
              <Table.Cell>
                <IconButton
                  mr={2}
                  colorPalette='blue'
                  aria-label='Edit Item'
                  onClick={() => {}}
                >
                  <FaPen />
                </IconButton>
                <IconButton
                  colorPalette='red'
                  aria-label='Delete Item'
                >
                  <FaTrash />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default Menu;
