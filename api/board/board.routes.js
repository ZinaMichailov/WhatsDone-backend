const express = require('express')
const {getBoard, getBoards, deleteBoard, updateBoard, addBoard} = require('./board.controller')
const {requireAdmin} = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

router.get('/', getBoards)
router.get('/:id', getBoard)
router.put('/:id', updateBoard)
router.post('/', addBoard)
router.delete('/:id', deleteBoard)

module.exports = router