const fetchMock = jest.genMockFromModule('axios')

fetchMock.create = jest.fn(() => fetchMock)

export default fetchMock
