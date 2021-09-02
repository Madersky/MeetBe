const { body, oneOf, validationResult } = require('express-validator');

import { Request, Response } from 'express';
exports.validateProfile = [
  // body('firstname').trim().notEmpty().withMessage('Write your name please'),
  // body('lastname').trim().notEmpty().withMessage('Write your lastname please'),
  // body('message').trim(),
  body('age')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage('The age have to be a number'),
  oneOf(
    [
      body('socialStatus').optional({ checkFalsy: true }).equals('Single'),
      body('socialStatus')
        .optional({ checkFalsy: true })
        .equals('in Relationship'),
      body('socialStatus').optional({ checkFalsy: true }).equals('Engaged'),
      body('socialStatus').optional({ checkFalsy: true }).equals('Widow'),
      body('socialStatus').optional({ checkFalsy: true }).equals('Widower'),
      body('socialStatus').optional({ checkFalsy: true }).equals('Married'),
    ],
    'Social status have to be social status'
  ),
  body('phoneNumber').optional({ checkFalsy: true }).isInt(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }
  },
];
