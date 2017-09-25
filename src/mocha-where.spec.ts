import * as chai from 'chai';
import {where} from "./mocha-where";
const expect = chai.expect;

describe("where()", () => {

    where([
        ['prime', 'expected'],
        [2,        4        ],
        [3,        6        ],
        [5,        10       ],
        [7,        14       ],
        [11,       22       ]
    ])
    .describe("#prime multiplied by 2 is #expected", (scenario: any) => {
        it('assertion', () => expect(scenario.prime * 2).to.equal(scenario.expected));
    });

    where([
        ['prime', 'expected'],
        [2,        1        ],
        [3,        1.5      ],
        [5,        2.5      ],
        [7,        3.5      ],
        [11,       5.5      ]
    ])
    .it("#prime divided by 2 is #expected", (scenario: any) => {

        expect(scenario.prime / 2).to.equal(scenario.expected);
    });

});