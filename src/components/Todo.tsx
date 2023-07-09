import React, { ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { postTodo } from "../store/todo/todo.slice"
import { Button, TextField } from "@mui/material"
import styled from "@emotion/styled"
import AddIcon from "@mui/icons-material/Add"
import TodoList from "./TodoList"

export interface TodoData {
  text: string
  completed: boolean
}

const Todo = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [inputValue, setInputValue] = React.useState("")

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const data: TodoData = {
      text: inputValue,
      completed: false,
    }
    dispatch(postTodo(data))
    setInputValue("")
  }
  return (
    <Container>
      <form onSubmit={submitHandler}>
        <InputStyled
          type="text"
          value={inputValue}
          onChange={inputChangeHandler}
        />
        <ButtonStyle disabled={!inputValue} type="submit">
          <ButtonIconStyled />
        </ButtonStyle>
      </form>
      <TodoList />
    </Container>
  )
}

export default Todo

const ButtonStyle = styled(Button)`
  padding: 7px 0 0 0;
`
const ButtonIconStyled = styled(AddIcon)`
  width: 60px;
  height: 40px;
`

const Container = styled("div")`
  margin-top: 4rem;
  text-align: center;
`
const InputStyled = styled(TextField)`
  width: 620px;
  padding: 0;
  background-color: #fff;
  border-radius: 10px;
  input {
    color: #1111d1;
    font-size: 20px;
  }
`
