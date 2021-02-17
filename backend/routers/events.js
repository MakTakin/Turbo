const { Sequelize } = require('sequelize')
const Op = Sequelize.Op
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
                where: {
                    userId: {
                        [Op.ne]: null
                    }
                },
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
    const time = req.body.event_time ? req.body.event_time : null
    try {
        const user = await User.findByPk(req.body.id)
        user ?
            await Log.create({
                    userId: req.body.id,
                    event_id: uuid(),
                    event_time: time,
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
                    id: req.body.id,
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
        await Log.update({
                event_time: req.body.event_time,
            }, {
                where: {
                    event_id: req.body.logs[0].event_id
                }
            }
        )
        await Event.update({
                name: req.body.event_name
            }, {
                where: {
                    event_id: req.body.logs[0].event_id
                },
            }
        )

        res.sendStatus(200)
    } catch
        (e) {
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