import { useState } from 'react';
import { Box, Table, Heading, IconButton } from '@chakra-ui/react';
import { Checkbox } from '../../components/ui/checkbox';
import { Tooltip } from '../../components/ui/tooltip';
import {
  DialogTrigger,
  DialogRoot,
} from '../../components/ui/dialog';
import { FaPen, FaTrash, FaPlus } from 'react-icons/fa6';
import MenuForm from './MenuForm';

const Menu = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Fried Rice',
      description: 'A very good meal',
      price: 1.5,
      isAvailable: true,
    },
    {
      id: 2,
      name: 'Jollof Rice',
      description: 'A very good meal',
      price: 2.5,
      isAvailable: false,
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setItems(items.map((i) => (i.id === item.id ? item : i)));
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

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
          {items.map((item) => (
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
                  onClick={() => handleEdit(item)}
                  aria-label='Edit Item'
                >
                  <FaPen />
                </IconButton>
                <IconButton
                  colorPalette='red'
                  onClick={() => handleDelete(item.id)}
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
