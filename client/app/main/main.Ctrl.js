(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'coursesAPI', 'scrapeAPI', '$alert'];

  function MainCtrl($scope, $state, Auth, $modal, coursesAPI, scrapeAPI, $alert) {
    $scope.user = Auth.getCurrentUser();

    $scope.course = {};
    $scope.courses = [];
    $scope.scrapePostForm = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
   	$scope.showScrapeDetails = false;
   	$scope.gotScrapeResults = false;
   	$scope.loading = false;

   	var alertSuccess = $alert({
        title: 'Success! ',
        content: 'New Course added',
        placement: 'top-right',
        container: '#alertContainer',
        type: 'success',
        duration: 8
    });

    var alertFail = $alert({
        title: 'Not saved ',
        content: 'New Course failed to save',
        placement: 'top-right',
        container: '#alertContainer',
        type: 'warning',
        duration: 8
    });

   	var myModal = $modal({
   		scope: $scope,
   		show:false
   	});

   	$scope.showModal = function(){
   		myModal.$promise.then(myModal.show);
   	}

   	coursesAPI.getAllCourses()
   	 .then(function(data){
   	 	console.log(data);
   	 	$scope.courses = data.data;
   	 })
   	 .catch(function(err){
   	 	console.log('failed to get courses' + err);
   	 })


   	//Watch for changes to URL, Scrape and Display Results
	
	$scope.$watch('course.link', function(newVal, oldVal){
		if (newVal.length > 5) {
			$scope.loading = true;
		}

		var link = {
			url: $scope.course.link
		}

		scrapeAPI.getScrapeDetails(link)
		.then(function(data){
			console.log(data);
			$scope.showScrapeDetails = true;
			$scope.gotScrapeResults = true;
			$scope.uploadLookTitle = false;
			$scope.course.imgThumb = data.data.img;
			$scope.course.description = data.data.desc;
		})
		.catch(function(data){
			console.log('failed to return from scrape');
			$scope.loading = false;
			$scope.course.link = '';
			$scope.gotScrapeResults = false;
		})
		.finally(function(){
			$scope.loading = false;
			$scope.uploadLookForm = false;
		});
	});

	$scope.addScrapePost = function(){
		var course = {
			description : $scope.course.description,
			title: $scope.course.title,
			image: $scope.course.imgThumb,
			linkURL: $scope.course.link,
			email: $scope.user.email,
			name: $scope.user.name,
			_creator: $scope.user._id
		}

		coursesAPI.createScrapeCourse(course)
		 .then(function(data){
		 	$scope.showScrapeDetails = false;
		 	$scope.gotScrapeResults = false;
		 	$scope.course.title = '';
		 	$scope.course.link = '';
		 	$scope.courses.splice(0,0,data.data);
		 	console.log(data);
		 })
		 .catch(function(){
		 	console.log('failed to post');
		 	alertFail.show();
		 	$scope.showScrapeDetails = false;
		 });
	}
  }
})();