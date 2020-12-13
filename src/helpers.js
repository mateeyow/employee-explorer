import { fetch } from "./fetch"

export const getEmployeeData = (record) => {
  const [title, metadata] = record
  const subordinates = metadata?.['direct-subordinates'] || []
  return { title, subordinates }
}

export const searchEmployees = async (employees, subordinates) => {
  if (!subordinates.length) {
    return employees
  }

  const promises = subordinates.map(item => fetch.get(item))
  const employeeRes = await Promise.all(promises)
  const newEmployees = { ...employees }
  const newSubordinates = []

  employeeRes.forEach((record, idx) => {
    const { title, subordinates: subordinateData } = getEmployeeData(record)
    const name = subordinates[idx]

    if (!newEmployees[name]) {
      newEmployees[name] = { title, subordinates: subordinateData }

      const filteredSubordinates = subordinateData
        .filter(record => !newEmployees[record] && !newSubordinates.includes(record))

      newSubordinates.push(...filteredSubordinates)
    }
  })

  return searchEmployees(newEmployees, newSubordinates)
}
