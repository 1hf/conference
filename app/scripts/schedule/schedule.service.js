(function () {
    'use strict';

    angular
            .module('conference.schedule')
            .factory('scheduleService', scheduleService);

    scheduleService.$inject = ['dataService', '$q', '_', 'localStorageService'];

    /* @ngInject */
    function scheduleService(dataService, $q, _, localStorageService) {
        var session = {};

        var service = {
            getScheduleDays: getScheduleDays,
            getScheduleData: getScheduleData,
//            getSessionFilterData: getSessionFilterData,
//            toggleFavorites: toggleFavorites,
//            isInFavorites: isInFavorites,
            setSession: setSession,
            getSession: getSession
        };
        return service;

//        function getSessionFilterData() {
//            return dataService.getScheduleDays().then(function (items) {
//                var days = [];
//                _.forEach(items, function (day) {
//                    var sessions = [];
//                    _.forEach(day.sessions, function (session, sessionId) {
//                        sessions.push({
//                            $id: sessionId,
//                            title: session.title
//                        });
//                    });
//                    days.push({
//                        $id: day.$id,
//                        date: day.date,
//                        sessions: sessions
//                    });
//                });
//                return days;
//            });
//        }

        function getScheduleDays(favoritesOnly, filter, filterBySessionId, filterByDayId) {
            var filter = (filter ? filter.toLowerCase() : '').trim();

            return dataService.getScheduleDays().then(function (items) {
                console.log(items);
                var schedule = [];

                var orderedDays = _.sortBy(items, 'date');
                _.forEach(orderedDays, function (day) {
                    if (filterByDayId && day.$id !== filterByDayId) {
                        return;
                    }

                    var sessions = [];

                    var orderedSessions = _.map(day.sessions, function (session, sessionId) {
                        return _.assign({}, session, {
                            $id: sessionId
                        });
                    });
                    orderedSessions = _.sortBy(orderedSessions, 'title');

                    _.forEach(orderedSessions, function (session) {
                        if (filterBySessionId && session.$id !== filterBySessionId) {
                            return;
                        }

                        var subsessions = []

                        var orderedSubsessions = _.map(session.subsessions, function (subsession, subsessionId) {
                            return _.assign({}, subsession, {
                                $id: subsessionId
                            });
                        });
                        orderedSubsessions = _.sortBy(orderedSubsessions, 'timeStart');

                        _.forEach(orderedSubsessions, function (subsession) {
                            if (favoritesOnly && !isInFavorites(subsession.$id)) {
                                return;
                            }

                            if (filter && subsession.title.toLowerCase().indexOf(filter) < 0) {
                                return;
                            }

                            subsessions.push({
                                type: 'subsession',
                                subsession: subsession
                            });
                        });

                        if (subsessions.length) {
                            sessions.push({
                                type: 'session',
                                title: session.title
                            });
                            sessions = sessions.concat(subsessions);
                        }
                    })

                    if (sessions.length) {
                        schedule.push({
                            type: 'day',
                            date: day.date
                        });
                        schedule = schedule.concat(sessions);
                    }
                })

                //return schedule;
                return items;
            });
        }

        function getScheduleData() {
            return dataService.getScheduleDays().then(function (items) {
                return items;
            });
        }

//        function toggleFavorites(sessionId, toggle) {
//            var favorites = localStorageService.get('favoriteSessions') || [];
//            if (toggle) {
//                favorites.push(sessionId);
//                favorites = _.uniq(favorites);
//            } else {
//                favorites = _.filter(favorites, function (item) {
//                    return item != sessionId;
//                });
//            }
//            localStorageService.set('favoriteSessions', favorites);
//        }
//
//        function isInFavorites(id) {
//            var favorites = localStorageService.get('favoriteSessions');
//            return _.indexOf(favorites, id) >= 0;
//        }

        function setSession(currentSession) {
            session = currentSession;

        }

        function getSession() {
            console.log(angular.toJson(session));
            return session;
        }
    }
})();
