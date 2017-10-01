import {zipObject, keys, curry} from 'lodash';

function toScenarios([parameterNames, ...parameterSets]: any[][]): any[] {
    return parameterSets.map(set => zipObject(parameterNames, set));
}

function resolveParameterReferences(name: string, object: any): string {
    return keys(object).reduce((string, key) => string.replace(`#${key}`, object[key]), name)
}

function createTests(table: any[][], harnessMethod: any, name: string, method: any): void {
    toScenarios(table).forEach(scenario => {
        const testName = resolveParameterReferences(name, scenario);
        harnessMethod(testName, method.bind(null, scenario));
    });
}

export function where(table: any[][]) {
    return {
        describe: curry(createTests)(table, describe),
        it: curry(createTests)(table, it)
    };
}
