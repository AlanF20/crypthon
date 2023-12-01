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
  useToast,
  Text,
} from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'
export function DeleteCrypto({ cryptoInfo, setFetch }) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/delete_crypto/${cryptoInfo.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Eliminacion realizada.',
          description: 'Criptomoneda eliminada correctamente.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Ocurrio un error.',
          description: 'Error al eliminar la criptomoneda.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      setFetch()
      onClose()
    } catch (error) {
      console.error('Error de red:', error)
    }
  }
  return (
    <>
      <Button colorScheme='red' maxWidth={'100px'} margin={'5px'} onClick={onOpen} fontSize={'small'} gap={'5px'}>
        <AiOutlineDelete fontSize={'large'} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'medium'}>Editar {cryptoInfo.cryptoName}.</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize={'medium'}>¿Desea eliminar el registro: {cryptoInfo.id}</Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} fontSize={'small'} colorScheme='red' mr={3}>
              Confirmar
            </Button>
            <Button fontSize={'small'} onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}