import { Heading, Text } from '@chakra-ui/react'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { IoSwapHorizontal } from 'react-icons/io5'
import { NewBadge } from './components/NewBadge'
import './homeStyles.css'
import { NewButton } from './components/NewButton'
import { Link } from 'react-router-dom'
import { cryptoCurrencies } from './utils'
import { TopCoin } from './components/TopCoin'

export function Home() {

  return (
    <main className='main'>
      <header className='home__header'>
        <NewBadge text='Obten $100' />
      </header>
      <main className='home__main'>
        <section className='main__portfolio'>
          <Text fontSize='xl' color='#979797' paddingBottom='10px'>Balance del portafolio</Text>
          <Heading size='4xl' fontWeight='600'>$21,667.37</Heading>
          <div className='portfolioActions'>
            <NewButton text='Trade'>
              <IoSwapHorizontal fontSize='2rem' />
            </NewButton>
            <NewButton text='Depositar'>
              <AiOutlineArrowUp fontSize='2rem' />
            </NewButton>
            <NewButton text='Retirar'>
              <AiOutlineArrowDown fontSize='2rem' />
            </NewButton>
          </div>
        </section>
        <section className='topCoins'>
          <header className='topCoins__header'>
            <Text fontSize='medium'>Top coins</Text>
            <Text fontSize='small'>
              <Link to='/coins'>
                Ver todo
              </Link>
            </Text>
          </header>
          <main className='topCoins__main'>
            {cryptoCurrencies.map(crypto => {
              return (
                <TopCoin key={crypto.cryptoSymbol} img={crypto.cryptoImg} coinName={crypto.cryptoName} price={crypto.cryptoPrice} />
              )
            })}
          </main>
        </section>
      </main>
      <section className='gainers'>
        <header className='gainers__header'>
          <div>
            <Text fontSize='medium'>Gainers and losers</Text>
            <Text fontSize='x-small' color='#979797'>Basado en el top 100 de monedas</Text>
          </div>
          <Text fontSize='small'>
            <Link to='coins'>
              Ver todo
            </Link>
          </Text>
        </header>
      </section>
    </main>
  )
}
