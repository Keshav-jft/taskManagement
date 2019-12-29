/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap =async function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  try
  {
    await Role.findOrCreate({authority:'ROLE_USER'});
    await Role.findOrCreate({authority:'ROLE_COORDINATOR'});
    await Role.findOrCreate({authority:'ROLE_ADMIN'});
    await Role.findOrCreate({authority:'ROLE_SUPER_ADMIN'});
    let role=await Role.findOne({authority:'ROLE_SUPER_ADMIN'});
    await User.findOrCreate({email: 'admin@mail.com'}, {
      email: 'admin@mail.com',
      firstName: 'Super',
      lastName: 'Admin',
      password: '12345',
      role: role.id,
      mobileNumber:'9123456789',
      whatsAppNumber:'9123456789',
      designation:'CEO',
      department:'IT',
      postingPlace:"Delhi",
    });
    process.env.TZ = 'UTC'
    sails.hooks.http.app.disable('etag')
  }catch(err)
  {
    console.log('bootstrap error-',err)
  }
  cb();
};
