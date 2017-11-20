(function () {
    'use strict';

    angular
            .module('conference.schedule')
            .controller('ScheduleController', ScheduleController);

    //ScheduleController.$inject = ['scheduleService', '$state', 'filterModal', '_', '$scope', '$filter'];
    ScheduleController.$inject = ['scheduleService', '$state', '_', '$scope', '$filter'];

    /* @ngInject */
    //function ScheduleController(scheduleService, $state, filterModal, _, $scope, $filter) {
    function ScheduleController(scheduleService, $state, _, $scope, $filter) {
        $scope.dt = [];
        var vm = angular.extend(this, {
            filter: null,
            favorites: false,
            filterBySessionId: null,
            filterByDayId: null,
            scheduleDate: null,
            rooms: null,
            dates: null,
            schedules: [],
            schedule: [],
            room: [],
            date: [],
            goToSessionDetail: goToSessionDetail,
            filterChanged: filterChanged,
            dateChanged: dateChanged,
            roomChanged: roomChanged,
            loadScheduleRoom: loadScheduleRoom,
            showFavorites: showFavorites,
            showAll: showAll,
//            showFilter: showFilter,
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

        function doRefresh() {
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
        function commonLoadSchedules(dte) { 
            
            var dt = new Date(dte.substring(6, 10) + "-" + dte.substring(3, 5) + "-" + dte.substring(0, 2) + "T18:30:00.966Z");
                dt.setDate(dt.getDate() - 1);
            angular.forEach(vm.schedules, function (val, key) {
                console.log((new Date(val.eventDate)).toString() + " , " + new Date(dt).toString());

                if ((new Date(val.eventDate)).toString() === (new Date(dt)).toString()) {
                    $scope.noRecord = '';
                    vm.schedule.push(val);
                    vm.room.push(val.location);
                }

                if (vm.date[0]) {
                    var count = 0;
                    angular.forEach(vm.date, function (vd, vk) {
                        console.log((new Date(val.eventDate)).toString() + " , " + (new Date(vd)).toString());
                        if ((new Date(val.eventDate)).toString() === (new Date(vd)).toString()) {
                            //alert('yes');
                        } else {

                            if (count === vm.date.length - 1) {
                                vm.date.push(val.eventDate);
                            }
                            count = count + 1;
                        }
                    });
                } else {
                    vm.date.push(val.eventDate);
                }
                console.log(angular.toJson(vm.date));



            });
        }
        function loadSchedule() {

            vm.schedule = [];
            vm.room = [];
            vm.rooms = 'all';
            scheduleService.getScheduleData().then(function (items) {
                vm.schedules = items;
                if (!vm.scheduleDate) {
                    //vm.scheduleDate = new Date(items[0].eventDate); 
                    vm.scheduleDate = $filter('date')(items[0].eventDate, "dd-MM-yyyy");
                }
                
                //alert(new Date(dt));
                commonLoadSchedules(vm.scheduleDate);
            });
        }

        function goToSessionDetail(session, sid, eid) {
            session.sid = sid;
            session.eid = eid;
            //scheduleService.setSession(session)
            $state.go('app.tabs.schedule-details', {item: session});
        }

        function filterChanged() {
            vm.schedule = [];
            commonLoadSchedules();

        }

        function dateChanged() {
            vm.schedule = [];
            vm.room = [];
            vm.rooms = 'all';
            commonLoadSchedules(vm.scheduleDate);
        }

        function loadScheduleRoom() {
            var dt = new Date(vm.scheduleDate.substring(6, 10) + "-" + vm.scheduleDate.substring(3, 5) + "-" + vm.scheduleDate.substring(0, 2) + "T18:30:00.966Z");
                dt.setDate(dt.getDate() - 1);
            vm.schedule = [];
            vm.room = [];
            angular.forEach(vm.schedules, function (val, key) {
                if ((new Date(val.eventDate)).toString() === (dt).toString()) {
                    $scope.noRecord = '';
                    vm.room.push(val.location);

                }
                if (val.location === vm.rooms || vm.rooms === 'all') {
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
            commonLoadSchedules();
        }

        function showAll() {
            vm.favorites = false;
            commonLoadSchedules();
        }
        function showYesterday() {
            vm.schedule = [];
            vm.scheduleDate.setDate(vm.scheduleDate.getDate() - 1);
            //alert($scope.scheduleDate);
            commonLoadSchedules(vm.scheduleDate);
        }
        function showTomorrow() {
            vm.schedule = [];
            vm.scheduleDate.setDate(vm.scheduleDate.getDate() + 1);
            //alert($scope.scheduleDate);
            commonLoadSchedules(vm.scheduleDate);
        }
//        function showFilter() {
//            scheduleService.getSessionFilterData().then(function (days) {
//                var scope = filterModal.scope;
//                scope.vm = {
//                    days: days,
//                    day: vm.filterByDayId && vm.filterByDayId !== 'all' ? _.find(days, '$id', vm.filterByDayId) : 'all',
//                    sessionId: vm.filterBySessionId ? vm.filterBySessionId : 'all',
//
//                    setDefaultSession: function () {
//                        scope.vm.sessionId = 'all';
//                    },
//                    getSessions: function (day) {
//                        if (day !== 'all') {
//                            return day.sessions;
//                        } else {
//                            var sessions = [];
//                            _.forEach(scope.vm.days, function (item) {
//                                sessions = sessions.concat(item.sessions);
//                            });
//                            return sessions;
//                        }
//                    },
//
//                    closeFilter: function () {
//                        filterModal.hide();
//                    },
//                    applyFilters: function () {
//                        filterModal.hide();
//                        var scope = filterModal.scope;
//                        vm.filterBySessionId = scope.vm.sessionId === 'all' ? null : scope.vm.sessionId;
//                        vm.filterByDayId = scope.vm.day === 'all' ? null : scope.vm.day.$id;
//                        loadSchedule();
//                    }
//                };
//                filterModal.show();
//            });
//        }
    }
})();
