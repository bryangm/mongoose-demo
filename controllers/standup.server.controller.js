var Standup = require('../models/standup.server.model');

exports.list = function(req, res) {
  var query = Standup.find();
  query.sort({createdOn: 'desc'})
    .limit(12)
    .exec(function(err, results) {
      res.render('index', {title: 'Standup - List', notes: results});
    });
};

exports.filterByMember = function(req, res) {
  var query = Standup.find();
  var filter = req.body.memberName;

  query.sort({ createdOn: 'desc' });

  if (filter.length > 0) {
    query.where({ memberName: filter });
  }

  query.exec(function(err, results) {
    res.render('index', { title: 'Standup - List', notes: results });
  });
};

exports.create = function(req, res) {
  var entry = new Standup({
    memberName: req.body.memberName,
    project: req.body.project,
    workYesterday: req.body.workYesterday,
    workToday: req.body.workToday,
    impediment: req.body.impediment
  });

  entry.schema.path('memberName').validate(function (value) {
    return value != 'None';
  }, 'You must select a team member name.');

  entry.save(function(err) {
    if (err) {
      var errMsg = 'Error saving standup note. ' + err;
      res.render('newnote', {title: 'Standiup - New Note (error), message errMsg', message: errMsg })
    }
  });

  res.redirect(301, '/');
};

exports.getNote = function (req, res) {
  res.render('newnote', {title: 'Standup - New Note'});
};
