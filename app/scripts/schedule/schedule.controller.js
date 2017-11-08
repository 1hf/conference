(function () {
    'use strict';

    angular
            .module('conference.schedule')
            .controller('ScheduleController', ScheduleController);

    ScheduleController.$inject = ['scheduleService', '$state', 'filterModal', '_', '$scope'];

    /* @ngInject */
    function ScheduleController(scheduleService, $state, filterModal, _, $scope) {
        
        var vm = angular.extend(this, {
            filter: null,
            favorites: false,
            filterBySessionId: null,
            filterByDayId: null,
            scheduleDate: null,
            rooms: null,
            schedules: [],
            schedule: [],
            room: [],
            goToSessionDetail: goToSessionDetail,
            filterChanged: filterChanged,
            dateChanged: dateChanged,
            roomChanged: roomChanged,
            loadScheduleRoom: loadScheduleRoom,
            showFavorites: showFavorites,
            showAll: showAll,
            showFilter: showFilter,
            getClasses: getClasses,
            clearSessionFilter: clearSessionFilter,
            showYesterday: showYesterday,
            showTomorrow: showTomorrow,
            doRefresh: doRefresh
        });
        vm.scheduleDate = '';
        //vm.scheduleDate = new Date();
        vm.rooms = 'all';
        //*********************************************

        $scope.$on('$ionicView.beforeEnter', function () {
            loadSchedule();
        });
        
        function doRefresh(){
            loadSchedule();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        }
        function getClasses(type) {
            switch (type) {
                case 'day':
                    return 'item-divider day';
                case 'session':
                    return 'item-divider session';
                case 'subsession':
                    return '';
            }
        }

        function clearSessionFilter() {
            vm.filterBySessionId = null;
            vm.filterByDayId = null;
            loadSchedule();
        }

        function loadSchedule() {
            vm.schedule = [];
            vm.room = [];
            vm.rooms = 'all';
            //vm.scheduleDate = vm.scheduleDate.setHours(0, 0, 0);
            //vm.scheduleDate = new Date(vm.scheduleDate);
            scheduleService.getScheduleData().then(function (items) {
                vm.schedules = items;
                var count = 0;
            angular.forEach(vm.schedules, function(val,key){
                console.log((new Date(val.eventDate)).toString()+" , "+(vm.scheduleDate).toString());
                        
                        if(key === 0){
                           if(vm.scheduleDate!==''){
                               
                           }else{
                                vm.scheduleDate = new Date(val.eventDate);                               
                           }
                        }
                       if((new Date(val.eventDate)).toString()===(vm.scheduleDate).toString()){
                                $scope.noRecord = '';
                                vm.schedule.push(val);
                                vm.room.push(val.location);
                                
                        }else{
                            
                            if(count === vm.schedules.length-1){
                                $scope.noRecord = 'No Schedules found for the day.';
                            }
                            count = count+1;
                        }
                        

                    });
            });
        }

        function goToSessionDetail(session,sid,eid) {
            session.sid=sid;session.eid=eid;
            //scheduleService.setSession(session)
            $state.go('app.tabs.schedule-details', {item:session});
        }

        function filterChanged() {
            vm.schedule = [];
            loadSchedule();
            
        }
        
        function dateChanged() {            
            vm.schedule = [];
            loadSchedule();
        }
        
        function loadScheduleRoom() {
            //alert(vm.schedules);
            vm.schedule = [];
            vm.room = [];
            angular.forEach(vm.schedules, function(val,key){
                       if((new Date(val.eventDate)).toString()===(vm.scheduleDate).toString()){
                            $scope.noRecord = '';
                                vm.room.push(val.location);
                                
                       }
                       if(val.location===vm.rooms || vm.rooms === 'all'){
                                $scope.noRecord = '';
                                vm.schedule.push(val);
                       }
                       
                    });

        }
        
        function roomChanged() {
            vm.schedule = [];
            loadScheduleRoom();
        }
        
        function showFavorites() {
            vm.favorites = true;
            loadSchedule();
        }

        function showAll() {
            vm.favorites = false;
            loadSchedule();
        }
        function showYesterday() {
            vm.schedule = [];
            vm.scheduleDate.setDate(vm.scheduleDate.getDate() - 1);
            //alert($scope.scheduleDate);
            loadSchedule();
        }
        function showTomorrow() {
            vm.schedule = [];
            vm.scheduleDate.setDate(vm.scheduleDate.getDate() + 1);
            //alert($scope.scheduleDate);
            loadSchedule();
        }
        function showFilter() {
            scheduleService.getSessionFilterData().then(function (days) {
                var scope = filterModal.scope;
                scope.vm = {
                    days: days,
                    day: vm.filterByDayId && vm.filterByDayId !== 'all' ? _.find(days, '$id', vm.filterByDayId) : 'all',
                    sessionId: vm.filterBySessionId ? vm.filterBySessionId : 'all',

                    setDefaultSession: function () {
                        scope.vm.sessionId = 'all';
                    },
                    getSessions: function (day) {
                        if (day !== 'all') {
                            return day.sessions;
                        } else {
                            var sessions = [];
                            _.forEach(scope.vm.days, function (item) {
                                sessions = sessions.concat(item.sessions);
                            });
                            return sessions;
                        }
                    },

                    closeFilter: function () {
                        filterModal.hide();
                    },
                    applyFilters: function () {
                        filterModal.hide();
                        var scope = filterModal.scope;
                        vm.filterBySessionId = scope.vm.sessionId === 'all' ? null : scope.vm.sessionId;
                        vm.filterByDayId = scope.vm.day === 'all' ? null : scope.vm.day.$id;
                        loadSchedule();
                    }
                };
                filterModal.show();
            });
        }
    }
})();
