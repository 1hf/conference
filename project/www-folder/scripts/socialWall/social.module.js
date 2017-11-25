(function () {
    'use strict';

    angular
            .module('conference.social', [
                'ionic',
                'ngCordova',
                'ionic-toast'
            ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('app.social', {
                            url: '/social',
                            templateUrl: 'scripts/socialWall/social.html',
                            controller: 'socialController as vm',
                            resolve: {
                                filterModal: ['$ionicModal', '$rootScope', function ($ionicModal, $rootScope) {
                                        return $ionicModal.fromTemplateUrl('scripts/socialWall/filter.html', {
                                            scope: $rootScope,
                                            animation: 'slide-in-up'
                                        });
                                    }]
                            }
                        })
                        .state('app.social-messages', {
                            url: '/social/:id',
                            templateUrl: 'scripts/socialWall/social-messages.html',
                            controller: 'socialMessagesController as vm'
                        });
//                        .state('app.abstract-author', {
//                            url: '/chats/:abstractId/author/:authorId',
//                            templateUrl: 'scripts/chats/author-details.html',
//                            controller: 'AuthorDetailsController as vm'
//                        });
            });
})();