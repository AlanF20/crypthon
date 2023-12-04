import { Text } from '@chakra-ui/react'
import { CoinContainer } from './components/CoinContainer'
import './coinsStyles.css'
import { useEffect, useState } from 'react'

export function Coins() {
  const [coins, setCoins] = useState([])
  const token = localStorage.getItem('auth_token')
  useEffect(() => {
    async function getCryptos() {
      const request = await fetch('http://localhost:3000/cryptocurrencies', {
        headers: {
          token: token
        }
      })
      const response = await request.json()
      setCoins(response)
    }
    getCryptos()
  }, [token])
  return (
    <main className='coins__main'>
      <Text className='coins__title'>All coins</Text>
      {coins.map(coin => {
        return (
          <CoinContainer key={coin.cryptoSymbol} img={coin.cryptoImg} coinIncrement={coin.coinIncrement} coinName={coin.cryptoName} coinPrice={coin.cryptoPrice} coinSymbol={coin.cryptoSymbol} />
        )
      })}
    </main>
  )
}