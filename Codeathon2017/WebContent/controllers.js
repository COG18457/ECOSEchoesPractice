'use strict';

/* Controllers */

var teamEcosClaimsApp = angular.module('teamEcosClaimsApp', ['ngRoute'])
.run(function($rootScope) {
	$rootScope.flag=false;
	$rootScope.policy='';
	$rootScope.searchvalue='';
	$rootScope.claim='';
	$rootScope.clm=true;
	$rootScope.pol=true;
	$rootScope.effdt='';
	$rootScope.expdt='';
});


teamEcosClaimsApp.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
      when('/showClaim/:eventnum', {

	templateUrl: 'claimDet.html',
	controller: 'ClaimDetCtrl'
})	.when('/home', {
				templateUrl : 'ClaimApp.html',
				controller  : 'teamEcosClaimCtrl'
			})
			.when('/search', {
							templateUrl : 'ClaimRes.html',
							controller  : 'ClaimSearchCtrl'
			})
			.when('/back', {
										templateUrl : 'ClaimRes.html',
										controller  : 'ClaimSearchCtrl'
			})
			.otherwise({ redirectTo: '/home' });

}]);

teamEcosClaimsApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});


teamEcosClaimsApp.controller('ClaimDetCtrl',  ['$scope','$rootScope', '$routeParams','$http' ,function($scope,$rootScope,$routeParams,$http) {


$rootScope.flag=true;

//5CG5471SJQ
  $http.get('http://localhost:8080/cc/rest/Services/ClaimEventSummary/'+$routeParams.eventnum).success(
										function(data) {
																		  $scope.claimdetail=data;
																		  $scope.exposures=$scope.claimdetail.claimDetails;
									  });



}]);

teamEcosClaimsApp.controller('ClaimSearchCtrl',  ['$scope', '$rootScope','$routeParams','$http',function($scope,$rootScope,$routeParams,$http) {

$rootScope.flag=false;

alert('http://localhost:8080/cc/rest/Services/ClaimListByPolicy/'+$rootScope.policy+'/'+$rootScope.effdt+'/'+$rootScope.expdt);
if($rootScope.searchvalue=='policyNumber')
{
alert('test policynumer');
  $http.get('http://localhost:8080/cc/rest/Services/ClaimListByPolicy/'+$rootScope.policy+'/'+$rootScope.effdt+'/'+$rootScope.expdt).success(
										function(data) {
alert(data);
										  $scope.claims=data;
									  }).error(function(data,status)
									  {
									  alert("status"+status);
									  });
	}
	else

	{
	$http.get('http://localhost:8080/cc/rest/Services/ClaimListByEvent/'+$rootScope.claim).success(
    										function(data) {

    										  $scope.claims=data;
    									  }).error(function(data,status)
                                            									  {
                                            									  alert("data"+data);
                                            									  alert("status"+status);
                                            									  });

}


}]);

teamEcosClaimsApp.controller('teamEcosClaimCtrl', ['$scope','$rootScope','$http','$filter', function($scope,$rootScope, $http,$filter) {
						   $scope.query='';
						   $scope.searchprop='';
                            $scope.change=function()
                            {

                            $rootScope.policy=$scope.policynum;

                            }

                            $scope.setclaim=function()
                                                        {

                                                        $rootScope.claim=$scope.claimnum;
                                                        }
                              $scope.searchval=function()
                                                        {

                                  $rootScope.searchvalue=$scope.searchprop;
                                if($rootScope.searchvalue=='policyNumber')
                                {

                                $rootScope.pol=false;
                                $rootScope.clm=true;
                                }
                                else
                                {
                                $rootScope.clm=false;
                                 $rootScope.pol=true;
                                }
                                                        }

                                $scope.seteffdate=function(){
                                  $rootScope.effdt=$filter('date')($scope.dateObject, "MM-dd-yyyy")  ;



                                }
                                 $scope.setexpdate=function(){
                                                        $rootScope.expdt=$filter('date')($scope.expdateObject, "MM-dd-yyyy")  ;



                                                                }
						   $scope.search = function (){

                               	   if($scope.searchprop =='policyNumber'){


									$scope.getresultsByPolicyNumber();
							   }
						   };
 						   $scope.getresultsByPolicyNumber = function (){
							    $http.get('http://localhost:8080/cc/rest/Services/ClaimListByPolicy/'+$scope.policynum+'/03-11-2016/03-11-2017').success(
										function(data) {
										  $scope.claims=data;
								    }
								  );
				       };



						}]);




