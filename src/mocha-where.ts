import * as _ from 'lodash';

function toScenarios([parameterNames, ...values]: any[][]): any[] {
    return values.map(row => _.zipObject(parameterNames, row));
}

function resolveParameterReferences(name: string, object: any): string {
    return _.keys(object).reduce((string, key) => string.replace(`#${key}`, object[key]), name)
}

function createTests(table: any[][], harnessMethod: any, name: string, method: any): void {
    toScenarios(table).forEach(scenario => {
        const testName = resolveParameterReferences(name, scenario);
        harnessMethod(testName, method.bind(null, scenario));
    });
}

export function where(table: any[][]) {
    return {
        describe: (name: string, method: any) => createTests(table, describe, name, method),
        it: (name: string, method: any) => createTests(table, it, name, method)
    };
}
