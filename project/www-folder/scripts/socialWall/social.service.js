(function() {
	'use strict';

	angular
		.module('conference.social')
		.factory('socialService', socialService);

	socialService.$inject = ['dataService', '$q', '_', 'localStorageService'];

	/* @ngInject */
	function socialService(dataService, $q, _, localStorageService) {
		var types = [];
		var dates = [];
		var abstracts = null;

		var service = {
			getChats: getChats,
			getChat: getChat,
			getAuthor: getAuthor,
			getTypes: getTypes,
			getDates: getDates,
			fetchChats: fetchChats,
			toggleFavorites: toggleFavorites,
			isInFavorites: isInFavorites,
                        addMessage: addMessage,
                        getMessages: getMessages
		};
		return service;
                
                function addMessage(msg) {
			return dataService.insertData(msg,"social");
		}
                
		function getAuthor(abstractId, authorId) {
			return dataService.getAbstractAuthor(abstractId, authorId);
		}

		function getChat(abstractId) {
			return dataService.getChat(abstractId);
		}

		function getTypes() {
			return getChats().then(function(abstracts) {
				_.each(abstracts, function(abstract) {
					types.push({
						name: abstract.type,
						isChecked: true
					})
				});
				var arrOfTypes = _.uniq(types, 'name');
				return arrOfTypes;
			});
		}

		function getDates() {
			return getChats().then(function(abstracts) {
				_.each(abstracts, function(abstract) {
					var date = new Date(abstract.startDate);
					dates.push({
						name: date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear(),
						isChecked: true
					})
				})
				var arrOfDates = _.uniq(dates, 'name');
				return arrOfDates;
			});
		}

                function getMessages(){
                    return dataService.getSocialMessages();
                }
		function getChats() {
			if (!abstracts) {
				return dataService.getChats().then(function(items) {
					abstracts = items;

					var favorites = localStorageService.get('favoritesAbstracts') || [];
					_.each(items, function(item) {
						if (favorites.indexOf(item.$id) >= 0) {
							item.isInFavorites = true;
						}
					});

					return items;
				});
			}
			return $q.when(abstracts);
		}

		function fetchChats(filter, showFavorites, types, dates) {
			filter = filter ? filter.toLowerCase() : filter;
			return getChats().then(function() {
				var filteredGroups = _.filter(abstracts, function(abstract) {
					var type = abstract.type;
					var date = new Date(abstract.startDate);
					var fullDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
					var currentType = _.find(types, function(item) {
						return item.name == type;
					});
					var currentDate = _.find(dates, function(item) {
						return item.name == fullDate;
					});
					return (!filter || abstract.title.toLowerCase().indexOf(filter) >= 0)
						&& (!showFavorites || abstract.isInFavorites)
						&& (!currentType || currentType.isChecked)
						&& (!currentDate || currentDate.isChecked);
				});

				return $q.when(filteredGroups);
			})
		}

		function toggleFavorites(abstractId, toggle) {
			_.each(abstracts, function(abstract) {
				if (abstract.$id === abstractId) {
					abstract.isInFavorites = toggle;

					var favorites = localStorageService.get('favoritesAbstracts') || [];

					if (toggle) {
						favorites.push(abstract.$id);
						favorites = _.uniq(favorites);
					} else {
						favorites = _.filter(favorites, function(item) {
							return item != abstract.$id;
						});
					}
					localStorageService.set('favoritesAbstracts', favorites);
				}
			});
		}

		function isInFavorites(id) {
			var favorites = localStorageService.get('favoritesAbstracts');
			return _.indexOf(favorites, id) >= 0;
		}
	}
})();
