import { FC, useEffect, useCallback, useState, forwardRef } from 'react'
import Layout from '../Layout'
import classNames from './index.module.scss'
import { Status, Task } from '../../types'
import { v4 as uuid } from 'uuid'
import Form from './Form'
import Tasks from './Tasks'
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  FormGroup,
  IconButton,
  Slide,
  TextField,
  Toolbar
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Close as CloseIcon } from '@mui/icons-material'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Home: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([])

  const setTasksAndStore = useCallback((newTasks: Task[]) => {
    setTasks(newTasks)
    const json = JSON.stringify(newTasks)
    localStorage.setItem('tasks', json)
  }, [])

  useEffect(() => {
    const rawTasks = localStorage.getItem('tasks')
    if (rawTasks) {
      const newTasks = JSON.parse(rawTasks) as Task[]
      setTasksAndStore(newTasks)
    }
  }, [setTasksAndStore])

  const handleAddTask = useCallback(
    (newTaskText: string) => {
      const newTask: Task = {
        id: uuid(),
        text: newTaskText,
        status: Status.New
      }
      const newTasks = [...tasks, newTask]
      setTasksAndStore(newTasks)
    },
    [tasks, setTasksAndStore]
  )

  const handleTaskStatusChange = useCallback(
    (selectedTask: Task) => {
      const newTasks = tasks.map((task) => {
        if (task.id === selectedTask.id) {
          return {
            ...task,
            status: task.status === Status.New ? Status.Completed : Status.New
          }
        }
        return task
      })
      setTasksAndStore(newTasks)
    },
    [tasks, setTasksAndStore]
  )

  const handleTaskRemoveTask = useCallback(
    (selectedTask: Task) => {
      const newTasks = tasks.filter((task) => task.id !== selectedTask.id)
      setTasksAndStore(newTasks)
    },
    [tasks, setTasksAndStore]
  )

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false)
  }, [])

  const handleLoginIconClick = useCallback(() => {
    setIsDialogOpen(true)
  }, [])

  const handleSubscribeClick = useCallback(() => {
    setIsDialogOpen(false)
  }, [])

  return (
    <>
      <Layout title="Home" isLoginIcon onLoginIconClick={handleLoginIconClick}>
        <div className={classNames.home}>
          <div>
            <Form onAdd={handleAddTask} />
          </div>
          <div>
            <Tasks
              tasks={tasks}
              onTaskStatusChange={handleTaskStatusChange}
              onTaskRemove={handleTaskRemoveTask}
            />
          </div>
        </div>
      </Layout>
      <Dialog
        fullScreen
        open={isDialogOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <Box paddingTop="20px">
            <FormGroup>
              <TextField label="Email" />
            </FormGroup>
            <FormGroup>
              <Button onClick={handleSubscribeClick}>Subscribe</Button>
            </FormGroup>
          </Box>
        </Container>
      </Dialog>
    </>
  )
}

export default Home
