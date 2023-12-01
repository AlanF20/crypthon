import { Text } from '@chakra-ui/react'

export function NewButton({ children, text, onClick }) {
  return (
    <section className="newButtonContainer" onClick={onClick}>
      <button className="newButton">
        {children}
      </button>
      <Text className="newButtonText" fontSize='small'>{text}</Text>
    </section>

  )
}