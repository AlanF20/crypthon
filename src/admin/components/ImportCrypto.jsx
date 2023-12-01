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
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
export function ImportCrypto({setFetch}) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [file, setFile] = useState([])
  const handleChange = (e) => {
    setFile(e.target.files[0])
  }
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('http://localhost:3000/add_crypto_csv', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast({
          title: 'Importacion realizada.',
          description: 'Archivos importados correctamente.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Ocurrio un error.',
          description: 'Error al importar el archivo.',
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
      <Button colorScheme='telegram' maxWidth={'100px'} margin={'5px'} onClick={onOpen} fontSize={'small'} gap={'5px'}>
        Importar
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'medium'}>Importar registros</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <input type='file' onChange={handleChange} name='file' />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} fontSize={'small'} colorScheme='telegram' mr={3}>
              Confirmar
            </Button>
            <Button fontSize={'small'} onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}