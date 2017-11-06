(function() {
	'use strict';

	angular
		.module('conference.common')
		.factory('fileDataService', fileDataService);

	fileDataService.$inject = ['$http', '$q', '_', 'ENV']

	/* @ngInject */
	function fileDataService($http, $q, _, ENV) {
		var url = ENV.apiUrl;
		var cache = null;

		var service = {
			getAbstracts: getAbstracts,
			getAbstract: getAbstract,
			getCommittees: getCommittees,
			getCommittee: getCommittee,
			getCommitteeMember: getCommitteeMember,
			getConferenceData: getConferenceData,
			getEvents: getEvents,
			getEvent: getEvent,
			getSessions: getSessions,
			getSponsors: getSponsors,
			getSponsor: getSponsor,
			getMapDetails: getMapDetails,
			getSpeakers: getSpeakers,
			getSpeaker: getSpeaker,
			getAbstractAuthor: getAbstractAuthor,
			getScheduleDays: getScheduleDays,
			init: init
		};
		return service;

		// ******************************************************************

		function setInternalIds(collections) {
			_.each(collections, function(collection) {
				_.each(cache[collection], function(item, $id) {
					item.$id = $id;
				});
			});
		}

		function init() {
			return $http.get(url).then(function(response) {
				cache = response.data;
				setInternalIds(['speakers', 'schedule-days', 'abstracts', 'commitees', 'events', 'sessions', 'sponsors']);
			});
		}

		function getAbstractAuthor(abstractId, authorId) {
			return $q.when(cache.abstracts[abstractId].authors[authorId]);

		}

		function getAbstracts() {
			return $q.when(cache.abstracts);
		}

		function getAbstract(abstractId) {
			return $q.when(cache.abstracts[abstractId]);
		}

		function getCommittees() {
			return $q.when(cache.commitees);
		}

		function getCommittee(committeeId) {
			return $q.when(cache.commitees[committeeId]);
		}

		function getCommitteeMember(committeeId, memberId) {
			return $q.when(cache.commitees[committeeId].members[memberId]);
		}

		function getConferenceData() {
			return $q.when(cache.conference);
		}

		function getEvents() {
			return $q.when(cache.events);
		}

		function getEvent(eventId) {
			return $q.when(cache.events[eventId]);
		}

		function getSessions() {
			return $q.when(cache.sessions);
		}

		function getSponsors() {
			return $q.when(cache.sponsors);
		}

		function getSponsor(sponsorId) {
			return $q.when(cache.sponsors[sponsorId]);
		}

		function getMapDetails() {
			return $q.when(cache.map);
		}

		function getSpeakers() {
			return $q.when(cache.speakers);
		}

		function getSpeaker(speakerId) {
			return $q.when(cache.speakers[speakerId]);
		}

		function getScheduleDays() {
			return $q.when(cache['schedule-days']);
		}
	}
})();