import express from 'express';
import { addParty, getParties, getParty, updateParty, deleteParty } from '../controllers/parties.js';

const partyRoutes = express.Router();

partyRoutes.post('/create', addParty);
partyRoutes.get('/', getParties);
partyRoutes.get('/:id', getParty);
partyRoutes.put('/:id', updateParty);
partyRoutes.delete('/:id', deleteParty);

export default partyRoutes;