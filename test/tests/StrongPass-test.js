buster.testRunner.timeout = 3000;

buster.testCase("Password meter tests > ", {
    setUp: function() {
        this.passes = {
            tooShort: "aab",
            barelyPass: new Array(StrongPass.prototype.options.minChar + 1).join("a")
        };

        this.element = new Element("div#Wrap", {
            html: [
                '<input id="password" type="password" />'
            ].join("")
        }).inject(document.body);

    },

    tearDown: function() {
        this.pass.element.removeEvents(this.pass.eventObj);
        this.pass = null;
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
    },

    "Expect to fail on the short pass": function(done) {
        this.pass = new StrongPass('password', {
            onFail: function() {
                buster.assert(true);
                done();
            },
            onPass: function() {
                buster.assert(false);
                done();
            }
        });

        this.pass.element.set('value', this.passes.tooShort);
        this.pass.runPassword();

    },

    "Expect to fail on the min length pass with very weak score": function(done) {
        this.pass = new StrongPass('password', {
            onPass: function() {
                buster.assert(false);
                done();
            },
            onFail: function() {
                buster.assert(true);
                done();
            }
        });

        this.pass.element.set('value', this.passes.barelyPass);
        this.pass.runPassword();

    },

    "Expect to check and pass on key events (Syn)": function(done) {
        this.pass = new StrongPass('password', {
            onPass: function() {
                buster.assert(true);
                done();
            }
        });

        Syn.type('chelsea123', this.pass.element);

    },

    "Expect a banned password to fire an onBanned event": function(done) {
        var banned = StrongPass.prototype.bannedPasswords.getRandom();

        this.pass = new StrongPass('password', {
            onBanned: function(pass) {
                buster.assert.equals(pass, banned);
                done();
            }
        });

        this.pass.element.set('value', banned);
        this.pass.runPassword();
    }

});