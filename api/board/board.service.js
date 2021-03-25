const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query() {
    try {
        const collection = await dbService.getCollection('board');
        const boards = await collection.find().toArray();
        return boards;
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board');
        const board = await collection.findOne({ '_id': ObjectId(boardId) });
        return board;
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = {
            _id: ObjectId(board._id),
            title: board.title,
            createdAt: board.createdAt,
            createdBy: board.createdBy,
            statuses: board.statuses,
            priorities: board.priorities,
            members: board.members,
            groups: board.groups,
            activities: board.activities
        }
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ '_id': boardToSave._id }, { $set: boardToSave }) 
        return boardToSave;
    } catch (err) {
        logger.error(`cannot update user ${board._id}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const boardToAdd = {
            _id: ObjectId(board._id),
            title: board.title,
            createdAt: board.createdAt,
            createdBy: board.createdBy,
            statuses: board.statuses,
            priorities: board.priorities,
            members: board.members,
            groups: board.groups,
            activities: board.activities
        }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(boardToAdd)
        return boardToAdd
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    // if (filterBy.txt) {
    //     const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    //     criteria.$or = [
    //         {
    //             username: txtCriteria
    //         },
    //         {
    //             fullname: txtCriteria
    //         }
    //     ]
    // }
    // if (filterBy.name) {
    //     const txtCriteria = { $regex: filterBy.name, $options: 'i' };
    //     criteria.name = txtCriteria;
    // }
    // if (filterBy.stock !== 'All') criteria.inStock = JSON.parse(filterBy.stock);
    // if (filterBy.type !== 'All') criteria.type = filterBy.type;
    return criteria
}