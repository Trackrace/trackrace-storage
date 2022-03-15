'use strict';

/**
 *  health-kit controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::health-kit.health-kit');
