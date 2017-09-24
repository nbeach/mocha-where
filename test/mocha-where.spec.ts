import * as chai from 'chai';
import {where} from "../src/mocha-where";
const expect = chai.expect;

describe("where()", () => {
    const values = [2, 3, 5, 7, 11];
    const params: any[][] = [['index', 'expected']];

    values.forEach((value, index) => {
        params.push([index, value])
    });

    where(params)
    .describe("allows parameterizing describe blocks - #index", (scenario: any) => {

        it(`${scenario.index}`, () => {
            expect(values[scenario.index]).to.equal(scenario.expected);
        });

    });

    where(params)
    .it("allows parameterizing it blocks - #index", (scenario: any) => {
        expect(values[scenario.index]).to.equal(scenario.expected);
    });

});