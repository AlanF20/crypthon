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
export function ExportTransactions({ setFetch }) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSubmit = async () => {

    try {
      const response = await fetch('http://localhost:3000/export_transactions')

      if (response.ok) {
        const blob = await response.blob()

        const downloadLink = document.createElement('a')
        downloadLink.href = window.URL.createObjectURL(blob)
        downloadLink.download = 'transactions_data.csv'

        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        toast({
          title: 'Exportacion realizada.',
          description: 'Archivos exportados correctamente.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Ocurrio un error.',
          description: 'Error al exportar el archivo.',
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
      <Button colorScheme='telegram' margin={'5px'} onClick={onOpen} fontSize={'small'} gap={'5px'}>
        Exportar transacciones
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
            ¿Desea exportar los datos de las transacciones?
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