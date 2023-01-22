import React from 'react'
import { render, screen, cleanup, waitForElement } from '@testing-library/react'
import 'jest-dom/extend-expected'
import axiosMock from 'axios'
import ProductList from '../ProductList'
import { faItalic } from '@fortawesome/free-solid-svg-icons'

afterEach(cleanup)

it('fetches and displays data', async () => {
  axiosMock.get.mockResolvedValueOnce({data: {name: "Skateboard"}})

  const url = "/products"
  const { getByTestId } = render(<ProductList url={url} />)

  expect(getByTestId('loading')).toHaveTextContent('Loading data...')

  const resolvedSpan = waitForElement(() => getByTextId('resolved'))

  expect(resolvedSpan).toHaveTextContent('hello there')
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith()
})




/* global.fetch = jest.fn() => Promise.resolve({
  json: () => Promise.resolve({
    icon_url:
  })
})

describe("ProductList", () => {
  it("loads the joke on mount"), () => {

  }
}) */