const db = require('../data/dbConfig.js')
const helpers = require('./helpers.js')

describe('data model', () => {
    describe('insert', () => {
        afterEach(async () => {
            await db('games').truncate()
        })

        it('Should insert provided games', async () => {
            await helpers.insert({
                title: 'Assassin\s Creed Odyssey',
                genre: 'Action-Adventure',
                releaseYear: 2018
            })

            const games = await db('games')
            expect(games).toHaveLength(1)
        })

        it('should insert the provided games, and check the length (should be more than 1)', async () => {
            await helpers.insert({
                title: 'Assassin\s Creed Odyssey',
                genre: 'Action-Adventure',
                releaseYear: 2018
            })
            await helpers.insert({
                title: 'Crysis 3',
                genre: 'Action',
                releaseYear: 2013
            })
            const games = await db('games')
            expect(games).toHaveLength(2)
        });

        it('should insert the provided game, then check title', async () => {
            const games = await helpers.insert({
                title: 'Assassin\s Creed Odyssey',
                genre: 'Action-Adventure',
                releaseYear: 2018
            })
            // expect(games.title).toBe('Assassin\s Creed Odyssey')
        });
    })


    
})

describe('get', () => {
    afterEach(async () => {
        await db('games').truncate()
    })

    it('should have a length of 0', async () => {
        let games = await helpers.get()

        expect(games).toHaveLength(0)
    })

    it('should have a length of 1', async () => {
        await helpers.insert({
            title: 'Assassin\s Creed Odyssey',
            genre: 'Action-Adventure',
            releaseYear: 2018
        })
        
        
        let games = await helpers.get()

        expect(games).toHaveLength(1)
    })

    it('should have a length of 2', async () => {
        await helpers.insert({
            title: 'Assassin\s Creed Odyssey',
            genre: 'Action-Adventure',
            releaseYear: 2018
        })
        await helpers.insert({
            title: 'Crysis 3',
            genre: 'Action',
            releaseYear: 2013
        })
        let games = await helpers.get()

        expect(games).toHaveLength(2)
    })
})