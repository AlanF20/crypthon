import { Heading, Text } from '@chakra-ui/react'
import { NewBadge } from './components/NewBadge'
import './homeStyles.css'
export function Home() {
  return (
    <main className='main'>
      <header className='home__header'>
        <NewBadge text='Obten $100'/>
      </header>
      <main className='home__main'>
        <section className='main__portfolio'>
          <Text fontSize='2xl' color='#979797'>Balance del portafolio</Text>
          <Heading size='4xl'>$21,667.37</Heading>
          <div>

          </div>
        </section>
      </main>
    </main>
  )
}