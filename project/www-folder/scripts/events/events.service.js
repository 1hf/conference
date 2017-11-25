(function () {
    'use strict';

    angular
            .module('conference.events')
            .factory('eventsService', eventsService);

    eventsService.$inject = ['dataService', 'firebaseDataService', '$q', '_', 'localStorageService'];

    /* @ngInject */
    function eventsService(dataService, firebaseDataService, $q, _, localStorageService) {
        //localStorageService.set('favoritesEvents', null);
        var events = null;
        var workshop = null;
        var service = {
            fetchEvents: fetchEvents,
            getWorkshop: getWorkshop,
            getWorkshops: getWorkshops,
            toggleFavorites: toggleFavorites,
            isInFavorites: isInFavorites
        };
        return service;
        localStorageService.set('favoritesEvents', null);

        function getWorkshop(workshopId) {
            return dataService.getWorkshop(workshopId);
        }

        function getWorkshops() {
            return dataService.getWorkshops().then(function (workshops) {
                console.log(angular.toJson(workshops));
                workshop = workshops;
                return workshop;
            });

        }

        function fetchEvents(filter, showFavorites) {
            filter = filter ? filter.toLowerCase() : filter;
            return getEvents().then(function (events) {
                var filteredEvents = _.filter(events, function (event) {
                    return (!filter || event.title.toLowerCase().indexOf(filter) >= 0)
                            && (!showFavorites || event.isInFavorites);
                });

                return $q.when(filteredEvents);
            });
        }

        function toggleFavorites(eventId, toggle) {
            _.each(workshop, function (event) {
                if (event.$id === eventId) {
                    event.isInFavorites = toggle;

                    var favorites = localStorageService.get('favoritesEvents') || [];
                    if (toggle) {
                        favorites.push(event);
                        favorites = _.uniq(favorites);
                    } else {
                        favorites = _.filter(favorites, function (item) {
                            return item != event.$id;
                        });
                    }
                    localStorageService.set('favoritesEvents', favorites);
                }
            });
        }
        ;

        function isInFavorites(id) {
            var favorites = localStorageService.get('favoritesEvents');
            return _.indexOf(favorites, id) >= 0;
        }
    }
})();
