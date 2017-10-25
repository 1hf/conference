(function() {
	'use strict';

	angular
		.module('conference.committees', [
			'ionic',
			'ngCordova'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.committees', {
					url: '/committees',
					templateUrl: 'scripts/committees/committees.html',
					controller: 'CommitteesController as vm'
				})
				.state('app.committee-details', {
					url: '/committee-details/:id',
					templateUrl: 'scripts/committees/committee-details.html',
					controller: 'CommitteeDetailsController as vm'
				})
				.state('app.committee-member', {
					url: '/committees/:committeeId/member/:memberId',
					templateUrl: 'scripts/committees/member-details.html',
					controller: 'MemberDetailsController as vm'
				});
		});
})();
