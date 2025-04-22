import { Skeleton, VStack } from '@chakra-ui/react'

export function FormSkeleton() {
  return (
    <VStack gap={4} align="stretch" w="100%">
      <Skeleton height="28px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
      <Skeleton height="40px" />
    </VStack>
  )
}
