import express from 'express';
import { requireAuth, validateRequest, BadRequestError } from '@meetbe/common';

const validator = require('../controllers/profileValidator');
// const {
//   getAllProfiles,
//   createProfile,
//   getProfileByUserId,
//   patchProfile,
//   getProfileByEmail,
//   deleteProfileProperty,
// } = require('../controllers/profileController');
const profileController = require('../controllers/profileController');
const router = express.Router();
// getAllProfiles, createProfile, getProfileByUserId, patchProfile, getProfileByEmail
router
  .route('/')
  .get(requireAuth, profileController.getAllProfiles)
  .post(
    validator.validateProfile,
    validateRequest,
    profileController.createProfile
  );

router
  .route('/id/:_id')
  .get(requireAuth, profileController.getProfileByUserId)
  .patch(
    requireAuth,
    validator.validateProfile,
    validateRequest,
    profileController.patchProfile
  )
  .put(requireAuth, profileController.deleteProfileProperty);

router
  .route('/email/:email')
  .get(requireAuth, profileController.getProfileByEmail);

module.exports = router;
