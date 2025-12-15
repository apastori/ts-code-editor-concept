import { keyframes, styled } from 'styled-components'

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
  }
`

export const Container = styled.div`
  margin-bottom: 1.5rem;
`

export const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(168, 85, 247, 0.1));
  border: 2px solid rgba(0, 255, 255, 0.5);
  border-radius: 8px;
  color: #e0e7ff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    border-color: rgba(0, 255, 255, 0.8);
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(168, 85, 247, 0.2));
    animation: ${pulse} 1.5s ease-in-out infinite;

    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.3);
  }
`

export const Dropdown = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(15, 23, 42, 0.95);
  border: 2px solid rgba(0, 255, 255, 0.5);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 50;
  padding: 0.5rem 0;
  list-style: none;
  backdrop-filter: blur(10px);
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 255, 0.7);
  }
`

export const MenuItem = styled.li<{ $isActive: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ $isActive }) => ($isActive ? '#00ffff' : '#e0e7ff')};
  background: ${({ $isActive }) => ($isActive ? 'rgba(0, 255, 255, 0.1)' : 'transparent')};
  border-left: 3px solid ${({ $isActive }) => ($isActive ? '#00ffff' : 'transparent')};

  &:hover {
    background: rgba(0, 255, 255, 0.15);
    border-left-color: #00ffff;
    color: #00ffff;
  }
`

export const Version = styled.span`
  color: #94a3b8;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`
