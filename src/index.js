"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const DEFAULT_ADMIN = {
      username: "admin",
      email: "admin@example.com",
      password: "Password123!",
      firstName: "admin",
      lastName: "admin",
      isActive: true,
    };

    // await strapi.admin.services.role.createRolesIfNoneExist();
    // const usersPermissions = await strapi.plugins["users-permissions"];
    // const adminRole = await strapi.admin.services.role.findOne({
    //   code: "strapi-super-admin",
    // });
    // let adminUser = await strapi.admin.services.user.findOne({
    //   email: DEFAULT_ADMIN.email,
    // });

    // if (!adminUser) {
    //   adminUser = await strapi.admin.services.user.create({
    //     ...DEFAULT_ADMIN,
    //     roles: [adminRole.id],
    //   });
    //   console.info("Created admin user!");
    // } else {
    //   console.info("Skipped creation of admin user, already existing.");
    // }

    // const publicRole = await usersPermissions.services.userspermissions.getRole(
    //   2,
    //   []
    // );
    // const userPermissions = await strapi
    //   .query("permission", "users-permissions")
    //   .find(
    //     {
    //       controller: "race",
    //       action_in: ["createbulk", "ids", "findone", "find"],
    //       role: 2,
    //     },
    //     { active: true }
    //   );

    // for (const userPermission of userPermissions) {
    //   await strapi
    //     .query("permission", "users-permissions")
    //     .update({ id: userPermission.id }, { enabled: true });
    // }
  },
};
