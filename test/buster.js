var config = exports;

config["Browser tests"] = {
    rootPath: "../",
    environment: "browser",
    libs: [
        'test/lib/mootools-yui-compressed.js',
        'test/lib/es5-shim.min.js',
        'test/lib/syn.js'
    ],
    sources: [
        "Source/StrongPass.js"
    ],
    tests: [
        "test/tests/StrongPass-test.js"
    ]
};
