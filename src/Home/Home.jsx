import { Heading, Text } from '@chakra-ui/react'
import { BiTransfer, BiDownArrowAlt, BiSolidUpArrowAlt } from 'react-icons/bi'
import { NewBadge } from './components/NewBadge'
import './homeStyles.css'
import { NewButton } from './components/NewButton'
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
              <BiTransfer fontSize='2.2rem'/>
            </NewButton>
            <NewButton text='Depositar'>
              <BiSolidUpArrowAlt fontSize='2.2rem'/>
            </NewButton>
            <NewButton text='Retirar'>
              <BiDownArrowAlt fontSize='2.2rem'/>
            </NewButton>
          </div>
        </section>
      </main>
    </main>
  )
}