import { Text } from '@chakra-ui/react'
import { LoginForm } from './components/LoginForm'
import './loginCss.css'
import { useState } from 'react'
import { RegisterForm } from './components/RegisterForm'
import { AiOutlineArrowLeft } from 'react-icons/ai'
export function Login() {
  const [showRegister, setShowRegister] = useState(false)
  return (
    <main className='main__login'>
      <Text paddingBottom={'10px'} width={'90%'} fontSize={'4xl'} fontWeight={'500'}>Bienvenido a Crypthon, Inicia sesión para continuar</Text>
      {!showRegister && <Text paddingBottom={'10px'} width={'90%'} fontSize={'small'}>¿No tienes una cuenta?
        <a onClick={() => setShowRegister(!showRegister)} style={{ fontWeight: 'bold', textDecoration: 'underline' }}> Crea una aquí.</a>
        Te tomara menos de un minuto. </Text>}
      {showRegister ? <RegisterForm /> : <LoginForm />}
      {showRegister &&
        <a onClick={() => setShowRegister(!showRegister)} style={{ fontSize: 'small', marginTop: '10px', width: '90%', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AiOutlineArrowLeft />
          Iniciar sesión.
        </a>}
    </main>
  )
}