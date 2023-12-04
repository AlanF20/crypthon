import { Text } from '@chakra-ui/react'

export function TopGainers({ img, coinName, price, coinIncrement }) {
  return (
    <div className='topGainer'>
      <div className='topGainer__img'>
        <img className='container__img' src={`data:image/png;base64,${img}`} />
      </div>
      <section className='top__info'>
        <Text fontSize='small' fontWeight='bolder'>{coinName}</Text>
        <Text fontSize='1.2rem' color='#979797' >${price}</Text>
      </section>
      <Text fontSize='small' alignSelf={'flex-end'} >{coinIncrement}%</Text>
    </div>
  )
}