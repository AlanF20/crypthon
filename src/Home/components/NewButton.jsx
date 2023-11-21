import { Text } from '@chakra-ui/react'

export function NewButton({ children, text }) {
  return (
    <section className="newButtonContainer">
      <button className="newButton">
        {children}
      </button>
      <Text className="newButtonText" fontSize='small'>{text}</Text>
    </section>

  )
}