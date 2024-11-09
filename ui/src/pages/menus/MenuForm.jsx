import { useState, useEffect } from 'react';
import { Input, VStack } from '@chakra-ui/react';
import { Field } from '../../components/ui/field';
import { Checkbox } from '../../components/ui/checkbox';
import {
  DialogBody,
  DialogActionTrigger,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';

const MenuForm = (props) => {
  const { onAdd, onEdit, selectedItem } = props;

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

  // const handleAdd = (item) => {
  //   setItems([...items, { ...item, id: items.length + 1 }]);
  // };

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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {selectedItem ? 'Edit Menu' : 'Add Menu'}
        </DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack spacing={4}>
          <Field label='Name' required>
            <Input
              name='name'
              placeholder='Enter item name'
              value={item.name}
              onChange={handleChange}
            />
          </Field>

          <Field label='Description' required>
            <Input
              name='description'
              placeholder='Enter description'
              value={item.description}
              onChange={handleChange}
            />
          </Field>

          <Field label='Price' required>
            <Input
              name='price'
              type='number'
              step='100'
              placeholder='Enter price'
              value={item.price}
              onChange={handleChange}
            />
            <Checkbox
              checked={checked}
              variant='solid'
              onCheckedChange={handleChange}
            >
              Available
            </Checkbox>
          </Field>
        </VStack>
      </DialogBody>
      <DialogFooter>
        <DialogActionTrigger asChild>
          <Button variant='outline'>Cancel</Button>
        </DialogActionTrigger>
        <Button onClick={handleSubmit}>
          {selectedItem ? 'Save' : 'Add'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MenuForm;
