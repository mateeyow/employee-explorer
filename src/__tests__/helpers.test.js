import { fetch } from '../fetch'
import { getEmployeeData, searchEmployees } from '../helpers'

test("get's employee data given the data with subordinates", () => {
  const record = ["CEO", { 'direct-subordinates': ['John Doe', 'Jane Doe'] }]
  expect(getEmployeeData(record)).toEqual({ title: 'CEO', subordinates: ['John Doe', 'Jane Doe'] })
})

test('should return an empty array if there are no subordinates', () => {
  const record = ["employee"]
  expect(getEmployeeData(record)).toEqual({ title: 'employee', subordinates: [] })
})

test('should return employees object with names as keys', async () => {
  fetch.get
    .mockResolvedValueOnce(['employee'])
    .mockResolvedValueOnce(['product head', { 'direct-subordinates': ['Tommy Tom'] }])
    .mockResolvedValueOnce(['employee'])

  const employees = await searchEmployees({}, ['John Doe', 'Jane Doe'])

  expect(employees).toEqual({
    'John Doe': { title: 'employee', subordinates: [] },
    'Jane Doe': { title: 'product head', subordinates: ['Tommy Tom'] },
    'Tommy Tom': { title: 'employee', subordinates: [] }
  })
})

test.only('should not call duplicate employees', async () => {
  const juniors = ['Ada Lovelace', 'Charles Babbage']
  const employeeObj = {
    'John Doe': { title: 'department head', subordinates: juniors },
    'Han Solo': { title: 'employee', subordinates: [] }
  }

  fetch.get
    .mockResolvedValueOnce(['manager', { 'direct-subordinates': ['Han Solo', 'Chewbacca'] }])
    .mockResolvedValueOnce(['manager', { 'direct-subordinates': ['Han Solo'] }])
    .mockResolvedValueOnce(['employee'])

  await searchEmployees(employeeObj, juniors)

  expect(fetch.get).toHaveBeenCalledTimes(3)
})
