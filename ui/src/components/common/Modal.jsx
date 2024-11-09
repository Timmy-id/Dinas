import {
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogActionTrigger,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
const Modal = (props) => {
  const {
    title,
    children,
    openDialog,
    setOpenDialog,
    selectedItem,
    handleSubmit,
  } = props;
  return (
    <DialogRoot
      lazyMount
      open={openDialog}
      onOpenChange={(e) => setOpenDialog(e.open)}
    >
      <DialogTrigger asChild>
        <Button colorPalette='teal' mb={4}>
          Add Item
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody pb='8'>{children}</DialogBody>
        <DialogFooter>
          <Button colorPalette='blue' mr={3} onClick={handleSubmit}>
            {selectedItem ? 'Save Changes' : 'Add Item'}
          </Button>
          <DialogActionTrigger asChild>
            <Button colorPalette='red' variant='ghost'>
              Cancel
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default Modal;
