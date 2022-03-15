'use strict';

/**
 * accelerometer service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::accelerometer.accelerometer');
