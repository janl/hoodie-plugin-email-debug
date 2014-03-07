// debug email
// a) listen for new emails and log them
// b) set up web hook for mandril to call us back for emails

module.exports =  function (hoodie, callback) {
  mod_hoodie = hoodie;
  console.log(' - stating hoodie-plugin-email-debug');

  var plugin_db_name = 'plugin/email-debug';

  // create plugin database
  hoodie.database.add(plugin_db_name, function(error) {
    if (error && error.error != 'file_exists') {
      console.log(error);
      return callback(error);
    }
  });

  hoodie.task.on('email:add', function(dbName, email) {

    var plugin_db = hoodie.database(plugin_db_name);
    delete email._rev;

    plugin_db.add('debug-email', email, function(error) {
      if (error) {
        console.log('adding debug email failed:');
        console.log(error);
      }
    });
  });

  console.log(' - done stating hoodie-plugin-email-debug');
  callback();
};
