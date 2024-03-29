import express from 'express';
const router = express.Router();
import requests from './requests.js';
import specialRequests from './specialRequests.js';
import authRequests from './authRequests.js';

router.use('/pasutijumi', requests);
router.use('/pasutijumi_preces', requests);
router.use('/lietotaji', requests);
router.use('/administratori', requests);
router.use('/adreses', requests);
router.use('/neregistreti_klienti', requests);
router.use('/atsauksmes', requests);
router.use('/preces', requests);
router.use('/precu_specifikacija', requests);
router.use('/precu_specifikacija_ipasibas', requests);
router.use('/ipasibas', requests);

router.use('/special', specialRequests);
router.use('/auth', authRequests);

export default router;
