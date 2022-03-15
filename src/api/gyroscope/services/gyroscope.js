'use strict';

/**
 * gyroscope service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gyroscope.gyroscope');
