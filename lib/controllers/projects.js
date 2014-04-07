var mongoose = require('mongoose'),
	Project = mongoose.model('Project');

exports.project = function(req,res,next,id)
{
	Project.load
	(
		id,
		function(err,project)
		{
			if( err ) return next(err);
			if( !project ) return next(new Error("Failed to load project" + id));
			req.project = project;
			next();
		}
	);
};

exports.create = function(req,res)
{
	var project = new Project(req.body);
	project.creator = req.user;
	
	project.save
	(
		function(err)
		{
			if( err )
				res.json(500,err);
			else
				res.json(project);
		}
	);
};

exports.update = function(req,res)
{
	var project = req.project;
	project.name = req.body.name;
	project.content = req.body.content;
	project.updated = Date.now();
	project.save
	(
		function(err)
		{
			if( err )
				res.json(500,err);
			else
				res.json(project);
		}
	);
};

exports.destroy = function(req,res)
{
};

exports.all = function(req,res)
{
	var query = {};
	
	if( req.userid )
	{
		query['user'] = req.userid;
	}
	
	Project.find( query ).exec
	(
		function(err,projects)
		{
			if( err )
				res.json(500,err);
			else
				res.json(projects);
		}
	);
};

exports.show = function(req,res)
{
	var query = {};
	
	if( req.params.projectId )
	{
		query['_id'] = req.params.projectId;
	}
	
	Project.findOne(query).exec
	(
		function(err,project)
		{
			if( err )
				res.json(500,err);
			else
				res.json(project);
		}
	);
};