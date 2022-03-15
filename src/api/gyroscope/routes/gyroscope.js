'use strict';

/**
 * gyroscope router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::gyroscope.gyroscope');
