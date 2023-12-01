import { Button, Input, Select, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { Navigate } from 'react-router-dom'

export function Trade() {
  const toast = useToast()
  const [navigate, setNavigate] = useState(false)
  const [coins, setCoins] = useState([])
  const [selected, setSelected] = useState({})
  const [input, setInput] = useState(0)
  const [exceed, setExceed] = useState(false)
  const [valueInput, setValueInput] = useState(0)
  const oldUserInfo = JSON.parse(localStorage.getItem('user'))
  const handleSelected = (e) => {
    const selectedCrypto = coins.find((crypto) => crypto.cryptoName === e.target.value)
    if (selectedCrypto.cryptoImg == undefined) {
      setSelected(coins[0])
    }
    setSelected(selectedCrypto)
  }
  useEffect(() => {
    if (input > oldUserInfo.money_balance) {
      setExceed(true)
    } else {
      setExceed(false)
    }
  }, [input, oldUserInfo.money_balance])
  useEffect(() => {
    async function getCryptos() {
      const request = await fetch('http://localhost:3000/cryptocurrencies')
      const response = await request.json()
      setCoins(response)
      setSelected(response[0])
    }
    getCryptos()
  }, [])
  useEffect(() => {
    const conversion = selected.cryptoPrice * valueInput
    setInput(conversion)
  }, [selected, valueInput])
  const formatter = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })
  const formattedAmount = formatter.format(selected.cryptoPrice)
  const formattedConversionAmount = formatter.format(input)
  const formattedTotal = formatter.format(oldUserInfo.money_balance)
  const handleInputChange = (e) => {
    setValueInput(e.target.value)
  }
  const handleBuy = async () => {
    const finalObj = {
      user_id: oldUserInfo.id,
      crypto_id: selected.id,
      quantity: Number(valueInput)
    }
    try {
      await fetch('http://localhost:3000/buy_crypto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalObj)
      })
      toast({
        title: 'Accion completada.',
        description: 'Tu informacion se actualizo correctamente.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setNavigate(true)
    } catch (err) {
      toast({
        title: 'Ocurrio un error.',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }
  return (
    <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Text width={'100%'} fontSize={'2rem'} paddingLeft={'30px'} paddingTop={'20px'} fontWeight={'bolder'}>Adquiere una criptomoneda</Text>
      <section style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', gap: '20px' }}>
        <img src={`data:image/png;base64,${selected.cryptoImg}`} />
        <Select size='lg' fontSize={'1.4rem'} onChange={handleSelected} placeholder='Selecciona una cryptomoneda'>
          {coins.map(crypto => {
            return (
              <option key={crypto.id} value={crypto.cryptoName}> {crypto.cryptoName}</option>
            )
          })}
        </Select>
        <Input onChange={handleInputChange} placeholder='Ingrese la cantidad a comprar...' size={'lg'} fontSize={'1.4rem'} type='number' max={Number(oldUserInfo.money_balance)} />
        <Text width={'100%'} fontSize={'1.6rem'} paddingTop={'20px'}>Precio de {selected.cryptoName}</Text>
        <Text fontSize={'2.8rem'} fontWeight={'500'}>{formattedAmount}</Text>
        <MdArrowBack fontSize={'5rem'} />
        <MdArrowForward fontSize={'5rem'} />
        <Text width={'100%'} fontSize={'1.6rem'} paddingTop={'20px'}>Conversión</Text>
        <Text fontSize={'2.8rem'} fontWeight={'500'} color={exceed ? 'red' : ''}>{formattedConversionAmount}</Text>
        <Text width={'100%'} fontSize={'1.4rem'}>Limite: {formattedTotal}</Text>
        <Button onClick={handleBuy} fontSize={'1.8rem'} isDisabled={exceed} size={'lg'} colorScheme='blue' width={'100%'}>Comprar</Button>
      </section>
      {navigate && <Navigate to={'/crypthon/home'} />}
    </main>
  )
}