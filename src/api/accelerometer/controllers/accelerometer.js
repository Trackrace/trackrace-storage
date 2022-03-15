'use strict';

/**
 *  accelerometer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::accelerometer.accelerometer');
