(function () {
    'use strict';

    angular
            .module('conference.speakers', [
                'ionic',
                'ngCordova'
            ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('app.tabs.speakers', {
                            url: '/speakers',
                            views: {
                                'speakers-tab': {
                                    templateUrl: 'scripts/speakers/speakers.html',
                                    controller: 'SpeakersController as vm'
                                }
                            }
                        })
                        .state('app.tabs.speakers-speaker-details', {
                            url: '/speakers-details/:speakerId',
                            views: {
                                'speakers-tab': {
                                    templateUrl: 'scripts/speakers/speaker-details.html',
                                    controller: 'SpeakerDetailsController as vm'
                                }
                            },
                            hideTabs: true
                        })
                        .state('app.tabs.speakers-session-details', {
                            url: '/speakers-session-details',
                            views: {
                                'speakers-tab': {
                                    templateUrl: 'scripts/schedule/schedule-details.html',
                                    controller: 'ScheduleDetailsController as vm'
                                }
                            },
                            hideTabs: true
                        });
            });
})();
