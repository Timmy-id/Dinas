import { useState } from 'react';
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
import { useMenuStore } from '../../store/menuStore';

const MenuForm = (props) => {
  const { menu = {}, onClose } = props;
  const { createMenu, updateMenu } = useMenuStore();
  const [menuForm, setMenuForm] = useState({
    name: menu.name || '',
    description: menu.description || '',
    price: menu.price || '',
    isAvailable: menu.isAvailable || true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (menu.id) {
      updateMenu(menu.id, menuForm);
    } else {
      createMenu(menuForm);
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMenuForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {menu.id ? 'Edit Menu' : 'Add Menu'}
        </DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack spacing={4}>
          <Field label='Name' required>
            <Input
              name='name'
              placeholder='Enter item name'
              value={menuForm.name}
              onChange={handleChange}
            />
          </Field>

          <Field label='Description' required>
            <Input
              name='description'
              placeholder='Enter description'
              value={menuForm.description}
              onChange={handleChange}
            />
          </Field>

          <Field label='Price' required>
            <Input
              name='price'
              placeholder='Enter price'
              value={menuForm.price}
              onChange={handleChange}
            />
            <Checkbox
              name='isAvailable'
              checked={menuForm.isAvailable}
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
          {menu.id ? 'Save' : 'Add'} Menu
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MenuForm;
