import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export function LoginForm() {
  const toast = useToast()
  const [input, setInput] = useState({})
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmiting(true)
    try {
      const requests = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      })
      if (requests.status != 200) {
        throw new Error('Error al iniciar sesión.')
      }

      const response = await requests.json()
      localStorage.setItem('auth_token', response.auth_token)
      localStorage.setItem('user_id', response.user_id)
      setIsLoggedIn(() => true)
    } catch (err) {
      toast({
        title: 'Ocurrio un error.',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      setIsSubmiting(() => false)
    }
  }
  return (
    <form style={{ width: '90%' }} onSubmit={handleSubmit}>
      <FormControl width={'100%'}>
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
        Iniciar sesión
      </Button>
      {isLoggedIn && <Navigate to={'/crypthon/home'} replace />}
    </form>
  )
}