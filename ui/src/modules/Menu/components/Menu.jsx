import { useState } from 'react';
import { Box, Table, Heading, IconButton } from '@chakra-ui/react';
import { Checkbox } from '../../../components/ui/checkbox';
import { Button } from '../../../components/ui/button';
import { FaPen, FaTrash } from 'react-icons/fa6';
import AddEditModal from '../../dashboard/components/AddEditModal';
import Modal from '../../../components/common/Modal';
import { DialogTrigger } from '../../../components/ui/dialog';
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
  const { openDialog, setOpenDialog } = useState(false);

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

  const handleOpenModal = (e) => {
    setOpenDialog(e.openDialog);
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Inventory Management</Heading>
      <Modal
        title={'Add Menu'}
        handleSubmit={handleAdd}
        selectedItem={selectedItem}
        openDialog={openDialog}
        setOpenDialog={handleOpenModal}
      >
        <MenuForm />
      </Modal>

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

export default Menu;
