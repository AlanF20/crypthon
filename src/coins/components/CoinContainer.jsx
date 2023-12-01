import { Text } from '@chakra-ui/react'

export function CoinContainer({ img, coinName, coinSymbol, coinPrice, coinIncrement }) {
  return (
    <article className='coin'>
      <div className='coin__image'>
        <img src={`data:image/png;base64,${img}`} />
      </div>
      <div className='coin__info'>
        <Text fontSize='2xl' fontWeight='bold'>{coinName}</Text>
        <Text fontSize='xl' color='#979797'>{coinSymbol}</Text>
      </div>
      <div className='coin__priceInfo'>
        <Text fontSize='2xl'>{coinPrice}</Text>
        <Text fontSize='xl' color='green' >+{coinIncrement}%</Text>
      </div>
    </article>
  )
}