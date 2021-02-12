const Router = require('express')
const router = Router()
const User = require('../models/user')
const Log = require('../models/log')
const Event = require('../models/event')

const { v4: uuid } = require('uuid');

router.get('/', async (req, res) => {
    try {
        const events = await User.findAll({
            order: [['id', 'ASC']],
            include: [{
                association: User.Log,
                include: [Log.Event]
            }]
        })
        res.status(200).json(events)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

router.post('/add', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findByPk(req.body.user_id)
        user ?
            await Log.create({
                    userId: req.body.user_id,
                    event_id: uuid(),
                    event_time: req.body.event_time,
                    event: {
                        name: req.body.event_name
                    }

                }, {
                    include: [Log.Event]
                }
            ) :
            await User.create({
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    id: req.body.user_id,
                    logs: [{
                        event_id: uuid(),
                        event_time: req.body.event_time,
                        event: {
                            name: req.body.event_name
                        }
                    }]
                }, {
                    include: [{
                        association: User.Log,
                        include: [Log.Event]
                    }]
                }
            )
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

router.post('/update', async (req, res) => {
    try {
        await User.update({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            logs: [{
                event_time: req.body.event_time,
                event: {
                    name: req.body.event_name
                }
            }]
        }, {
            where: {
                id: req.body.id
            },
            include: [{
                association: User.Log,
                include: [Log.Event]
            }]
        })
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

router.post('/delete', async (req, res) => {
    try {
        await Log.destroy({
            where: {
                id: req.body.selectEvent
            },
            include: [Log.Event]
        })
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
})

module.exports = router