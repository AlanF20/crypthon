import { Heading, Text } from '@chakra-ui/react'
import { IoSwapHorizontal } from 'react-icons/io5'
import { NewBadge } from './components/NewBadge'
import './homeStyles.css'
import { NewButton } from './components/NewButton'
import { Link } from 'react-router-dom'
import { TopCoin } from './components/TopCoin'
import { useEffect, useState } from 'react'
import { Deposit } from './components/Deposit'
import { Withdraw } from './components/Withdraw'

export function Home() {
  const [cryptos, setCryptos] = useState([])
  const [user, setUser] = useState({})
  const [reFetch, setRefetch] = useState(false)
  const userId = localStorage.getItem('user_id')
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  })
  const handleRefetch = () => {
    setRefetch(!reFetch)
  }
  const formattedAmount = formatter.format(user.money_balance)
  useEffect(() => {
    async function getCryptos() {
      const request = await fetch('http://localhost:3000/cryptocurrencies')
      const response = await request.json()
      setCryptos(response)
    }
    async function getUser() {
      const request = await fetch(`http://localhost:3000/user_profile/${userId}`)
      const response = await request.json()
      localStorage.setItem('user', JSON.stringify(response))
      setUser(response)
    }
    getCryptos()
    getUser()
  }, [userId, reFetch])
  return (
    <main className='main'>
      <header className='home__header'>
        <NewBadge text='Obten $100' />
      </header>
      <main className='home__main'>
        <section className='main__portfolio'>
          <Text fontSize='xl' color='#979797' paddingBottom='10px'>Balance del portafolio</Text>
          <Heading size='4xl' fontWeight='600' color={user.money_balance < 0 ? 'red' : ''}>{formattedAmount}</Heading>
          <div className='portfolioActions'>
            <NewButton text='Trade'>
              <IoSwapHorizontal fontSize='2rem' />
            </NewButton>
            <Deposit fetchInfo={handleRefetch} />
            <Withdraw fetchInfo={handleRefetch} />
          </div>
        </section>
        <section className='topCoins'>
          <header className='topCoins__header'>
            <Text fontSize='medium'>Top coins</Text>
            <Text fontSize='small'>
              <Link to='/crypthon/coins'>
                Ver todo
              </Link>
            </Text>
          </header>
          <main className='topCoins__main'>
            {cryptos.map(crypto => {
              return (
                <TopCoin key={crypto.id} img={crypto.cryptoImg} coinName={crypto.cryptoName} price={crypto.cryptoPrice} />
              )
            })}
          </main>
        </section>
      </main>
      <section className='gainers'>
        <header className='gainers__header'>
          <div>
            <Text fontSize='medium'>Gainers and losers</Text>
            <Text fontSize='small' color='#979797'>Basado en el top 100 de monedas</Text>
          </div>
          <Text fontSize='small'>
            <Link to='/crypthon/coins'>
              Ver todo
            </Link>
          </Text>
        </header>
      </section>
    </main>
  )
}
