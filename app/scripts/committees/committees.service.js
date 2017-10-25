(function() {
	'use strict';

	angular
		.module('conference.committees')
		.factory('committeesService', committeesService);

	committeesService.$inject = ['dataService', '$q', '_'];

	/* @ngInject */
	function committeesService(dataService, $q, _) {
		var committees = null;
		var service = {
			fetchCommittees: fetchCommittees,
			getCommittee: getCommittee,
			getCommitteeMember: getCommitteeMember
		};
		return service;

		function getCommittees() {
			if (!committees) {
				return dataService.getCommittees();
			}
			return $q.when(committees);
		}

		function fetchCommittees(filter) {
			filter = filter ? filter.toLowerCase() : filter;
			return getCommittees().then(function(committees) {
				var filteredCommittees = _.filter(committees, function(committee) {
					var arrayOfMembers = [];
					_.each(committee.members, function(member) {
						arrayOfMembers.push((member.firstName + ' ' + member.lastName).toLowerCase())
					});
					return !filter
						|| committee.title.toLowerCase().indexOf(filter) >= 0
						|| arrayOfMembers.join('').indexOf(filter) >= 0;
				});

				return $q.when(filteredCommittees);
			});
		}

		function getCommittee(committeeId) {
			return dataService.getCommittee(committeeId);
		}

		function getCommitteeMember(committeeId, memberId) {
			return dataService.getCommitteeMember(committeeId, memberId);
		}
	}
})();
