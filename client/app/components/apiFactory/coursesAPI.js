(function() {
  'use strict';

  angular
    .module('app')
  .factory('coursesAPI', coursesAPI);

    coursesAPI.$inject = ['$http'];

    function coursesAPI($http) {
      return {
        createScrapeCourse: createScrapeCourse
      }

      function createScrapeCourse(course){
        return $http.post('/api/courses/scrapeUpload', course);
      }
    }
})();