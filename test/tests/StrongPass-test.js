buster.testRunner.timeout = 3000;

buster.testCase("Password meter tests > ", {
    setUp: function() {
        this.passes = {
            tooShort: "aab",
            barelyPass: "aaBa"
        };

        this.element = new Element("div#Wrap", {
            html: [
                '<input id="password" type="password" />'
            ].join("")
        }).inject(document.body);

    },

    tearDown: function() {
        this.element.destroy();
    },

    "Expect an instance to be created and fire ready": function(done) {
        this.pass = new StrongPass('password', {
            onReady: function() {
                buster.assert(true);
                done();
            }
        });
    },

    "Expect to create an element where strength is shown": function() {
        this.pass = new StrongPass('password');
        buster.assert.equals(typeOf(this.pass.stbox), 'element');
    }
});

