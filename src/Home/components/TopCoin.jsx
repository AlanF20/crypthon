import { Text } from '@chakra-ui/react'
import downWave from '../assets/downWave.svg'
import downWavex2 from '../assets/downWavex2.svg'
import downWavex3 from '../assets/downWavex3.svg'
import upWave from '../assets/upWave.svg'
import upWavex2 from '../assets/upWavex2.svg'
import upWavex3 from '../assets/upWavex3.svg'

export function TopCoin({ img, coinName, price }) {
  const waves = [downWave, downWavex2, downWavex3, upWave, upWavex2, upWavex3]
  const randomWave = waves[Math.floor(Math.random() * 6)]
  return (
    <div className='topCoin' style={{ backgroundImage: `url(${randomWave})`, backgroundPosition: 'bottom'}}>
      <div className='topCoin__img'>
        <img className='container__img' src={img} />
      </div>
      <section className='topCoin__info'>
        <Text fontSize='medium' fontWeight='bolder'>{coinName}</Text>
        <Text fontSize='small' color='#979797' >${price}</Text>
      </section>
    </div>
  )
}