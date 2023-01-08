import { render, screen, cleanup } from '@testing-library/react'
import Todo from '../todo'

test('should render to do component', () => {
  render(<Todo/>)
}) 