app.service
(
	'DataService',
	[
	 	'$http',
	 	function($http)
	 	{
	 		return {
	 			getComponents:function()
	 			{
	 				return $http.get("components.json");
	 			}
	 		};
	 	}
	 ]
);