import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import './portfolioStyles.css'
import { Text } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)


export function Portfolio() {
  const [wallet, setWallet] = useState([])
  const userInfo = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    async function getWallet() {
      const request = await fetch(`http://localhost:3000/wallet/${userInfo.id}`)
      const response = await request.json()
      setWallet(response)
    }
    getWallet()
  })
  const labels = wallet.map(item => {
    return item.cryptoData.cryptoName
  })
  const ammounts = wallet.map(item => {
    return item.quantity
  })
  const data = {
    labels,
    datasets: [
      {
        label: '% in portfolio',
        data: ammounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <main className='portfolio__main'>
      <Text fontSize='4xl' fontWeight='bolder' paddingTop='20px' paddingLeft={'30px'}>Portfolio</Text>
      <Pie data={data} />
      <TableContainer paddingTop='20px'>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Simbolo</Th>
              <Th>Nombre</Th>
              <Th isNumeric>Cantidad en portafolio</Th>
            </Tr>
          </Thead>
          <Tbody>
            {wallet.map(wallet => {
              return (
                <Tr key={wallet.id}>
                  <Td>
                    <img src={`data:image/png;base64,${wallet.cryptoData.cryptoImg}`}></img>
                  </Td>
                  <Td>{wallet.cryptoData.cryptoName}</Td>
                  <Td>{wallet.quantity}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </main>
  )
}