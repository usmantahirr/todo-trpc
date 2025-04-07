import Container from "./container"
import { TodoProvider } from "./context"

export default function Todo() {
  return (
    <TodoProvider>
      <Container />
    </TodoProvider>
  )
}
