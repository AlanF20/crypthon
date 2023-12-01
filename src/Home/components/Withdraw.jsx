import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { NewButton } from './NewButton'
export function Withdraw({ fetchInfo }) {
  const toast = useToast()
  const oldUserInfo = JSON.parse(localStorage.getItem('user'))
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mount, setMount] = useState(0)
  const handleInputChange = (e) => {
    setMount({ [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await fetch(`http://localhost:3000/withdraw_money_balance/${oldUserInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mount)
      })
      toast({
        title: 'Informacion actualizada.',
        description: 'Monto actualizado correctamente',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      fetchInfo()
      onClose()
    } catch (err) {
      toast({
        title: 'Ocurrio un error.',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }
  return (
    <>
      <NewButton text='Retirar' onClick={onOpen}>
        <AiOutlineArrowDown fontSize={'20px'} />
      </NewButton>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'medium'}>Añadir una nueva moneda.</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl >
                <FormLabel fontSize={'small'}>Nombre</FormLabel>
                <Input onChange={handleInputChange} fontSize={'small'} placeholder='100' name='money_balance' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type='submit' fontSize={'small'} colorScheme='blue' mr={3}>
                Guardar
              </Button>
              <Button fontSize={'small'} onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}