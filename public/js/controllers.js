angular.module('CoinCalculatorApp.controllers', [])
.controller('HomeCtrl', function($scope, $http){

  $scope.warningMessage = false;

  var curency = [200,100,50,20,10,5,2,1]

  $scope.calculate = function(amount){
  	var isValidated = $scope.validate(amount)
  	if(isValidated){
	  	amount = $scope.isPound(amount)
	  	amount = parseInt(amount)
	  	$scope.coins = curency.map(function(coin, i){
	  		var curr = Math.floor(amount/coin)
	  		amount %= coin
	  		return {count: curr, value: coin}
	  	})
	  	$scope.result = $scope.transform($scope.coins)
	  	$scope.warningMessage = false
  	}
  	else{
  		$scope.warningMessage = true;
  	}

  }


  $scope.transform = function(obj){
  	for (var i = 0; i < obj.length; i++) {
  		if(obj[i].value === 100 || obj[i].value === 200){
  			obj[i].value = '£'+(obj[i].value/100)
  		}
  		else{
  			obj[i].value += 'p'
  		}
  	}

  	return obj;
  }


  $scope.isPound = function(str){
  	if(str.indexOf('£') !== -1){
  		str = $scope.removeChar(str)
  		str *= 100 
  	}

  	return str;
  }


  $scope.removeChar = function(str){
  	return str.replace(/[£p]+/g, '');
  }

  $scope.validate = function(str){
  	var regex = /^(\u00A3)?([0-9\.]+)p?$/;
  	return regex.test(str);
  }

});
