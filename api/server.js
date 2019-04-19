const express = require('express')
const server = express()
const db = require('../games/helpers.js')

server.use(express.json())