import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetch } from '../fetch';
import { getEmployeeData, searchEmployees } from '../helpers';
import EmployeeProfile from './EmployeeProfile';

const Container = motion.custom(Box)
// For caching - need to refactor for stale data
let employeeCopy = {}

const Explorer = () => {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  }
  
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  }

  const { name } = useParams()
  const [employees, setEmployees] = useState({})
  const [isFetching, setIsFetching] = useState(false)

  const renderSubordinates = (juniors, level = 1) => {
    const newLevel = level + 1
    if (!juniors.length) {
      return null
    }

    return juniors.map((junior, idx) => (
      <Container key={`${junior}-idx`} ml={level * 4} variants={item}>
        <EmployeeProfile employee={{ name: junior, ...employees[junior] }} />
        {renderSubordinates(employees[junior].subordinates, newLevel)}
      </Container>
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

  if (isFetching) {
    return null
  }

  return (
    <Container px='6' mx='auto' width='min(70ch, 100%)' initial="hidden" animate="visible" variants={list}>
      {employees[name] &&
        <>
          <EmployeeProfile employee={{ name, ...employees[name] }} />
          {renderSubordinates(employees[name].subordinates)}
        </>
      }
    </Container>
  )
}

export default Explorer
