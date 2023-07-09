import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"
import {
  Todo,
  deleteTodo,
  getTodo,
  todoActions,
} from "../store/todo/todo.slice"
import { Button } from "@mui/material"
import styled from "@emotion/styled"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const todos = useSelector((state: RootState) => state.todo)

  useEffect(() => {
    dispatch(getTodo())
  }, [dispatch])

  const deleteHandler = (id: string) => {
    dispatch(deleteTodo(id))
  }
  // const handleComplete = (todo: Todo) => {
  //   dispatch(
  //     completeTodo({
  //       ...todo,
  //       completed: !todo.completed,
  //       id: todo.id,
  //       completed: !todo.completed,
  //       text: todo.text,
  //     })
  //   )
  // }
  return (
    <ListContainer>
      <ul>
        {todos.map((item: Todo) => {
          return (
            <Box key={item.id}>
              <Title className={`${item.completed && "todo"}`}>
                {item.text}
              </Title>
              <div>
                <Button
                  onClick={() =>
                    dispatch(
                      todoActions.completedTodo({
                        completed: !item.completed,
                        id: item.id,
                      })
                    )
                  }
                >
                  <DoneAllOutlinedIcon />
                </Button>
                <Button onClick={() => deleteHandler(item.id)}>
                  <DeleteIcon />
                </Button>
              </div>
            </Box>
          )
        })}
      </ul>
    </ListContainer>
  )
}

export default TodoList

const Title = styled("li")`
  font-size: 24px;
  color: #1111d1;
  list-style: none;
  &.todo {
    text-decoration: line-through;
    opacity: 0.5;
  }
`
const ListContainer = styled("ul")`
  list-style: none;
  background-color: #fff;
  padding: 3rem;
  margin: 0 auto;
  border-radius: 3px;
  width: 700px;
`
const Box = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
