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
import { AiOutlineEdit } from 'react-icons/ai'
export function EditButton({ cryptoInfo, setFetch }) {
  const toast = useToast()
  const token = localStorage.getItem('auth_token')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState(cryptoInfo)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, cryptoImg: file })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const cryptoData = new FormData()
    cryptoData.append('cryptoName', formData.cryptoName)
    cryptoData.append('cryptoSymbol', formData.cryptoSymbol)
    cryptoData.append('cryptoPrice', formData.cryptoPrice)
    cryptoData.append('cryptoImg', formData.cryptoImg)
    cryptoData.append('coinIncrement', formData.coinIncrement)
    try {
      const request = await fetch(`http://localhost:3000/edit_crypto/${formData.id}`, {
        method: 'PUT',
        headers: {
          token: token
        },
        body: cryptoData,
      })
      const response = await request.json()
      if (response.message == 'Token no encontrado' || response.message == 'Token invalido') {
        throw new Error
      } else {
        toast({
          title: 'Edicion realizada.',
          description: 'Criptomoneda editada correctamente.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
      setFetch()
      onClose()
    } catch (error) {
      toast({
        title: 'Ocurrio un error.',
        description: 'Error al editar la criptomoneda.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      onClose()
    }
  }
  return (
    <>
      <Button colorScheme='telegram' maxWidth={'100px'} margin={'5px'} onClick={onOpen} fontSize={'small'} gap={'5px'}>
        <AiOutlineEdit fontSize={'large'} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'medium'}>Editar {cryptoInfo.cryptoName}.</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl >
                <FormLabel fontSize={'small'}>Nombre</FormLabel>
                <Input value={formData.cryptoName} onChange={handleInputChange} fontSize={'small'} placeholder='Bitcoin...' name='cryptoName' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontSize={'small'}>Precio</FormLabel>
                <Input value={formData.cryptoPrice} onChange={handleInputChange} fontSize={'small'} placeholder='35000 USD...' name='cryptoPrice' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontSize={'small'}>Simbolo</FormLabel>
                <Input value={formData.cryptoSymbol} onChange={handleInputChange} fontSize={'small'} placeholder='BTC...' name='cryptoSymbol' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontSize={'small'}>Incremento</FormLabel>
                <Input value={formData.coinIncrement} onChange={handleInputChange} fontSize={'small'} placeholder='2.4%...' name='coinIncrement' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontSize={'small'}>Imagen</FormLabel>
                <input onChange={handleFileChange} style={{ fontSize: '12px' }} placeholder='Subir archivo...' name='cryptoImg' type='file' />
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