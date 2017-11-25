(function () {
    'use strict';

    angular
            .module('conference.speakers')
            .controller('SpeakerDetailsController', SpeakerDetailsController);

    SpeakerDetailsController.$inject = ['speakersService', '$state', '$cordovaEmailComposer', 'externalAppsService'];

    /* @ngInject */
    function SpeakerDetailsController(speakersService, $state, $cordovaEmailComposer, externalAppsService) {
        var speakerId = $state.params.speakerId;

        var vm = angular.extend(this, {
            speaker: null,
            sendEmail: sendEmail,
            openUrl: openUrl
        });

        // ********************************************************************

        (function activate() {
            getSpeaker();
        })();

        function getSpeaker() {
            return speakersService.getSpeaker(speakerId).then(function (speaker) {
                vm.speaker = speaker;
            })
        }

        function sendEmail() {
            $cordovaEmailComposer.isAvailable().then(function () {
                var email = {
                    to: vm.author.email,
                    subject: 'Question on paper',
                    body: 'Following on your paper, I would like to contact you for more clarifications.'
                };

                $cordovaEmailComposer.open(email);
            });
        }

        function openUrl(url) {
            externalAppsService.openExternalUrl(url);
        }
    }
})();