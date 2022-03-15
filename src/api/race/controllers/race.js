"use strict";

/**
 *  race controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

function chunkArray(values = [], chunk = 10000) {
  const chunked = [];
  for (let i = 0, j = values.length; i < j; i += chunk) {
    chunked.push(values.slice(i, i + chunk));
  }
  return chunked;
}

module.exports = createCoreController("api::race.race", ({ strapi }) => ({
  async detail(ctx) {
    const { id } = ctx.params;
    const race = await strapi.entityService.findOne("api::race.race", id, {
      fields: ["number", "started", "ended"],
      populate: {
        gpses: true,
        accelerometers: true,
        gyroscopes: true,
        health_kits: true,
        obd_2s: true,
      },
    });
    return race;
  },

  async bulk(ctx) {
    const knex = strapi.db.connection;
    const trxProvider = knex.transactionProvider();
    const trx = await trxProvider();
    let gyroscope_ids = [];
    let accelerometer_ids = [];
    let health_kit_ids = [];
    let obd2_ids = [];
    let gps_ids = [];
    let race_id = null;

    try {
      race_id = parseInt(
        await trx("races").insert(
          {
            number: ctx.request.body.id,
            started: ctx.request.body.started,
            ended: ctx.request.body.ended,
          },
          "id"
        )
      );

      for (const chunk of chunkArray(ctx.request.body.gyroscope_data)) {
        console.log(
          `Processing gyroscope chunks: ${chunk.length}/${ctx.request.body.gyroscope_data.length}`
        );
        gyroscope_ids = gyroscope_ids.concat(
          await trx("gyroscopes").insert(chunk, "id")
        );
      }

      for (const chunk of chunkArray(gyroscope_ids)) {
        await trx("gyroscopes_race_links").insert(
          chunk.map((id) => ({ gyroscope_id: id, race_id: race_id }))
        );
      }

      for (const chunk of chunkArray(ctx.request.body.accelerometer_data)) {
        console.log(
          `Processing accelerometer chunks: ${chunk.length}/${ctx.request.body.accelerometer_data.length}`
        );
        accelerometer_ids = accelerometer_ids.concat(
          await trx("accelerometers").insert(chunk, "id")
        );
      }

      for (const chunk of chunkArray(accelerometer_ids)) {
        await trx("accelerometers_race_links").insert(
          chunk.map((id) => ({ accelerometer_id: id, race_id: race_id }))
        );
      }

      for (const chunk of chunkArray(ctx.request.body.health_kit_data)) {
        console.log(
          `Processing healthkit chunks: ${chunk.length}/${ctx.request.body.health_kit_data.length}`
        );
        health_kit_ids = health_kit_ids.concat(
          await trx("health_kits").insert(chunk, "id")
        );
      }

      for (const chunk of chunkArray(health_kit_ids)) {
        await trx("health_kits_race_links").insert(
          chunk.map((id) => ({ health_kit_id: id, race_id: race_id }))
        );
      }

      for (const chunk of chunkArray(ctx.request.body.obd2_data)) {
        console.log(
          `Processing obd2 chunks: ${chunk.length}/${ctx.request.body.obd2_data.length}`
        );
        obd2_ids = obd2_ids.concat(await trx("obd_2s").insert(chunk, "id"));
      }

      for (const chunk of chunkArray(obd2_ids)) {
        await trx("obd_2_s_race_links").insert(
          chunk.map((id) => ({ obd_2_id: id, race_id: race_id }))
        );
      }

      for (const chunk of chunkArray(ctx.request.body.gps_data)) {
        console.log(
          `Processing gps chunks: ${chunk.length}/${ctx.request.body.gps_data.length}`
        );
        gps_ids = gps_ids.concat(await trx("gpses").insert(chunk, "id"));
      }

      for (const chunk of chunkArray(gps_ids)) {
        await trx("gpses_race_links").insert(
          chunk.map((id) => ({ gps_id: id, race_id: race_id }))
        );
      }

      console.log("Commit transaction...");
      await trx.commit();
      console.log("...");
    } catch (error) {
      console.log("Got error rollback...");
      await trx.rollback();
      throw error;
    }

    console.log(`Inserted gyroscope values: ${gyroscope_ids.length}`);
    console.log(`Inserted accelerometer values: ${accelerometer_ids.length}`);
    console.log(`Inserted health kit values: ${health_kit_ids.length}`);
    console.log(`Inserted obd2 values: ${obd2_ids.length}`);
    console.log(`Inserted gps values: ${gps_ids.length}`);
    console.log(`Created race: ${race_id}`);
    return race_id;
  },
}));
