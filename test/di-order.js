'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/di-order');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('di-order', rule, {
    valid: [
        'angular.module("").animation("", function($http, $q) {});',
        'angular.module("").controller("", function($http, $q) {});',
        'angular.module("").directive("", function($http, $q) {});',
        'angular.module("").factory("", function($http, $q) {});',
        'angular.module("").factory("", fsctoryName);',
        'angular.module("").filter("", function($http, $q) {});',
        'angular.module("").provider("", function($http, $q) {this.$get = function($http, $q) {};});',
        'angular.module("").service("", function($http, $q) {});',
        'angular.module("").config(function($httpProvider, $routeProvider) {});',
        'angular.module("").run(function($http, $q) {});',
        'inject(function($http, $q) {});',
        'it(inject(function($http, $q) {}));',
        'it(inject(function(_$http_, _$httpBackend_) {}));',
        {
            code: 'it(inject(function(_$httpBackend_, _$http_) {}));',
            options: [false]
        }
    ].concat(commonFalsePositives),
    invalid: [{
        code: 'angular.module("").animation("", function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").animation("", ["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").controller("", function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").controller("", ["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").directive("", function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").directive("", ["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").factory("", function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").factory("", ["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").filter("", function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").filter("", ["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").provider("", function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").provider("", ["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").service("", function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").service("", ["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").config(function($routeProvider, $httpProvider) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").config(["$routeProvider", "$httpProvider", function($routeProvider, $httpProvider) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").run(function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").run(["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'inject(function($q, $http) {});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'inject(["q", "$http", function($q, $http) {}]);',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'it(inject(function($q, $http) {}));',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'it(inject(["q", "$http", function($q, $http) {}]));',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'it(inject(function(_$http_, _$httpBackend_) {}));',
        options: [false],
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'it(inject(function(_$httpBackend_, _$http_) {}));',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").provider("", function() {this.$get = function($q, $http) {};});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }, {
        code: 'angular.module("").provider("", function() {this.$get = ["$q", "$http", function($q, $http) {}];});',
        errors: [{message: 'Injected values should be sorted alphabetically'}]
    }]
});
