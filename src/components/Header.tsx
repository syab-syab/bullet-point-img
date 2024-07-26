import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.header`
  background: #B2B377;
  padding: 1.5rem 0px;
`

const Title = styled.a`
  color: black;
  text-decoration: none;
  font-size: 3.6rem;
`

const Header = () => {
  return (
    <Wrapper>
      <Title href='https://homemade-apps.vercel.app/' target='blank'>箇条書き画像化</Title>
    </Wrapper>
  )
}

export default Header