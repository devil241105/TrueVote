import express from 'express'
import { addElection, getElection, getElections, updateElection, deleteElection, addPartiesToElection } from '../controllers/election.js'

const electionRoutes = express.Router()

electionRoutes.post('/create', addElection)
electionRoutes.get('/', getElections)
electionRoutes.get('/:id', getElection)
electionRoutes.put('/update/:id', updateElection)
electionRoutes.delete('/delete/:id', deleteElection)
electionRoutes.post('/addParties/:id', addPartiesToElection)

export default electionRoutes