'use strict';

/**
 * health-kit service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::health-kit.health-kit');
