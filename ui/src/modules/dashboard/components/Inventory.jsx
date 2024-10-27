import { useState } from 'react';
import {
  Box,
  Table,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPen, FaTrash } from 'react-icons/fa6';
import AddEditModal from './AddEditModal';

const Inventory = () => {
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  // CRUD Handlers
  const handleAdd = (item) => {
    setItems([...items, { ...item, id: items.length + 1 }]);
    onClose();
  };

  const handleEdit = (item) => {
    setItems(items.map((i) => (i.id === item.id ? item : i)));
    onClose();
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleOpenEditModal = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Inventory Management</Heading>
      <AddEditModal
        isOpen={isOpen}
        onClose={onClose}
        onAdd={handleAdd}
        onEdit={handleEdit}
        selectedItem={selectedItem}
      />

      <Table.Root
        variant='simple'
        bg='white'
        boxShadow='md'
        borderRadius='md'
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Price ($)</Table.ColumnHeader>
            <Table.ColumnHeader>Available</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.isAvailable}</Table.Cell>
              <Table.Cell>
                <IconButton
                  mr={2}
                  colorPalette='blue'
                  onClick={() => handleOpenEditModal(item)}
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

export default Inventory;
