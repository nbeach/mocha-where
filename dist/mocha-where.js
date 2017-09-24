"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function toScenarios(_a) {
    var parameterNames = _a[0], values = _a.slice(1);
    return values.map(function (row) { return _.zipObject(parameterNames, row); });
}
function resolveParameterReferences(name, object) {
    return _.keys(object).reduce(function (string, key) { return string.replace("#" + key, object[key]); }, name);
}
function createTests(table, harnessMethod, name, method) {
    toScenarios(table).forEach(function (scenario) {
        var testName = resolveParameterReferences(name, scenario);
        harnessMethod(testName, method.bind(null, scenario));
    });
}
function where(table) {
    return {
        describe: function (name, method) { return createTests(table, describe, name, method); },
        it: function (name, method) { return createTests(table, it, name, method); }
    };
}
exports.where = where;
//# sourceMappingURL=mocha-where.js.map