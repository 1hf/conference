(function () {
    'use strict';

    angular
            .module('conference.chats', [
                'ionic',
                'ngCordova',
                'ionic-toast'
            ])
            .config(function ($stateProvider) {
                $stateProvider
                        .state('app.chats', {
                            url: '/chats',
                            params: {refresh: 'yes'},
                            templateUrl: 'scripts/chats/chats.html',
                            controller: 'ChatsController as vm',
                            resolve: {
                                filterModal: ['$ionicModal', '$rootScope', function ($ionicModal, $rootScope) {
                                        return $ionicModal.fromTemplateUrl('scripts/chats/filter.html', {
                                            scope: $rootScope,
                                            animation: 'slide-in-up'
                                        });
                                    }]
                            }
                        })
                        .state('app.chats-messages', {
                            url: '/chats/chats-messages',
                            params: {user: null},
                            templateUrl: 'scripts/chats/chats-messages.html',
                            controller: 'ChatsMessagesController as vm'
                        })
                        .state('app.abstract-author', {
                            url: '/chats/:abstractId/author/:authorId',
                            templateUrl: 'scripts/chats/author-details.html',
                            controller: 'AuthorDetailsController as vm'
                        });
            });
})();