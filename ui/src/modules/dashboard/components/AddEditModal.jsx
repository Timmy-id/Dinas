import { useState, useEffect } from 'react';
import { Button, Input, VStack } from '@chakra-ui/react';
import { Field } from '../../../components/ui/field';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Checkbox } from '../../../components/ui/checkbox';

const AddEditModal = ({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  selectedItem,
}) => {
  const [item, setItem] = useState({
    name: '',
    quantity: '',
    price: '',
  });
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (selectedItem) {
      setItem(selectedItem);
    } else {
      setItem({
        name: '',
        description: '',
        price: '',
        isAvailable: true,
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
    setChecked(!!e.checked);
  };

  const handleSubmit = () => {
    if (selectedItem) {
      onEdit(item);
    } else {
      onAdd(item);
    }
    setItem({
      name: '',
      description: '',
      price: '',
      isAvailable: true,
    });
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button colorScheme='teal' mb={4}>
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {selectedItem ? 'Edit Item' : 'Add Item'}
        </DialogHeader>
        <DialogBody pb='8'>
          <VStack spacing={4}>
            <Field label='Name' required>
              <Input
                name='name'
                value={item.name}
                onChange={handleChange}
                placeholder='Enter item name'
              />
            </Field>

            <Field label='Description' required>
              <Input
                name='description'
                value={item.description}
                onChange={handleChange}
                placeholder='Enter description'
              />
            </Field>

            <Field label='Price' required>
              <Input
                name='price'
                type='number'
                step='0.01'
                value={item.price}
                onChange={handleChange}
                placeholder='Enter price'
              />
              <Checkbox
                checked={checked}
                onCheckedChange={handleChange}
                variant='solid'
              >
                Available
              </Checkbox>
            </Field>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
            {selectedItem ? 'Save Changes' : 'Add Item'}
          </Button>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default AddEditModal;
