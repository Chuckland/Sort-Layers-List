QUnit.test("hasPositionPriority test", function(assert) {
    assert.equal(
        com.adordzheev.hasPositionPriority(
            { x: 0, y: 0, width: 10, height: 10 },
            { x: 11, y: 11, width: 10, height: 10 }),
        true
    );

    assert.equal(
        com.adordzheev.hasPositionPriority(
            { x: 0, y: 0, width: 10, height: 10 },
            { x: 11, y: 0, width: 10, height: 10 }),
        true
    );

    assert.equal(
        com.adordzheev.hasPositionPriority(
            { x: 0, y: 5, width: 10, height: 10 },
            { x: 11, y: 0, width: 10, height: 10 }),
        true
    );

    assert.equal(
        com.adordzheev.hasPositionPriority(
            { x: 0, y: 11, width: 10, height: 10 },
            { x: 11, y: 0, width: 10, height: 10 }),
        false
    );

    assert.equal(
        com.adordzheev.hasPositionPriority(
            { x: 11, y: 0, width: 10, height: 10 },
            { x: 0, y: 11, width: 10, height: 10 }),
        true
    );

    assert.equal(
        com.adordzheev.hasPositionPriority(
            { x: 11, y: 0, width: 10, height: 10 },
            { x: 0, y: 5, width: 10, height: 10 }),
        false
    );

    assert.equal(
        com.adordzheev.hasPositionPriority(
            { _name: "32-doc", x: 36, y: 353, width: 1038, height: 732},
            { _name: "30-badge-bg", x: 24, y: 365, width: 147, height: 34}),
        false,
        "30 vs 32"
    );
});

QUnit.test("intersectRect test", function(assert) {
    function intersect(r1, r2, expected, message) {
        var result = com.adordzheev.intersectRect(r1, r2);
        assert.equal(com.adordzheev.intersectRect(r1, r2), expected, message);
    };

    intersect({ x: 11, y: 11, width: 10, height: 10 }, { x: 0, y: 0, width: 10, height: 10 }, false);
    intersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 11, y: 11, width: 10, height: 10 }, false);
    intersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 0, y: 11, width: 10, height: 10 }, false);
    intersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 11, y: 0, width: 10, height: 10 }, false);

    intersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 0, y: 0, width: 10, height: 10 }, true);
    intersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 0, y: 0, width: 5, height: 5 }, true);
    intersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 9, y: 9, width: 5, height: 5 }, true);

    intersect({ x: 656, y: 228, width: 361, height: 184 }, { x: 536, y: 204, width: 180, height: 239 }, true);
    intersect({ x: 863, y: 74, width: 81, height: 40 }, { x: 536, y: 204, width: 180, height: 239 }, false);
    intersect({ x: 656, y: 228, width: 361, height: 184 }, { x: 863, y: 74, width: 81, height: 40 }, false);

    intersect({ name: "6-text-4", x: 670, y: 367, width: 16, height: 20 }, { name: "7-text-field-2", x: 702, y: 367, width: 60, height: 20 }, false, "6 vs 7");
    intersect({ name: "6-text-4", x: 670, y: 367, width: 16, height: 20 }, { name: "8-field-2", x: 694, y: 361, width: 190, height: 32 }, false, "6 vs 8");
    intersect({ name: "6-text-4", x: 670, y: 367, width: 16, height: 20 }, { name: "9-text-6", x: 892, y: 367, width: 93, height: 20 }, false, "6 vs 9");

    intersect({ _name: "32-doc", x: 36, y: 353, width: 1038, height: 732}, { _name: "30-badge-bg", x: 24, y: 365, width: 147, height: 34}, true, "30 vs 32");

    intersect({ _name: "31-badge-corner", x: 24, y: 399, width: 11, height: 8}, { _name: "30-badge-bg", x: 24, y: 365, width: 147, height: 34}, false, "31 vs 30");
});

