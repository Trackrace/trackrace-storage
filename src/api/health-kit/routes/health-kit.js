'use strict';

/**
 * health-kit router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::health-kit.health-kit');
