import {
  Box,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Error() {
  const token = localStorage.getItem('auth_token')
  const [tokenError, setTokenError] = useState(false)
  useEffect(() => {
    if (!token) {
      setTokenError(true)
    }
  }, [token])
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      minH="80vh"
      py="12"
      px={{
        base: '4',
        lg: '8',
      }}
    >
      <Heading fontWeight="extrabold" color="red">
        Error :( surgio un problema inesperado
      </Heading>
      <Text mt="4" fontSize="xl" fontWeight="medium">
        {tokenError ? 'No tienes los privilegios para estar aqui.' : 'Parece que has llegado a una página que no existe o ocurrio un problema.'}
      </Text>
      <Button
        as={Link}
        to={tokenError ? '/' : '/crypthon/home'}
        mt="8"
        colorScheme="teal"
        bg="teal.400"
        size="md"
      >
        {tokenError ? 'Vuelve a iniciar sesion.' : 'Volver a la página de inicio'}

      </Button>
    </Box>
  )
}