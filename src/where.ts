import ISuite = Mocha.ISuite;
import IContextDefinition = Mocha.IContextDefinition;
import {zipObject, keys, curry, extend} from 'lodash';

export interface WhereOption {
    describe: WhereContext;
    it: WhereContext;
}

export interface WhereContext {
    (description: string, callback: (scenario: any, done: () => void) => void): ISuite;
    only(description: string, callback: (scenario: any, done: () => void) => void): ISuite;
    skip(description: string, callback: (scenario: any, done: () => void) => void): void;
}

function toScenarioObjects([parameterNames, ...parameterSets]: any[][]): any[] {
    return parameterSets.map(set => zipObject(parameterNames, set));
}

function resolveParameterReferences(name: string, object: any): string {
    return keys(object).reduce((string, key) => string.replace(`#${key}`, object[key]), name)
}

function createTests(scenariosTable: any[][], harnessMethod: any, description: string, method: any): void {
    toScenarioObjects(scenariosTable).forEach(scenario => {
        const testName = resolveParameterReferences(description, scenario);
        harnessMethod(testName, method.bind(null, scenario));
    });
}

function createWhereContext(scenariosTable: any[][], harnessMethod: IContextDefinition): WhereContext {
    const makeTestsUsing = curry(createTests)(scenariosTable);
    return extend(makeTestsUsing(harnessMethod), {
        only: makeTestsUsing(harnessMethod.only),
        skip: makeTestsUsing(harnessMethod.skip),
    }) as any;
}

export function where(scenariosTable: any[][]): WhereOption {
    return {
        describe: createWhereContext(scenariosTable, describe),
        it: createWhereContext(scenariosTable, it),
    };
}
