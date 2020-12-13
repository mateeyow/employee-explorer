import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'
import { fetch } from '../fetch';
import { getEmployeeData, searchEmployees } from '../helpers';
import EmployeeProfile from './EmployeeProfile';

// For caching - need to refactor for stale data
let employeeCopy = {}

const Explorer = () => {
  const { name } = useParams()
  const [employees, setEmployees] = useState({})
  const [isFetching, setIsFetching] = useState(false)

  const renderSubordinates = (juniors, level = 1) => {
    const newLevel = level + 1
    if (!juniors.length) {
      return null
    }

    return juniors.map((junior, idx) => (
      <Box key={`${junior}-idx`} ml={level * 4}>
        <EmployeeProfile employee={{ name: junior, ...employees[junior] }} />
        {renderSubordinates(employees[junior].subordinates, newLevel)}
      </Box>
    ))
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsFetching(true)

      try {
        const response = await fetch.get(name)
        const { title, subordinates } = getEmployeeData(response)
        
        employeeCopy[name] = { title, subordinates }
        const employeesData = await searchEmployees(employeeCopy, subordinates)
        
        setEmployees(employeesData)
        employeeCopy = employeesData
      } catch (err) {
        console.log("err", err)
      } finally {
        setIsFetching(false)
      }
    }

    if (name && !employeeCopy[name]) {
      fetchEmployee()
    }
  }, [name])

  if (!name || isFetching) {
    return null
  }

  return (
    <Box px='6' mx='auto' width='min(70ch, 100%)'>
      {employees[name] &&
        <>
          <EmployeeProfile employee={{ name, ...employees[name] }} />
          {renderSubordinates(employees[name].subordinates)}
        </>
      }
    </Box>
  )
}

export default Explorer
