(function () {
    'use strict';

    angular
            .module('conference.common')
            .factory('db', ['ENV', function (ENV) {
                    firebase.initializeApp(ENV.firebaseConfig);

                    var rootRef = firebase.database().ref();
                    console.log(rootRef);
                    return rootRef;
                }])
            .factory('firebaseDataService', firebaseDataService);

    firebaseDataService.$inject = ['_', 'db', '$firebaseArray', '$firebaseObject'];

    /* @ngInject */
    function firebaseDataService(_, db, $firebaseArray, $firebaseObject) {
        var service = {
            getChats: getChats,
            getChat: getChat,
            getSocialMessages: getSocialMessages,
            getCommittees: getCommittees,
            getCommittee: getCommittee,
            getCommitteeMember: getCommitteeMember,
            getConferenceData: getConferenceData,
            getWorkshops: getWorkshops,
            getWorkshop: getWorkshop,
            getSessions: getSessions,
            getSponsors: getSponsors,
            getSponsor: getSponsor,
            getMapDetails: getMapDetails,
            getSpeakers: getSpeakers,
            getSpeaker: getSpeaker,
            getAbstractAuthor: getAbstractAuthor,
            getScheduleDays: getScheduleDays,
            getUsers: getUsers,
            getmoreUsers: getmoreUsers,
            getUser: getUser,
            getUserMobile: getUserMobile,
            insertUser: insertUser,
            insertSpeaker: insertSpeaker,
            insertData: insertData,
            update: update,
            init: init
        };
        return service;

        // ***********************************************************

        function init() {}

        function getAbstractAuthor(abstractId, authorId) {
            var query = db.child('abstracts/' + abstractId + '/authors/' + authorId);
            return $firebaseObject(query).$loaded();
        }

        function getChats() {
            var query = db.child('abstracts');
            return $firebaseArray(query).$loaded();
        }

        function getSocialMessages() {
            var query = db.child('social').orderByChild("messageDate");
            return $firebaseArray(query).$loaded();
        }

        function getChat(fromId, toId) {
            //var query = db.child('chatMessages').orderByChild('messageFrom').equalTo(fromId);
            var query = db.child('chatMessages').orderByChild("messageDate");
            return $firebaseObject(query).$loaded();
        }

        function getCommittees() {
            var query = db.child('commitees');
            return $firebaseArray(query).$loaded();
        }

        function getCommittee(committeeId) {
            var query = db.child('commitees/' + committeeId);
            return $firebaseObject(query).$loaded();
        }

        function getCommitteeMember(committeeId, memberId) {
            var query = db.child('commitees/' + committeeId + '/members/' + memberId);
            return $firebaseObject(query).$loaded();
        }

        function getConferenceData() {
            var query = db.child('conference');
            return $firebaseObject(query).$loaded();
        }

        function getWorkshops() {
            var query = db.child('map');
            return $firebaseArray(query).$loaded();
        }

        function getWorkshop(workshopId) {
            var query = db.child('map/' + workshopId);
            return $firebaseObject(query).$loaded();
        }

        function getSessions() {
            var query = db.child('sessions');
            return $firebaseArray(query).$loaded();
        }

        function getSponsors() {
            var query = db.child('sponsors');
            return $firebaseArray(query).$loaded();
        }

        function getSponsor(sponsorId) {
            var query = db.child('sponsors/' + sponsorId);
            return $firebaseObject(query).$loaded();
        }

        function getMapDetails() {
            var query = db.child('map');
            return $firebaseObject(query).$loaded();
        }

        function getSpeakers() {
            var query = db.child('speakers');
            return $firebaseArray(query).$loaded();
        }

        function getSpeaker(speakerId) {
            var query = db.child('speakers/' + speakerId);
            return $firebaseObject(query).$loaded();
        }

        function getScheduleDays() {
            var query = db.child('schedule');
            return $firebaseArray(query).$loaded();
        }
        function getUser(user) {
            //user = parseInt(user);
            var query = db.child('user').orderByChild('userName').equalTo(user);
            return $firebaseObject(query).$loaded();
        }
        function getUserMobile(user) {
            //user = parseInt(user);
            var query = db.child('user').orderByChild('mobileNumber').equalTo(user);
            return $firebaseObject(query).$loaded();
        }
        function getUsers() {
            //var query = db.child('user').limitToFirst(50);
            var query = db.child('user');
            return $firebaseArray(query).$loaded();
        }
        function getmoreUsers(start, end) {
            var query = db.child('user').startAt(start).endAt(end).addListenerForSingleValueEvent(this);
            return $firebaseArray(query).$loaded();
        }
        function insertUser(user) {
            var query = db.child('user');
            return $firebaseArray(query).$add(user);
        }
        function insertSpeaker(speaker) {
            var query = db.child('speakers');
            return $firebaseArray(query).$add(speaker);
        }
        function update(id, data, collection) {
            console.log(id + "  " + angular.toJson(data) + "  " + collection)
            var query = db.child(collection + '/' + id);
            return query.update(data);
            //db.child("user/-KytaLkI2xP9-eh0ioNo").update({ firstName: "Prabagar" });
        }
        function insertData(data, collection) {
            var query = db.child(collection);
            return $firebaseArray(query).$add(data);
        }
    }
})();
