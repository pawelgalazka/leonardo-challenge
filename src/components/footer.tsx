/**
 * Footer component for the application
 * Displays version information at the bottom of the page
 */
import { Text } from "@chakra-ui/react"

/**
 * Simple footer component that displays the application version
 *
 * @returns Footer with centered version text
 */
export function Footer() {
  return (
    <footer>
      <Text fontSize="sm" textAlign="center" mt={5}>
        Challenge v3.5
      </Text>
    </footer>
  )
}
