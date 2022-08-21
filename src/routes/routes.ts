import { Request, Response, Application } from 'express'
import express from 'express'
const Todo = require('../model/Todo')
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello')
})

router.post('/addTodo', async (req: Request, res: Response) => {
  const newTodo = new Todo({
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
    onEdit: req.body.onEdit,
    deadline: req.body.deadline,
    date: req.body.date,
  })
  try {
    const saveTodo = await newTodo.save()
    res.status(200).json(saveTodo)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

//delete specific todo
router.delete('/:todoId', async (req, res) => {
  try {
    const removeTodo = await Todo.deleteOne({ _id: req.params.todoId })
    res.status(200).json(removeTodo)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

//delete all completed todos
router.patch('/removeTodos', async (req, res) => {
  try {
    const removeTodo = await Todo.deleteMany({ completed: true })
    res.status(200).json(removeTodo)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

//complete todo
router.put('/:todoId', async (req, res) => {
  try {
    const updateStatus = await Todo.updateOne(
      { _id: req.params.todoId },
      { $set: { completed: !req.body.completed } }
    )
    res.status(200).json(updateStatus)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

//edit todo
router.put('/editTodo/:todoId', async (req, res) => {
  try {
    const updateStatus = await Todo.updateOne(
      { _id: req.params.todoId },
      { $set: { title: req.body.title, deadline: req.body.deadline } }
    )
    res.status(200).json(updateStatus)
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

export default router
