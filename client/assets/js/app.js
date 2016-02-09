(function() {
  'use strict';

  var App = angular.module('App', [
    'ui.router',
    'ngAnimate',
    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',
    'angular-svg-round-progress'
  ]).config(config)
    .run(run);

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

  App.controller('TasksCtrl', TasksCtrl);

  function TasksCtrl() {
    var vm = this;

    vm.viewState = 'task-status';

    vm.newTask = '';
    vm.add = add;
    vm.markAsComplete = markAsComplete;
    vm.getTotalTasks = getTotalTasks;
    vm.getTotalTasksCompleted = getTotalTasksCompleted;
    vm.calculatePercent = calculatePercent;

    vm.tasks = [
      {
        text: 'This is task 1.',
        completed: false
      }, {
        text: 'This is task 2.',
        completed: false
      }, {
        text: 'This is task 3.',
        completed: true
      }
    ];

    function add(task) {
      if ( task === '' || typeof task === 'undefined' ) {
        return false;
      }

      vm.tasks.push({
        text: task,
        completed: false
      });

      vm.newTask = '';
    }

    function markAsComplete(index) {
      var task = vm.tasks[index];
      task.completed = !task.completed;
    }

    function getTotalTasks() {
      return vm.tasks.length;
    }

    function getTotalTasksCompleted() {

      var total = 0;
      for (var i = 0; i < vm.tasks.length; i++) {
        if(vm.tasks[i].completed == true)
          total++;
      }

      return total;
    }

    function calculatePercent(count) {
      var total = vm.getTotalTasks();
      return Math.round(100 / total * count);
    }
  }
})();
