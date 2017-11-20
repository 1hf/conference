(function () {
    'use strict';

    angular
            .module('conference.schedule', [
                'ionic',
                'ngCordova'
            ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('app.tabs.schedule', {
                            url: '/schedule',
                            views: {
                                'schedule-tab': {
                                    templateUrl: 'scripts/schedule/schedule.html',
                                    controller: 'ScheduleController as vm'
                                }
                            }
//                            ,resolve: {
//                                filterModal: ['$ionicModal', '$rootScope', function ($ionicModal, $rootScope) {
//                                        return $ionicModal.fromTemplateUrl('scripts/schedule/filter.html', {
//                                            scope: $rootScope,
//                                            animation: 'slide-in-up'
//                                        });
//                                    }]
//                            }
                        })
                        .state('app.tabs.schedule-details', {
                            url: '/schedule-details',
                            params: {item: null},
                            views: {
                                'schedule-tab': {
                                    templateUrl: 'scripts/schedule/schedule-details.html',
                                    controller: 'ScheduleDetailsController as vm'
                                }
                            }
                        });
            });
})();