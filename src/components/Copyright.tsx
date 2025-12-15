import type { JSX } from 'react'
import type { FourDigitString } from '../types/FourDigitString'
import { CopyrightSection, CopyrightText } from './styles/Copyright.style'

const Copyright = (): JSX.Element => {
  const currentYearNumber: number = new Date().getFullYear()
  const currentYear: FourDigitString =
    currentYearNumber.toString() as FourDigitString

  return (
    <CopyrightSection>
      <CopyrightText>
        © {currentYear} Code Executor. All Rights Reserved.
      </CopyrightText>
    </CopyrightSection>
  )
}

export { Copyright }
