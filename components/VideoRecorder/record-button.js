import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 50%;
  width: 64px;
  height: 64px;
  background: rgba(227, 73, 28, 0.8);
  outline: none;
  border: none;
  cursor: pointer;
  :hover {
    background: #fb6d42;
  }
`

const RecWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonBorder = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.4);
  height: 80px;
  width: 80px;
  border-radius: 50%;
`

const InstructionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5px 8px;
  margin-bottom: 10px;
`

const Instructions = styled.div`
  font-family: Roboto;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  letter-spacing: 1.75px;
  display: flex;
`

const InstuctionsHighlight = styled.div`
  font-weight: 700;
  color: #dc6547;
  padding: 0 5px;
`

Button.defaultProps = {
    color: 'black',
    backgroundColor: 'white'
}

export default (props) => (
    <RecWrapper>
        <InstructionsWrapper>
            <Instructions>
                <b>INTRODUCE YOURSELF</b>
            </Instructions>

            <Instructions>
                <div>PRESS </div>
                <InstuctionsHighlight> REC </InstuctionsHighlight>
                WHEN READY
            </Instructions>
    </InstructionsWrapper>

        <ButtonBorder>
            <Button {...props} />
        </ButtonBorder>
    </RecWrapper>
)