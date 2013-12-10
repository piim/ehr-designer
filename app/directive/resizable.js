app.directive
(
	'resizable',
	function($parse,$compile,FactoryService)
	{
		return {
			restrict : 'A',
			link: function(scope,element,attrs)
			{
				var update = function()
				{
					if( !scope.isStatic
						&& scope.componentDefinition.resizable )
					{
						angular.element(element).resizable
						(
							{
								ghost:true,
								autoHide:true,
								aspectRatio:true,
								stop:function(event,ui)
								{
									scope.definition.values.width = ui.size.width;
									scope.definition.values.height = ui.size.height;
								}
							}
						);
					}
					else
					{
						try
						{
							angular.element(element).resizable("destroy");
						}
						catch(e){}
					}
				}
				
				scope.$watch
				(
					'isStatic + scope.componentDefinition.container',
					function(newVal,oldVal)
					{
						if( newVal != oldVal )
							update();
					}
				);
				
				update();
			}
		};
	}
);