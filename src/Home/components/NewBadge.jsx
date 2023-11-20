import { Badge } from '@chakra-ui/react'

export function NewBadge({text}) {

  return(
    <Badge fontSize='small' borderRadius='40px' padding='5px'>
      {text}
    </Badge>
  )
}