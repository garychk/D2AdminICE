"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ref) {
  return {
    methods: {
      focus: function focus() {
        this.$refs[ref].focus();
      }
    }
  };
};

;