'use strict';

/**
 * obd-2 service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::obd-2.obd-2');
