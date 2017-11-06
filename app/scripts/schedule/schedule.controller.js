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
            showTomorrow: showTomorrow
        });
        vm.scheduleDate = '';
        //vm.scheduleDate = new Date();
        vm.rooms = 'all';
        //*********************************************

        $scope.$on('$ionicView.beforeEnter', function () {
            loadSchedule();
        });

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
            scheduleService.getScheduleDays(vm.favorites, vm.filter, vm.filterBySessionId, vm.filterByDayId).then(function (items) {
                vm.schedules = items;
                /*vm.schedules = [{
	"eventDate": "2017-11-26T18:30:00.966Z",
	"location": "Hall A",
	"sessions": [{
		"id": "1",
		"sessionName": "THEMATIC SESSION",
		"events": [{
			"id": "1",
			"timeStart": "8:30AM - 9:00AM",
			"eventTitle": "History of Anaesthesia",
			"speakerNames": "Prof. T. C. Kriplani",
			"moderatorNames": "",
			"chairPersons": "Dr.S. S. C. Chakra Rao, Dr. Sakuntala Chakraborty"
		}, {
			"id": "2",
			"timeStart": "9:00AM - 9:30AM",
			"eventTitle": "New Horizon in Anaesthesia - where are we now ?",
			"speakerNames": "Prof. Abhijit Bhattacharyya",
			"moderatorNames": "",
			"chairPersons": "Dr.S. S. C. Chakra Rao, Dr. Sakuntala Chakraborty"
		}, {
			"id": "3",
			"timeStart": "9:30AM - 10:00AM",
			"eventTitle": "Progress of Teaching , Training and Research over years in Anaesthesia : Indian senario",
			"speakerNames": "Prof. P.F. Kotur",
			"moderatorNames": "",
			"chairPersons": "Dr.S. S. C. Chakra Rao, Dr. Sakuntala Chakraborty"
		}]
	}, {
		"id": "2",
		"sessionName": "PANEL DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "10:00AM - 11:00AM",
			"eventTitle": "Neuromuscular Block - Is Residual Block still a Problem ??",
			"speakerNames": "Brdg T.Prabhakar, Dr. Ronald D. Miller, Dr. Anil Arekapudi Dr. B. Radhakrishnan",
			"moderatorNames": "Dr. Arabinda Ray",
			"chairPersons": "Dr. Amitava Rudra, Dr. R.C. Agarwal"
		}]
	}, {
		"id": "3",
		"sessionName": "Orations",
		"events": [{
			"id": "1",
			"timeStart": "11:30AM - 1:00PM",
			"eventTitle": "Orations",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "4",
		"sessionName": "LUNCH",
		"events": [{
			"id": "1",
			"timeStart": "1:00PM - 2:00PM",
			"eventTitle": "Lunch",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "2",
			"timeStart": "2:00PM - 5:00 PM",
			"eventTitle": "T.N. JHA & K P CHANSORIA BEST PAPER COMPETITION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}]
}, {
	"eventDate": "2017-11-26T18:30:00.966Z",
	"location": "Hall B",
	"sessions": [{
		"id": "1",
		"sessionName": "PEDIATRIC",
		"events": [{
			"id": "1",
			"timeStart": "8:30AM - 8:45AM",
			"eventTitle": "Perioperative Airway Complications in Pediatric Patients",
			"speakerNames": "Dr M. Shanmuga Sundaram,",
			"moderatorNames": "",
			"chairPersons": "Dr J P Sharma Dr Sanjib Baruah, Prof Dinesh Kaushal"
		}, {
			"id": "2",
			"timeStart": "8:45AM - 9:00AM",
			"eventTitle": "Neonatal Emergencies - A Real Challenge to Anaesthesiologist",
			"speakerNames": "Dr. Geeta kamal",
			"moderatorNames": "",
			"chairPersons": "Dr J P Sharma Dr Sanjib Baruah, Prof Dinesh Kaushal"
		}, {
			"id": "3",
			"timeStart": "9:00AM - 9:15AM",
			"eventTitle": "Neonates and Transfusion Trigger",
			"speakerNames": "Dr. Sapna Dhingra",
			"moderatorNames": "",
			"chairPersons": "Dr J P Sharma Dr Sanjib Baruah, Prof Dinesh Kaushal"
		}, {
			"id": "4",
			"timeStart": "9:15AM - 9:30AM",
			"eventTitle": "Fontan Circulation & The Child for Non-cardiac Surgery",
			"speakerNames": "Dr. Bikash Sahu",
			"moderatorNames": "",
			"chairPersons": "Dr J P Sharma Dr Sanjib Baruah, Prof Dinesh Kaushal"
		}, {
			"id": "5",
			"timeStart": "9:30AM - 9:45AM",
			"eventTitle": "Anesthesia for Pediatric Opthalmic Surgery",
			"speakerNames": "Dr. Renu Sinha",
			"moderatorNames": "",
			"chairPersons": "Dr J P Sharma Dr Sanjib Baruah, Prof Dinesh Kaushal"
		}, {
			"id": "6",
			"timeStart": "9:45AM - 10:00AM",
			"eventTitle": "Fast tracking in Pediatric Ambulatory Surgeries",
			"speakerNames": "Dr. Mahesh Babu Batchu",
			"moderatorNames": "",
			"chairPersons": "Dr J P Sharma Dr Sanjib Baruah, Prof Dinesh Kaushal"
		}]
	}, {
		"id": "2",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "10:00AM - 10:15AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "3",
		"sessionName": "Problem Based Learning Session",
		"events": [{
			"id": "1",
			"timeStart": "10:15AM - 11:15AM",
			"eventTitle": "1. Cranio Synostosis",
			"speakerNames": "Dr.Mandavilli Vijaykanth",
			"moderatorNames": "Dr. Indrani Mitra",
			"chairPersons": "Dr. Durga Jethva, Dr. Purnima Mukherjee, Dr Anita Malik"
		}]
	}, {
		"id": "4",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "11.15AM-11:30AM",
			"eventTitle": "Discussion",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "5",
		"sessionName": "Orations",
		"events": [{
			"id": "1",
			"timeStart": "11.30AM-1.00 PM",
			"eventTitle": "Orations",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "6",
		"sessionName": "LUNCH",
		"events": [{
			"id": "1",
			"timeStart": "1:00PM - 2:00PM",
			"eventTitle": "Lunch",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "7",
		"sessionName": "SPONSORED",
		"events": [{
			"id": "1",
			"timeStart": "2:00PM - 3:00PM",
			"eventTitle": "Sponsored",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "8",
		"sessionName": "PRO-CON",
		"events": [{
			"id": "1",
			"timeStart": "3:00PM - 3.20PM",
			"eventTitle": "Inhalational technique is the best option for induction in paediatric patients",
			"speakerNames": "Dr.Asha KS (PRO), Dr Anju Gupta (CON)",
			"moderatorNames": "Dr. Purba Halder",
			"chairPersons": "Dr. Gera Kiran Kumar"
		}]
	}, {
		"id": "9",
		"sessionName": "Problem Based Learning Session",
		"events": [{
			"id": "1",
			"timeStart": "3:20PM - 4:10PM",
			"eventTitle": "Problem Based Learning Session",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "2",
			"timeStart": "3:20PM - 3:35PM",
			"eventTitle": "Adenotonsillectomy- A real Challenge",
			"speakerNames": "Dr.Sanchita Sharma",
			"moderatorNames": "Dr. Sudeshna bhar Kundu",
			"chairPersons": "Dr. Shobha Parashar"
		}, {
			"id": "3",
			"timeStart": "3:35PM - 3:50PM",
			"eventTitle": "Paediatric NORA",
			"speakerNames": "Dr.Abhijit Das",
			"moderatorNames": "",
			"chairPersons": "Dr Biswanath Biswas"
		}, {
			"id": "4",
			"timeStart": "3:50PM - 4:05PM",
			"eventTitle": "Neonatal Resuscitation_ Update",
			"speakerNames": "Dr Nidhi Bhatia",
			"moderatorNames": "",
			"chairPersons": "Dr Biswanath Biswas"
		}, {
			"id": "5",
			"timeStart": "4.05PM - 4.15PM",
			"eventTitle": "Acute pain management in Children",
			"speakerNames": "Dr. Bandana Paudel",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "10",
		"sessionName": "PANEL",
		"events": [{
			"id": "1",
			"timeStart": "4:15PM - 5:00PM",
			"eventTitle": "USG guided regional anaesthesia in children- Brachial TAP Block Caudal Block Ilioinguinal and Iliohypogastric block",
			"speakerNames": "Dr.Avijit Biswas, Dr Swati Chhabra, Dr.Indu Sen, Dr.Subrata Ray",
			"moderatorNames": "Dr.Ramapati Sanyal",
			"chairPersons": "Dr. C Radha Kishan Rao, Dr. Raj Tobin"
		}]
	}]
}, {
	"eventDate": "2017-11-26T18:30:00.966Z",
	"location": "Hall C",
	"sessions": [{
		"id": "1",
		"sessionName": "OBG",
		"events": [{
			"id": "1",
			"timeStart": "8:30AM - 8:45AM",
			"eventTitle": "Landmark Publications In Last 5 years which changed the practice of Obstetric Anesthesia",
			"speakerNames": "Dr. Shubhada Deshmukh",
			"moderatorNames": "",
			"chairPersons": "Dr. Abdul Hameed, Dr Usha Swalka"
		}, {
			"id": "2",
			"timeStart": "8:45AM - 9:00AM",
			"eventTitle": "Anesthesia for Fetal Surgery - The New Horizon",
			"speakerNames": "Jayashree Simha",
			"moderatorNames": "",
			"chairPersons": "Dr. Abdul Hameed, Dr Usha Swalka"
		}, {
			"id": "3",
			"timeStart": "9:00AM - 9:15AM",
			"eventTitle": "CPR in a pregnant patient",
			"speakerNames": "Dr. Manjusha Shah",
			"moderatorNames": "",
			"chairPersons": "Dr. Abdul Hameed, Dr Usha Swalka"
		}, {
			"id": "4",
			"timeStart": "9:15AM - 9:30AM",
			"eventTitle": "Blood Conservation Strategies in Obstetric Patients",
			"speakerNames": "Dr. Ekambarakrishna",
			"moderatorNames": "",
			"chairPersons": "Dr. Abdul Hameed, Dr Usha Swalka"
		}, {
			"id": "5",
			"timeStart": "9:30AM - 9:40AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "2",
		"sessionName": "PRO-CON",
		"events": [{
			"id": "1",
			"timeStart": "9:40AM - 10:00AM",
			"eventTitle": "GA is the preferred anaesthesia in severe Pre-eclampsia",
			"speakerNames": "Dr.Srividhya (PRO), Dr Rupankar Nath (CON)",
			"moderatorNames": "Dr. Kasturi Hossain Banerjee",
			"chairPersons": "Dr Subrata Mondal"
		}, {
			"id": "2",
			"timeStart": "10:00AM - 10:20AM",
			"eventTitle": "Oxytocics - more Problem than Solution",
			"speakerNames": "Dr. Veena N.(PRO), Dr Sharad Kumar(CON)",
			"moderatorNames": "",
			"chairPersons": "Dr Rumi Baruah"
		}]
	}, {
		"id": "3",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "10:20AM - 10:30AM",
			"eventTitle": "Discussion",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "4",
		"sessionName": "Problem Based Learning Session",
		"events": [{
			"id": "1",
			"timeStart": "10:30AM - 11:30AM",
			"eventTitle": "Complications In Obstetrics",
			"speakerNames": "",
			"moderatorNames": "Dr. Anuradha Mitra",
			"chairPersons": ""
		}]
	}, {
		"id": "5",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "6",
		"sessionName": "0RATION",
		"events": [{
			"id": "1",
			"timeStart": "11:30AM - 1:00PM",
			"eventTitle": "0RATION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "7",
		"sessionName": "LUNCH",
		"events": [{
			"id": "1",
			"timeStart": "1:00PM - 2:00PM",
			"eventTitle": "Lunch",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "8",
		"sessionName": "SPONSORED",
		"events": [{
			"id": "1",
			"timeStart": "2:00 PM - 3:00 PM",
			"eventTitle": "SPONSORED",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "9",
		"sessionName": "PRO-CON",
		"events": [{
			"id": "1",
			"timeStart": "3:00 PM - 3:20 PM",
			"eventTitle": "High Intraabdominal pressure during laparoscopic pneumoperitonium does affect outcome.",
			"speakerNames": "Dr.Nishant sahay (PRO) Dr.Maitreyee Mukherjee (CON)",
			"moderatorNames": "Dr. Anjana Basu",
			"chairPersons": "Dr Nupur Biswas"
		}, {
			"id": "2",
			"timeStart": "3.20 PM -3. 40 PM",
			"eventTitle": "Spinal anaesthesia is contraindicated in Pregnanat patient with Mitral Stenosis for LUCS",
			"speakerNames": "Dr. Parikshit Hazarika (PRO) Dr. Sasidharan P. (CON)",
			"moderatorNames": "",
			"chairPersons": "Dr Mustak Ahmed"
		}, {
			"id": "3",
			"timeStart": "3:40 PM - 3:50 PM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "10",
		"sessionName": "PANEL",
		"events": [{
			"id": "1",
			"timeStart": "3.50 PM - 4.50 PM",
			"eventTitle": "Pregnancy and Hemoglobinopathies",
			"speakerNames": "Dr.Satish Deshpande Bhabani sankar Kodali Dr.Ravi R, Dr. Yerramsetti Atchyuth, Dr. Manjunath",
			"moderatorNames": "Dr. Palash Kumar",
			"chairPersons": "Dr Qazi Ehsan Ali, Dr R lakshmi"
		}]
	}]
}, {
	"eventDate": "2017-11-26T18:30:00.966Z",
	"location": "Hall D",
	"sessions": [{
		"id": "1",
		"sessionName": "BARIATRIC ANESTHESIA",
		"events": [{
			"id": "1",
			"timeStart": "8:30AM - 8:45AM",
			"eventTitle": "NORA for Bariatric Obese Patient.",
			"speakerNames": "Dr. Basant Kumar Pradhan",
			"moderatorNames": "",
			"chairPersons": "DR RAKESH KUMAR SINGH"
		}, {
			"id": "2",
			"timeStart": "8:45AM - 9:00AM",
			"eventTitle": "Anesthesia for Laproscopic Bariatric Surgery",
			"speakerNames": "Dr Ganesh Prabhu",
			"moderatorNames": "",
			"chairPersons": "Dr Somnath Dey"
		}, {
			"id": "3",
			"timeStart": "9:00AM - 9:15AM",
			"eventTitle": "Predicting and Managing MODA- The Morbidly Obese Difficult Airway",
			"speakerNames": "Dr.Jayram Dasan",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "4",
			"timeStart": "9:15AM - 9:25AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "2",
		"sessionName": "PRO-CON",
		"events": [{
			"id": "1",
			"timeStart": "9:30AM - 9:50AM",
			"eventTitle": "Polysomnography is Mandatory for OSA Patients",
			"speakerNames": "Dr. Gautam piplai (PRO) , Dr. Namrata Biswas (CON)",
			"moderatorNames": "Dr. Chaitali biswas,",
			"chairPersons": "Dr Mausumi Niyogi, Dr S V Laxminarayana"
		}, {
			"id": "2",
			"timeStart": "9:50AM - 10:10AM",
			"eventTitle": "RA is always better than GA for Lower Abdominal Surgery in Morbidly Obese Patients",
			"speakerNames": "Dhruba borgohain(PRO) Dr.Vaskar Majumdar(CON)",
			"moderatorNames": "",
			"chairPersons": "Dr Mausumi Niyogi, Dr S V Laxminarayana"
		}, {
			"id": "3",
			"timeStart": "10:10AM - 10:20AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "3",
		"sessionName": "Problem Based Learning (Endocrinology)",
		"events": [{
			"id": "1",
			"timeStart": "10:20AM - 10:32AM",
			"eventTitle": "Perioperative management in Diabetic patients for Emergency Surgery",
			"speakerNames": "Dr. Sumanta Dasgupta",
			"moderatorNames": "Dr. Chiranjib Bhattacharya",
			"chairPersons": "Dr Samar Chakraborty, Dr Utpaljit barman"
		}, {
			"id": "2",
			"timeStart": "10:32AM - 10:44AM",
			"eventTitle": "Acute Adrenal insufficiency in Patient undergoing Appendicectomy",
			"speakerNames": "Dr Laxmirani Tekkelapati",
			"moderatorNames": "Dr. Chiranjib Bhattacharya",
			"chairPersons": "Dr Samar Chakraborty, Dr Utpaljit barman"
		}, {
			"id": "3",
			"timeStart": "10:44AM - 10:56AM",
			"eventTitle": "Anesthetic Management in a Patient undergoing laparotomy for Carcinoid Syndrome",
			"speakerNames": "Dr Pothula Krishnaprasad",
			"moderatorNames": "Dr. Chiranjib Bhattacharya",
			"chairPersons": "Dr Samar Chakraborty, Dr Utpaljit barman"
		}, {
			"id": "4",
			"timeStart": "10:56AM - 11:08AM",
			"eventTitle": "Pheochromocytoma: Perioperative challenges",
			"speakerNames": "Dr. C R Das",
			"moderatorNames": "Dr. Chiranjib Bhattacharya",
			"chairPersons": "Dr Samar Chakraborty, Dr Utpaljit barman"
		}, {
			"id": "5",
			"timeStart": "11:08AM - 11:20AM",
			"eventTitle": "Thyroid Emergencies and Anaesthesia",
			"speakerNames": "Dr. Rajesh M. C.",
			"moderatorNames": "Dr. Chiranjib Bhattacharya",
			"chairPersons": "Dr Samar Chakraborty, Dr Utpaljit barman"
		}, {
			"id": "6",
			"timeStart": "11:20AM - 11:30AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "4",
		"sessionName": "ORATION",
		"events": [{
			"id": "1",
			"timeStart": "",
			"eventTitle": "ORATION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "5",
		"sessionName": "LUNCH",
		"events": [{
			"id": "1",
			"timeStart": "",
			"eventTitle": "Lunch",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "6",
		"sessionName": "SPONSORED SESSION",
		"events": [{
			"id": "1",
			"timeStart": "2:00PM - 3:00PM",
			"eventTitle": "SPONSORED SESSION GERIATRIC",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "7",
		"sessionName": "Problem Based session",
		"events": [{
			"id": "1",
			"timeStart": "3:00PM - 3:10Pm",
			"eventTitle": "Parkinsons Diseases and Anesthesia",
			"speakerNames": "Dr. Stalin V",
			"moderatorNames": "Dr Sujata Ghosh",
			"chairPersons": "Dr Prasanta Kumar Datta, Dr Manabendra Sarkar, Dr Tarangini Das"
		}, {
			"id": "2",
			"timeStart": "3:10PM - 3:20PM",
			"eventTitle": "Post Stroke",
			"speakerNames": "Dr. Sashikant",
			"moderatorNames": "Dr Sujata Ghosh",
			"chairPersons": "Dr Prasanta Kumar Datta, Dr Manabendra Sarkar, Dr Tarangini Das"
		}, {
			"id": "3",
			"timeStart": "3:20PM - 3:30PM",
			"eventTitle": "Alzeimer's disease",
			"speakerNames": "Dr. Sankari Santra",
			"moderatorNames": "Dr Sujata Ghosh",
			"chairPersons": "Dr Prasanta Kumar Datta, Dr Manabendra Sarkar, Dr Tarangini Das"
		}, {
			"id": "4",
			"timeStart": "3:30PM - 3:40PM",
			"eventTitle": "Myopathy",
			"speakerNames": "Dr. Shamsad Beegum",
			"moderatorNames": "Dr Sujata Ghosh",
			"chairPersons": "Dr Prasanta Kumar Datta, Dr Manabendra Sarkar, Dr Tarangini Das"
		}, {
			"id": "5",
			"timeStart": "3:40PM - 3:50PM",
			"eventTitle": "Neuropathy",
			"speakerNames": "Dr. Priyam Saikia",
			"moderatorNames": "Dr Sujata Ghosh",
			"chairPersons": "Dr Prasanta Kumar Datta, Dr Manabendra Sarkar, Dr Tarangini Das"
		}, {
			"id": "6",
			"timeStart": "3:50PM - 4:00PM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "8",
		"sessionName": "PANEL",
		"events": [{
			"id": "1",
			"timeStart": "4:10PM - 5:00PM",
			"eventTitle": "Relevance of post operative ventilation in Geriatric Patients following surgery",
			"speakerNames": "Dr. Sushil Pokharna, Dr. Baljit Singh, Dr. Venu Gopal S Reddy, Dr. Sraboni Basu, Dr Shubhangi Kothari",
			"moderatorNames": "Dr. Ahsan Ahmed",
			"chairPersons": "Dr Anjalika Sahoo, Dr. Medha Mohta"
		}]
	}]
}, {
	"eventDate": "2017-11-26T18:30:00.966Z",
	"location": "Hall E",
	"sessions": [{
		"id": "1",
		"sessionName": "CARDIAC",
		"events": [{
			"id": "1",
			"timeStart": "8:30 AM - 8:45 AM",
			"eventTitle": "Fast Tracking following Cardiac Surgery",
			"speakerNames": "Dr.Arin Choudhury",
			"moderatorNames": "",
			"chairPersons": "Dr Md Yunus"
		}, {
			"id": "2",
			"timeStart": "8:45 AM - 9.00 AM",
			"eventTitle": "Cardiac implantable electronic devices and Anesthesiologist",
			"speakerNames": "Dr. Vishwas Malik",
			"moderatorNames": "",
			"chairPersons": "Dr P K Das"
		}, {
			"id": "3",
			"timeStart": "9.00 AM - 9:15 AM",
			"eventTitle": "Minimally invasive cardiac surgeries role of Anesthesiaologist",
			"speakerNames": "Dr. Minati Chaudhury",
			"moderatorNames": "",
			"chairPersons": "Col. Basanta Kumar Gandhi"
		}, {
			"id": "4",
			"timeStart": "9:15 AM - 9:30 AM",
			"eventTitle": "Anesthesia for Aortic Arch repair",
			"speakerNames": "Dr Binil Issac Mathew",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "5",
			"timeStart": "9:30 AM - 9:45 AM",
			"eventTitle": "Role of Anaesthesiologist in Cath Lab",
			"speakerNames": "Dr. Saibal Roy Chowdhury",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "6",
			"timeStart": "9:45 AM - 10:00 AM",
			"eventTitle": "Newer modes of Hemodynamic monitoring.",
			"speakerNames": "Dr. Saikat Bandyopadhyay",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "2",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "10:00 AM - 10:15 AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "3",
		"sessionName": "PRO-CON",
		"events": [{
			"id": "1",
			"timeStart": "10:15 AM - 10:30 AM",
			"eventTitle": "Severe Aortic Valve Stenosis is an absolute Contra-indication to Sub arachnoid block.",
			"speakerNames": "Pro- Dr. Manoj Kamal, Dr Amit Rastogi",
			"moderatorNames": "Dr.Dipanjan Chatterjee",
			"chairPersons": "Dr Satyanarayan"
		}, {
			"id": "2",
			"timeStart": "10:35 AM - 10:55 AM",
			"eventTitle": "Patient with heart failure undergoing non-cardiac surgery- Ejection fraction matters",
			"speakerNames": "Pro:- Dr Dibyendu Khan Con:- Dr Arindam Choudhury",
			"moderatorNames": "",
			"chairPersons": "Dr Enakshi Saha"
		}, {
			"id": "3",
			"timeStart": "10:55 AM - 11:15 AM",
			"eventTitle": "TIVA is a better choice in cardiac anesthesia",
			"speakerNames": "Dr Chitralekha Patra (PRO) / Dr Suddhadeb Roy (CON)",
			"moderatorNames": "",
			"chairPersons": "Dr Bhakti Banerjee"
		}]
	}, {
		"id": "4",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "11:15 AM - 11:30 AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "5",
		"sessionName": "ORATION",
		"events": [{
			"id": "1",
			"timeStart": "11:30 AM - 1.00 AM",
			"eventTitle": "ORATION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "6",
		"sessionName": "LUNCH",
		"events": [{
			"id": "1",
			"timeStart": "1:00PM - 2:00PM",
			"eventTitle": "LUNCH",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "2",
			"timeStart": "2:00 PM - 3.00 PM",
			"eventTitle": "SPONSORED ",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "7",
		"sessionName": "THORACIC",
		"events": [{
			"id": "1",
			"timeStart": "3.00 PM -3.25 PM",
			"eventTitle": "Physiological Evaluation of lung resection surgery",
			"speakerNames": "Dr. Abraham Cherian",
			"moderatorNames": "",
			"chairPersons": "Dr Pramod Kohli"
		}, {
			"id": "2",
			"timeStart": "3.25 PM - 3.50 PM",
			"eventTitle": "Lung Protective ventilation in the Operating Room",
			"speakerNames": "Dr. Peter Slinger",
			"moderatorNames": "",
			"chairPersons": "Dr Amardeep Kaur"
		}]
	}, {
		"id": "8",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "3.50 PM -4:00PM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "9",
		"sessionName": "PANEL",
		"events": [{
			"id": "1",
			"timeStart": "4.10 PM - 5.00PM",
			"eventTitle": "Best Practice for CPB in adult cardiac surgery( Safe and evidence based management of CPB) - real life scenario",
			"speakerNames": "Dr. Sampa Dutta Gupta, Dr.Satyen Parida, Dr. Manjula Sarkar, Dr Manender Kumar",
			"moderatorNames": "Dr. Rahul Guha Biswas",
			"chairPersons": "Dr Somnath Ganguli, Dr Sanghamitra mishra"
		}]
	}]
}, {
	"eventDate": "2017-11-26T18:30:00.966Z",
	"location": "Hall F",
	"sessions": [{
		"id": "1",
		"sessionName": "TRAUMA",
		"events": [{
			"id": "1",
			"timeStart": "8:30 AM - 8:45 AM",
			"eventTitle": "Blast Injury of Lung- Review of recent scenario",
			"speakerNames": "Col. Dr. D. Vivekanand",
			"moderatorNames": "",
			"chairPersons": "Dr Ashok Tripathi, Dr Jagadish Chandra Mishra"
		}, {
			"id": "2",
			"timeStart": "8:45 AM - 9.00 AM",
			"eventTitle": "FiiRST : Fibrinogen in the initial resuscitation of severe Trauma",
			"speakerNames": "Dr. M.Balamurugan",
			"moderatorNames": "",
			"chairPersons": "Dr Ashok Tripathi, Dr Jagadish Chandra Mishra"
		}, {
			"id": "3",
			"timeStart": "9.00 AM - 9:15 AM",
			"eventTitle": "Airway Management in Trauma patient : Dogma and Controversy",
			"speakerNames": "Dr. Eric Hodgson",
			"moderatorNames": "",
			"chairPersons": "Dr Ashok Tripathi, Dr Jagadish Chandra Mishra"
		}, {
			"id": "4",
			"timeStart": "9:15 AM - 9:30 AM",
			"eventTitle": "Challenges in Faciomaxillary Surgery",
			"speakerNames": "Dr. Narendra purohit",
			"moderatorNames": "",
			"chairPersons": "Dr Ashok Tripathi, Dr Jagadish Chandra Mishra"
		}, {
			"id": "5",
			"timeStart": "9:30 AM -9: 40 AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "2",
		"sessionName": "PANEL",
		"events": [{
			"id": "1",
			"timeStart": "9.45 AM - 10.45 AM",
			"eventTitle": "Issues and controversies in trauma management",
			"speakerNames": "Dr. Manisha Katikar, Dr. Swapna Choudhury, Dr. Manish Mehrotra, Dr. J Balavenkatasubramanian, Dr. Swagata Tripathi, Dr. Venkateswaran G",
			"moderatorNames": "",
			"chairPersons": "Dr. Tanmoy Das"
		}]
	}, {
		"id": "3",
		"sessionName": "Recent Advances",
		"events": [{
			"id": "1",
			"timeStart": "10:45 AM - 11:00 AM",
			"eventTitle": "Inhaled heparin for prevention and management of VAP",
			"speakerNames": "Dr. G. Marraro,",
			"moderatorNames": "",
			"chairPersons": "Dr Hema C Nair"
		}, {
			"id": "2",
			"timeStart": "11:00 AM - 11:15 AM",
			"eventTitle": "NIV - a new horizon in ARDS",
			"speakerNames": "Dr. Venugopal reddy,",
			"moderatorNames": "",
			"chairPersons": "Dr Mohd Saif Khan"
		}, {
			"id": "3",
			"timeStart": "11:15 AM - 11:30 AM",
			"eventTitle": "Pediatric trauma resuscitation : an update",
			"speakerNames": "Dr Priya Menon",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "4",
		"sessionName": "ORATION",
		"events": [{
			"id": "1",
			"timeStart": "11:30 AM- 1.00 AM",
			"eventTitle": "ORATION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "5",
		"sessionName": "LUNCH",
		"events": [{
			"id": "1",
			"timeStart": "1:00PM - 2:00PM",
			"eventTitle": "LUNCH",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "6",
		"sessionName": "SPONSORED",
		"events": [{
			"id": "1",
			"timeStart": "2.00 PM -3.00 PM",
			"eventTitle": "SPONSORED",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "7",
		"sessionName": "CRITICAL CARE",
		"events": [{
			"id": "1",
			"timeStart": "3:00 PM - 3:15 PM",
			"eventTitle": "High flow oxygen through nasal cannula : Its role in critically ill patients.",
			"speakerNames": "Dr. Rajat Chowdhury",
			"moderatorNames": "",
			"chairPersons": "Dr A K Baronia"
		}, {
			"id": "2",
			"timeStart": "3:15 PM - 3:30 PM",
			"eventTitle": "Nutrition in Critically ill",
			"speakerNames": "Dr Mridupaban Nath,",
			"moderatorNames": "",
			"chairPersons": "Dr Anirban Hom Choudhuri"
		}, {
			"id": "3",
			"timeStart": "3:30 PM - 3:45 PM",
			"eventTitle": "USG in Critical Care",
			"speakerNames": "Dr. Satyajeet Misra",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "4",
			"timeStart": "3:45 PM - 4:00 PM",
			"eventTitle": "Electrolyte imbalances in Critical Care",
			"speakerNames": "Dr Ruchira Khasne",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "5",
			"timeStart": "4:00 PM - 5:00 PM",
			"eventTitle": "Controversies, contradictions & consensus in critical care",
			"speakerNames": "Dr Arun Kumar Ajjappa, Dr. Dinesh K Singh, Dr. J. V. Divatia , Dr. Asif Ahmed , Dr Balwinder Rekhi,",
			"moderatorNames": "Dr. Arindam Kar,",
			"chairPersons": "Dr D P Samaddar, Dr. Sujata Chaudhary"
		}]
	}]
}, {
	"eventDate": "2017-11-26T18:30:00.966Z",
	"location": "Hall G",
	"sessions": [{
		"id": "1",
		"sessionName": "NEURO",
		"events": [{
			"id": "1",
			"timeStart": "8:30 AM - 8:45 AM",
			"eventTitle": "Neuro Anesthesia for Non Speciality Anesthesiologist",
			"speakerNames": "Dr. V. J. Ramesh",
			"moderatorNames": "",
			"chairPersons": "Lt Col KR Shivasankar"
		}, {
			"id": "2",
			"timeStart": "8:45 AM - 9.00 AM",
			"eventTitle": "Day care Neuro Surgery",
			"speakerNames": "Dr. Sashi Srivastav",
			"moderatorNames": "",
			"chairPersons": "K R Madhusudan Reddy"
		}, {
			"id": "3",
			"timeStart": "9.00 AM - 9:15 AM",
			"eventTitle": "Anesthesia for Pituitary Adenoma",
			"speakerNames": "Dr. Ravindra Shishodia",
			"moderatorNames": "",
			"chairPersons": "Dr. Subir Basu Thakur"
		}, {
			"id": "4",
			"timeStart": "9:15 AM - 9:30 AM",
			"eventTitle": "The procedure went well but the patient is blind following Neuro Surgery",
			"speakerNames": "Dr. Padmaja Durga",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "5",
			"timeStart": "9:30 AM - 9:45 AM",
			"eventTitle": "Anaesthesia for Intracranial Aneurysm",
			"speakerNames": "Dr. Saurabh Bhargava",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "6",
			"timeStart": "9:45 AM - 10:00 AM",
			"eventTitle": "Pain management after Neuro Surgery",
			"speakerNames": "Prakhar Gyanesh",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "2",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "10:00 AM - 10:15 AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "3",
		"sessionName": "PANEL",
		"events": [{
			"id": "1",
			"timeStart": "10:15 AM - 11:15 AM",
			"eventTitle": "Neuro Prognostication and end of life issues",
			"speakerNames": "Dr. Uma Maheswara Rao, Dr Adrian W Gelb, Dr. Ravi Mahajan, Dr. Manikandan, Dr Hemangi Karnik, Dr G. Parameshwar",
			"moderatorNames": "Dr. Indranil Ghosh",
			"chairPersons": "Dr. Nidhi Bidyut Panda, M N Chidanandswamy, Dr Debabrata Sanyal"
		}]
	}, {
		"id": "4",
		"sessionName": "DISCUSSION",
		"events": [{
			"id": "1",
			"timeStart": "11:15 AM - 11:30 AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "5",
		"sessionName": "ORATION",
		"events": [{
			"id": "1",
			"timeStart": "11.30 AM -1.00 PM",
			"eventTitle": "ORATION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "6",
		"sessionName": "LUNCH",
		"events": [{
			"id": "1",
			"timeStart": "1:00PM - 2:00PM",
			"eventTitle": "LUNCH",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "7",
		"sessionName": "PRO-CON",
		"events": [{
			"id": "1",
			"timeStart": "2.00 PM -2.20 PM",
			"eventTitle": "Adenosin: A better option in Aneurysm Clipping",
			"speakerNames": "Dr. Jayati Ghosh(PRO), / Dr. Sreelatha M (CON) ,",
			"moderatorNames": "Dr.Subhajit Guha",
			"chairPersons": "Dr Apratim Mukhopadhyay"
		}, {
			"id": "2",
			"timeStart": "2.20 PM -2.40 PM",
			"eventTitle": "Nitrous oxide in neuro anaesthesia - to be or not to be",
			"speakerNames": "Dr. Saikat Neogi (PRO), , Dr. Prasanna Bidkar (CON)",
			"moderatorNames": "",
			"chairPersons": "Dr. Gentle Srestha"
		}, {
			"id": "3",
			"timeStart": "2:40 PM - 2:50 PM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "8",
		"sessionName": "PROBLEM BASED LEARNING SESSION",
		"events": [{
			"id": "1",
			"timeStart": "2:50 PM - 3:05 PM",
			"eventTitle": "Respiratory distress after extubation following cervical spinal surgery",
			"speakerNames": "Dr. Rajashree C Deopujari",
			"moderatorNames": "Ankur Luthra",
			"chairPersons": "Dr. V. Bhadrinarayan"
		}, {
			"id": "2",
			"timeStart": "3:05 PM - 3:20 PM",
			"eventTitle": "Craniotomy is over but patient does not wake up",
			"speakerNames": "Dr. Zulfikar Ali",
			"moderatorNames": "",
			"chairPersons": "Dr Ashrukana Mitra"
		}, {
			"id": "3",
			"timeStart": "3:20 PM - 3:35 PM",
			"eventTitle": "Surgery for brain abscess in a child with congenital cyanotic heart disease.",
			"speakerNames": "Dr. Ponniah Vanamurthy",
			"moderatorNames": "",
			"chairPersons": "Dr Sumanta Ghosh Mallick"
		}, {
			"id": "4",
			"timeStart": "3:35 PM - 3:50 PM",
			"eventTitle": "Intraoperative aneurysm rupture",
			"speakerNames": "Dr. Gentle Srestha",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "5",
			"timeStart": "3:50 PM - 4:05 PM",
			"eventTitle": "Child with large meningomyelocele excision",
			"speakerNames": "Dr Rashmi Virmani",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "6",
			"timeStart": "4:05 PM - 4:15 PM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "9",
		"sessionName": "PANEL",
		"events": [{
			"id": "1",
			"timeStart": "4:15 PM - 4:50 PM",
			"eventTitle": "Stress Management and personality Development in Neuro Anesthetetist",
			"speakerNames": "Dr Hemlata, Dr Rajiv Chawla, Dr Neerja Bharti, Dr. Hemanshu Prabhakar",
			"moderatorNames": "",
			"chairPersons": "Dr P V Shiva, Dr Manoj Saikia"
		}, {
			"id": "2",
			"timeStart": "4.50 PM -5.00 PM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}]
}, {
	"eventDate": "2017-11-26T18:30:00.966Z",
	"location": "Hall H",
	"sessions": [{
		"id": "1",
		"sessionName": "OPTHALMIC FORUM",
		"events": [{
			"id": "1",
			"timeStart": "8:30 AM - 8:40 AM",
			"eventTitle": "Anaesthesia and IOP",
			"speakerNames": "Dr Anjolie Chhabra,",
			"moderatorNames": "",
			"chairPersons": "Prof. Basu S M"
		}, {
			"id": "2",
			"timeStart": "8:40 AM - 8:50 AM",
			"eventTitle": "Practice of Ophthalmic anaesthesia: Single speciality Vs Multispeciality hospital.",
			"speakerNames": "Dr.Kannan R,",
			"moderatorNames": "",
			"chairPersons": "Prof. Balakrishnan K"
		}, {
			"id": "3",
			"timeStart": "8:50 AM - 9:00 AM",
			"eventTitle": "Anaesthesia for Emergency Eye Procedures.",
			"speakerNames": "Dr.Sonali Raman,",
			"moderatorNames": "",
			"chairPersons": "Dr.Jagadeesh V"
		}, {
			"id": "4",
			"timeStart": "9:00 AM - 9:10 AM",
			"eventTitle": "Congenital Cataract and Cardiac Anomalies: Anaesthetic Implications.",
			"speakerNames": "Dr.Jagadeesh V",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "5",
			"timeStart": "9:10 AM - 9:20 AM",
			"eventTitle": "Congenital cataract and mucopolysaccharidosis: Anaesthetic Management",
			"speakerNames": "Dr.Suman Shree",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "6",
			"timeStart": "9:20 AM - 9:30 AM",
			"eventTitle": "Total Ptosis following cataract surgery under peribulbar block",
			"speakerNames": "Dr.Puspha Susan Issac,",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "7",
			"timeStart": "9:30 AM - 9:40 AM",
			"eventTitle": "Seizure and cardiovascular collapse following regional anaesthesia.",
			"speakerNames": "Dr.Geetanjali Borkar",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "8",
			"timeStart": "9:40 AM - 10:00 AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "2",
		"sessionName": "FOCUSED SESSION",
		"events": [{
			"id": "1",
			"timeStart": "10:00 AM - 10:15 AM",
			"eventTitle": "Laproscopic surgery for Pheochromocytoma: an Update",
			"speakerNames": "Dr. Mahesh kumar sinha",
			"moderatorNames": "",
			"chairPersons": "Dr Asim Maity"
		}, {
			"id": "2",
			"timeStart": "10:15 AM - 10:30 AM",
			"eventTitle": "Drug abuse and impairment within Anaesthesia: Denial or Nonexistent?",
			"speakerNames": "Dr. Ashish Sinha,",
			"moderatorNames": "",
			"chairPersons": "Dr. R P Varaprasad"
		}, {
			"id": "3",
			"timeStart": "10:30 AM - 10:40 AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "3",
		"sessionName": "PBLD: Critical Care update",
		"events": [{
			"id": "1",
			"timeStart": "10:40 AM - 10:50 AM",
			"eventTitle": "Anti Catabolic therapy in Critical illness",
			"speakerNames": "Dr Rajnish Kumar",
			"moderatorNames": "Dr. Ashok Saha",
			"chairPersons": "Dr Saibal Naha Dr. Disha Magatapalli"
		}, {
			"id": "2",
			"timeStart": "10:50 AM - 11:00 AM",
			"eventTitle": "Targeting the micro circulation in Critically ill to improve outcome",
			"speakerNames": "Dr. Saswata Bharati",
			"moderatorNames": "Dr. Ashok Saha",
			"chairPersons": "Dr Saibal Naha Dr. Disha Magatapalli"
		}, {
			"id": "3",
			"timeStart": "11:00 AM - 11:10 AM",
			"eventTitle": "Limiting Lung Dyshomogeneity in preventing VILI",
			"speakerNames": "Dr. Raktim Guha",
			"moderatorNames": "Dr. Ashok Saha",
			"chairPersons": "Dr Saibal Naha Dr. Disha Magatapalli"
		}, {
			"id": "4",
			"timeStart": "11:10 AM - 11:20 AM",
			"eventTitle": "Phosphate homeostasis in Critically ill",
			"speakerNames": "Dr. Abhijit Paul",
			"moderatorNames": "Dr. Ashok Saha",
			"chairPersons": "Dr Saibal Naha Dr. Disha Magatapalli"
		}, {
			"id": "5",
			"timeStart": "11:20 AM - 11:30 AM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "4",
		"sessionName": "LUNCH",
		"events": [{
			"id": "1",
			"timeStart": "1:00PM - 2:00PM",
			"eventTitle": "LUNCH",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "5",
		"sessionName": "RAILWAY FORUM - RFISA SESSION 1",
		"events": [{
			"id": "1",
			"timeStart": "2:00 PM - 2:15 PM",
			"eventTitle": "Evolution of Anaesthesia Machine",
			"speakerNames": "Dr. Chandan Kumar Pal",
			"moderatorNames": "",
			"chairPersons": "Dr D N Upasani"
		}, {
			"id": "2",
			"timeStart": "2:15 PM - 2:30 PM",
			"eventTitle": "Difficult Extubation",
			"speakerNames": "Dr Samir basak",
			"moderatorNames": "",
			"chairPersons": "Dr M C Panwar"
		}, {
			"id": "3",
			"timeStart": "2:30 PM - 2:45 PM",
			"eventTitle": "CBRN incidences : an introduction to Anaesthetist (CBRN- Chemical, Biological, Radiation and Nuclear Accidents/ Incidents )",
			"speakerNames": "Dr. Chandrakant Patel",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "4",
			"timeStart": "2:45 PM - 3:00 PM",
			"eventTitle": "Truncal Nerve Blocks",
			"speakerNames": "Dr. S. Krishnan,",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "6",
		"sessionName": "RAILWAY FORUM - RFISA SESSION 2",
		"events": [{
			"id": "1",
			"timeStart": "3:00 PM - 3:15 PM",
			"eventTitle": "USG Guided Transforaminal Median branch & SI joint block",
			"speakerNames": "Dr. Atul Sharma",
			"moderatorNames": "",
			"chairPersons": "Dr P V Joshi"
		}, {
			"id": "2",
			"timeStart": "3:15 PM - 3:30 PM",
			"eventTitle": "Sacral foraminal caudal : An option",
			"speakerNames": "Dr Mousumi Majumder,",
			"moderatorNames": "",
			"chairPersons": "Dr S S Rathore"
		}, {
			"id": "3",
			"timeStart": "3;30 PM - 3:45 PM",
			"eventTitle": "Intrathecal fentanyl and bupivacaine in labour analgesia",
			"speakerNames": "Dr Ashok Bansal",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "4",
			"timeStart": "3:45 PM - 4:00 PM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}, {
		"id": "7",
		"sessionName": "PBLD SESSION - Anaesthetic Challenges in Complicated Labour",
		"events": [{
			"id": "1",
			"timeStart": "4:00 PM - 4:10 PM",
			"eventTitle": "Intrapartum Eclampsia",
			"speakerNames": "Dr. Suvarna K",
			"moderatorNames": "Dr. Sourabh Roy,",
			"chairPersons": "Dr Saswati Pal"
		}, {
			"id": "2",
			"timeStart": "4:10 PM - 4:20 PM",
			"eventTitle": "Unruptured Cerebral Aneurysm",
			"speakerNames": "Dr. Ira Shrivastava",
			"moderatorNames": "",
			"chairPersons": "Dr. Jyotish Chandra Pandey"
		}, {
			"id": "3",
			"timeStart": "4:20 PM - 4:30 PM",
			"eventTitle": "Eisenmenger's Syndrome",
			"speakerNames": "Dr. Tarit Saha",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "4",
			"timeStart": "4:30 PM - 4:40 PM",
			"eventTitle": "Osteogenesis Imperfecta",
			"speakerNames": "Dr. Siddhartha Mukherjee",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "5",
			"timeStart": "4:40 PM - 4:50 PM",
			"eventTitle": "Major Trauma",
			"speakerNames": "Dr. Gautam Girotra",
			"moderatorNames": "",
			"chairPersons": ""
		}, {
			"id": "6",
			"timeStart": "4:50 PM - 5:00 PM",
			"eventTitle": "DISCUSSION",
			"speakerNames": "",
			"moderatorNames": "",
			"chairPersons": ""
		}]
	}]
}];*/
                console.log(vm.schedules);

            angular.forEach(vm.schedules, function(val,key){
                if(key===0){
                    if(vm.scheduleDate===''){
                        vm.scheduleDate = new Date(val.eventDate);
                    }else{
                        //
                    }
                    
                }
                       console.log((new Date(val.eventDate)).toString()+" , "+(vm.scheduleDate).toString());
                       console.log(angular.toJson(vm.schedule));
                       if((new Date(val.eventDate)).toString()===(vm.scheduleDate).toString()){
                                $scope.noRecord = '';
                                vm.schedule.push(val);
                                vm.room.push(val.location);
                                
                        }else{
                            if(key === vm.schedules.length-1){
                                $scope.noRecord = 'No Schedules found for the day.';
                            }
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
