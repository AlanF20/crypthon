import { useNavigate } from 'react-router-dom'
import './landingPage.css'
import background from '../assets/cryptocurrency-as-a-payment-method-traded-and-exchanged-1670227192.svg'
import { FaArrowRight } from 'react-icons/fa6'
export function LandingPage() {
  const navigate = useNavigate()
  function goToLogin() {
    navigate('/Login')
  }
  return (
    <main className="landing__main">
      <h1 className='landing__main-title'>Crypthon</h1>
      <img className='landing__img' src={background} />
      <div className='landing__cont'>
        <p className='landing__subtitle'>Más que una aplicación de exchange.</p>
        <p className='landing__p'>Experimente una negociación fluida y una gestión de activos segura</p>
      </div>
      <button onClick={goToLogin} className='toLogin'>
        Iniciar sesión.
        <FaArrowRight />
      </button>
    </main>
  )
}