QUnit.test("sortLayers test", function(assert) {
    assert.deepEqual(
        com.adordzheev.sortLayers([
            { x: 0, y: 0, width: 5, height: 5 },
            { x: 0, y: 0, width: 10, height: 10 }
        ]),
        [
            { x: 0, y: 0, width: 5, height: 5 },
            { x: 0, y: 0, width: 10, height: 10 }
        ]);

    assert.deepEqual(
        com.adordzheev.sortLayers([
            { x: 0, y: 0, width: 5, height: 5 },
            { x: 20, y: 20, width: 5, height: 5 }
        ]),
        [
            { x: 20, y: 20, width: 5, height: 5 },
            { x: 0, y: 0, width: 5, height: 5 }
        ]);

    assert.deepEqual(
        com.adordzheev.sortLayers([
            { x: 863, y: 74, width: 81, height: 40 },
            { x: 536, y: 204, width: 180, height: 239 },
            { x: 656, y: 228, width: 361, height: 184 }
        ]),
        [
            { x: 536, y: 204, width: 180, height: 239 },
            { x: 656, y: 228, width: 361, height: 184 },
            { x: 863, y: 74, width: 81, height: 40 }
        ]);

    assert.deepEqual(
        com.adordzheev.sortLayers([
            { name: "bg", x: 416, y: 244, width: 625, height: 172 },
            { name: "heading", x: 443, y: 254, width: 141, height: 35 },
            { name: "text-1", x: 443, y: 301, width: 598, height: 40 },
            { name: "text-2", x: 443, y: 367, width: 17, height: 20 },
            { name: "field-1", x: 472, y: 361, width: 190, height: 32 },
            { name: "text-3", x: 480, y: 367, width: 53, height: 20 },
            { name: "field-2", x: 694, y: 361, width: 190, height: 32 },
            { name: "text-5", x: 702, y: 367, width: 60, height: 20 },
            { name: "text-4", x: 670, y: 367, width: 165, height: 20 },
            { name: "text-6", x: 892, y: 367, width: 93, height: 20 }
        ]),
        [
            { name: "bg", x: 416, y: 244, width: 625, height: 172 },
            { name: "text-6", x: 892, y: 367, width: 93, height: 20 },
            { name: "field-2", x: 694, y: 361, width: 190, height: 32 },
            { name: "text-5", x: 702, y: 367, width: 60, height: 20 },
            { name: "text-4", x: 670, y: 367, width: 165, height: 20 },
            { name: "field-1", x: 472, y: 361, width: 190, height: 32 },
            { name: "text-3", x: 480, y: 367, width: 53, height: 20 },
            { name: "text-2", x: 443, y: 367, width: 17, height: 20 },
            { name: "text-1", x: 443, y: 301, width: 598, height: 40 },
            { name: "heading", x: 443, y: 254, width: 141, height: 35 }
        ]);

    assert.deepEqual(
        com.adordzheev.sortLayers([
            {name: "10-bg", x: 416, y: 244, width: 625, height: 172},
            {name: "5-field-1", x: 472, y: 361, width: 190, height: 32},
            {name: "6-text-4", x: 670, y: 367, width: 16, height: 20},
            {name: "8-field-2", x: 694, y: 361, width: 190, height: 32},
            {name: "1-heading", x: 443, y: 254, width: 141, height: 35},
            {name: "2-text-1", x: 443, y: 301, width: 598, height: 40},
            {name: "3-text-2", x: 443, y: 367, width: 17, height: 20},
            {name: "9-text-6", x: 892, y: 367, width: 93, height: 20},
            {name: "4-text-field-1", x: 480, y: 367, width: 53, height: 20},
            {name: "7-text-field-2", x: 702, y: 367, width: 60, height: 20}
        ]),
        [
            { name: "10-bg", x: 416, y: 244, width: 625, height: 172 },
            { name: "9-text-6", x: 892, y: 367, width: 93, height: 20 },
            { name: "8-field-2", x: 694, y: 361, width: 190, height: 32 },
            { name: "7-text-field-2", x: 702, y: 367, width: 60, height: 20 },
            { name: "6-text-4", x: 670, y: 367, width: 16, height: 20 },
            { name: "5-field-1", x: 472, y: 361, width: 190, height: 32 },
            { name: "4-text-field-1", x: 480, y: 367, width: 53, height: 20 },
            { name: "3-text-2", x: 443, y: 367, width: 17, height: 20 },
            { name: "2-text-1", x: 443, y: 301, width: 598, height: 40 },
            { name: "1-heading", x: 443, y: 254, width: 141, height: 35 }
        ]);

    assert.deepEqual(
        com.adordzheev.sortLayers([
            {_name: "33-bg", x: 0, y: 314, width: 1400, height: 826},
            {_name: "32-doc", x: 36, y: 353, width: 1038, height: 732},
            {_name: "30-badge-bg", x: 24, y: 365, width: 147, height: 34},
            {_name: "31-badge-corner", x: 24, y: 399, width: 11, height: 8},
            {_name: "29-badge-text", x: 37, y: 372, width: 122, height: 19}
        ]),
        [
            {_name: "33-bg", x: 0, y: 314, width: 1400, height: 826},
            {_name: "32-doc", x: 36, y: 353, width: 1038, height: 732},
            {_name: "31-badge-corner", x: 24, y: 399, width: 11, height: 8},
            {_name: "30-badge-bg", x: 24, y: 365, width: 147, height: 34},
            {_name: "29-badge-text", x: 37, y: 372, width: 122, height: 19}
        ]);
});
