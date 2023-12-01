import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useState } from 'react'

export function RegisterForm() {
  const toast = useToast()
  const [input, setInput] = useState({})
  const [isSubmiting, setIsSubmiting] = useState(false)
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsSubmiting(true)
    try {
      const requests = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      })
      if (requests.status != 200) {
        throw new Error('Error al registrar su usuario.')
      }
      toast({
        title: 'Usuario creado exitosamente.',
        description: 'Favor de iniciar sesion',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
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
    <form onSubmit={handleSubmit} style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
      <FormControl>
        <FormLabel fontSize={'small'}>Nombre/s</FormLabel>
        <Input fontSize={'medium'} onChange={handleInputChange} name='first_name' type='text' />
      </FormControl>
      <FormControl>
        <FormLabel fontSize={'small'}>Apellido/s</FormLabel>
        <Input fontSize={'medium'} onChange={handleInputChange} name='last_name' type='text' />
      </FormControl>
      <FormControl>
        <FormLabel fontSize={'small'}>Email</FormLabel>
        <Input fontSize={'medium'} onChange={handleInputChange} name='email' type='email' />
      </FormControl>
      <FormControl>
        <FormLabel fontSize={'small'}>Password</FormLabel>
        <Input fontSize={'medium'} onChange={handleInputChange} name='password' type='password' />
      </FormControl>
      <Button
        width={'100%'}
        mt={4}
        backgroundColor={'#222222'}
        color={'white'}
        isLoading={isSubmiting}
        type='submit'
        fontWeight='300'
        fontSize={'14px'}
        padding={'10px'}
      >
        Registrarme
      </Button>
    </form>
  )
}