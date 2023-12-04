import { Button, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export function Profile() {
  const [userInfo, setUserInfo] = useState({})
  const [update, setUpdated] = useState(false)
  const navigate = useNavigate()
  const oldUserInfo = JSON.parse(localStorage.getItem('user'))
  const toast = useToast()
  const handleChange = (e) => {
    e.preventDefault()
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch(`http://localhost:3000/edit_user/${oldUserInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      toast({
        title: 'Accion completada.',
        description: 'Tu informacion se actualizo correctamente.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setUpdated(true)
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
  const handleCloseSession = () => {
    localStorage.clear()
    navigate('/')
  }
  return (
    <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Text width={'100%'} fontSize={'2rem'} paddingLeft={'30px'} paddingTop={'20px'} fontWeight={'bolder'}>Mi cuenta</Text>
      <form style={{ width: '90%' }} onSubmit={handleSubmit}>
        <FormControl >
          <FormLabel fontSize={'small'}>Nombre</FormLabel>
          <Input defaultValue={oldUserInfo.first_name} onChange={handleChange} fontSize={'small'} placeholder='Alan Flores...' name='first_name' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontSize={'small'}>Email</FormLabel>
          <Input defaultValue={oldUserInfo.email} onChange={handleChange} fontSize={'small'} placeholder='tucorreo@dominio.com' name='email' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontSize={'small'}>Contraseña</FormLabel>
          <Input defaultValue={oldUserInfo.password} onChange={handleChange} fontSize={'small'} type='password' placeholder='seguridad...' name='password' />
        </FormControl>

        <Button type='submit' fontSize={'small'} colorScheme='blue' marginTop={'15px'}>
          Actualizar mi información.
        </Button>
        <Button onClick={handleCloseSession} type='button' fontSize={'small'} colorScheme='red' marginTop={'15px'} marginLeft={'15px'}>
          Cerrar sesión.
        </Button>
      </form>
      {update && <Navigate to='/crypthon/home' />}
    </main>
  )
}