const request = require('supertest')
const server = require('./server.js')
const db = require('../data/dbConfig.js')



describe('endpoints', () => {
    describe('GET', () => {
        it('Should give 200 status', async () => {
            return request(server)
                   .get('/games')
                   .then(res => {
                        console.log(res.status)
                        expect(res.status).toBe(200)
            })
        })

        it('should return JSON', async () => {
            const res = await request(server).get('/games')

            expect(res.type).toBe('application/json')
        })

        it('should return { message: "Welcome to the Project" }', async () => {
            const res = await request(server).get('/')

            expect(res.body).toEqual({message: 'Welcome to the Project'})
        })
    })



    describe('POST', () => {
        afterEach(async () => {
            await db('games').truncate()
        })

        it('Should return 201', async () => {
            const game = await request(server).post('/games').send({
                title: 'Assassin\s Creed',
                genre: 'Action-Adventure',
                releaseYear: 2018
            })
            expect(game.status).toBe(201)
        })

        it('Should return 201 without the releaseYear', async () => {
            const game = await request(server).post('/games').send({
                title: 'Assassin\s Creed',
                genre: 'Action-Adventure', 
            })
            expect(game.status).toBe(201)
        })

        it('Should return 422 without the title', async () => {
            const game = await request(server).post('/games').send({
                title: '',
                genre: 'Action-Adventure',
                releaseYear: 2018
            })
            expect(game.status).toBe(422)
        })

        it('Should return 422 without the genre', async () => {
            const game = await request(server).post('/games').send({
                title: 'Assassin\s Creed',
                genre: '',
                releaseYear: 2018
            })
            expect(game.status).toBe(422)
        })
    })
})