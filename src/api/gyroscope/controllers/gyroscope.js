'use strict';

/**
 *  gyroscope controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gyroscope.gyroscope');
