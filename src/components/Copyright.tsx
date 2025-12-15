import type { JSX } from 'react'
import { CopyrightSection, CopyrightText } from './styles/Copyright.style'
import type { FourDigitString } from '../types/FourDigitString'

const Copyright = (): JSX.Element => {
  const currentYearNumber: number = new Date().getFullYear()
  const currentYear: FourDigitString = currentYearNumber.toString() as FourDigitString

  return (
    <CopyrightSection>
      <CopyrightText>© {currentYear} Code Executor. All Rights Reserved.</CopyrightText>
    </CopyrightSection>
  )
}

export { Copyright }