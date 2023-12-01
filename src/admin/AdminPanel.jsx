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
import { AddCrypto } from './components/AddCrypto'
import { EditButton } from './components/EditButton'
import { DeleteCrypto } from './components/DeleteCrypto'
import { ImportCrypto } from './components/ImportCrypto'
import { ExportCrypto } from './components/ExportCryptos'
import { ExportTransactions } from './components/ExportTransactions'

export function AdminPanel() {
  const [isFetching, setFetch] = useState(false)
  const [cryptos, setCryptos] = useState([])
  const handleRefetch = () => {
    setFetch(!isFetching)
  }
  useEffect(() => {
    async function getCryptos() {
      const request = await fetch('http://localhost:3000/cryptocurrencies')
      const response = await request.json()
      setCryptos(response)
    }
    getCryptos()
  }, [isFetching])
  return (
    <main style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <AddCrypto setFetch={handleRefetch} />
      <TableContainer width={'100%'}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Imagen</Th>
              <Th>Nombre</Th>
              <Th>Opciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cryptos?.map(crypto => {
              return (
                <Tr key={crypto.id}>
                  <Td>
                    {crypto.id}
                  </Td>
                  <Td>
                    <img src={`data:image/png;base64,${crypto.cryptoImg}`} />
                  </Td>
                  <Td>
                    {crypto.cryptoName}
                  </Td>
                  <Td>
                    <EditButton cryptoInfo={crypto} setFetch={handleRefetch} />
                    <DeleteCrypto cryptoInfo={crypto} setFetch={handleRefetch} />
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <section style={{ width: '100%' }}>
        <ImportCrypto setFetch={handleRefetch} />
        <ExportCrypto setFetch={handleRefetch} />
        <ExportTransactions setFetch={handleRefetch} />
      </section>
    </main>
  )
}