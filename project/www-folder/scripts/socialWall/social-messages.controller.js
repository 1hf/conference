(function() {
	'use strict';

	angular
		.module('conference.social')
		.controller('socialMessagesController', socialMessagesController);

	socialMessagesController.$inject = ['socialService', '$stateParams', '$state', 'ionicToast', 'externalAppsService'];

	/* @ngInject */
	function socialMessagesController(socialService, $stateParams, $state, ionicToast, externalAppsService) {
		var abstractId = $stateParams.id;
                var messageId = $stateParams.id;
		var vm = angular.extend(this, {
                        user: null,
			abstract: null,
                        message: null,
			goToAuthorDetail: goToAuthorDetail,
			toggleFavorites: toggleFavorites,
			openPdf: openPdf
		});

		// ********************************************************************

		(function activate() {
			//getAbstract();
                        getMessageDetails();
		})();
                
                function getMessageDetails() {
			return socialService.getMessage(messageId).then(function(message) {
				vm.message = message;
                                
                                console.log(vm.message);
                                console.log(vm.message.messageFrom);
                                socialService.getUser(vm.message.messageFrom).then(function(user){
                                    vm.user = user;
                                    console.log(vm.user);
                                    vm.message.messengerName = vm.user.firstName+" "+vm.user.lastName;
                                    vm.message.messengerPic = vm.user.avatar;
                                });
			});
                        //return socialService.getAbstract(abstractId).then(function(abstract) {
				//vm.abstract = abstract;
				//vm.abstract.isInFavorites = ChatsService.isInFavorites(vm.abstract.$id);
			//})
		}
                
		function getAbstract() {
			return socialService.getAbstract(abstractId).then(function(abstract) {
				vm.abstract = abstract;
				vm.abstract.isInFavorites = ChatsService.isInFavorites(vm.abstract.$id);
			})
		}

		function goToAuthorDetail(authorId) {
			$state.go('app.abstract-author', {
				abstractId: vm.abstract.$id,
				authorId: authorId
			});
		}

		function toggleFavorites() {
			vm.abstract.isInFavorites = !vm.abstract.isInFavorites;
			if (vm.abstract.isInFavorites) {
				socialService.toggleFavorites(vm.abstract.$id, true);
				ionicToast.show('\'' + vm.abstract.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				socialService.toggleFavorites(vm.abstract.$id, false);
				ionicToast.show('\'' + vm.abstract.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

		function openPdf() {
			externalAppsService.openPdf(vm.abstract.pdf);
		}
	}
})();
