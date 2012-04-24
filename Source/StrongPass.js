/*
 ---

 name: strong.pass.js

 description: checks password strength of a string

 authors: Dimitar Christoff

 license: MIT-style license.

 version: 1.02

 requires:
 - Core/String
 - Core/Element
 - Core/Class

 provides: StrongPass

 ...
 */

(function() {

    var StrongPass = this.StrongPass = new Class({

        Implements: [Options, Events],

        options: {
            minChar: 4, // too short while less than this
            passIndex: 2, // Weak

            // output verdicts, colours and bar %
            verdicts: [
                'Too Short',
                'Very weak',
                'Weak',
                'Good',
                'Strong',
                'Very strong'
            ],
            colors: [
                '#ccc',
                '#500',
                '#800',
                '#f60',
                '#050',
                '#0f0'
            ],
            width: [
                '0%',
                '10%',
                '30%',
                '60%',
                '80%',
                '100%'
            ],
            // tweak scores here
            scores: [
                10,
                15,
                25,
                35
            ],
            // styles
            passStrengthZen: 'div.pass-container',
            passbarClassZen: 'div.pass-bar', // css controls
            passbarHintZen: 'div.pass-hint',

            // output
            render: true, // it can just report for your own implementation
            injectTarget: null,
            injectPlacement: 'after'
        },

        initialize: function(element, options) {
            this.setOptions(options)
            this.element = document.id(element)
            this.options.render && this.createBox()
            this.attachEvents()
            this.fireEvent('ready')
        },

        attachEvents: function() {
            // only attach events once so freshen
            this.eventObj && this.element.removeEvents(this.eventObj)
            this.element.addEvents(this.eventObj = {
                keyup: this.runPassword.bind(this)
            })

        },

        createBox: function() {
            var width = this.element.getSize().x,
                o = this.options

            this.stbox = new Element(o.passStrengthZen, {
                styles: {
                    width: width
                }
            })

            this.stdbar = new Element(o.passbarClassZen, {
                styles: {
                    width: width - 2
                }
            }).inject(this.stbox)

            this.txtbox = new Element(o.passbarHintZen).inject(this.stbox)

            this.stbox.inject((document.id(o.injectTarget) || this.element))
        },

        runPassword: function() {
            var password = this.element.get('value'),
                range = this.checkPassword(password),
                index = 0,
                o = this.options,
                s = Array.clone(o.scores),
                verdict

            if (range != -200) {
                if (range < 0 && range > -199) {
                    index = 0;
                }
                else {
                    s.push(range);
                    s.sort(function (a, b) {
                        return a - b
                    });
                    index = s.indexOf(range) + 1;
                }
            } else {
                range = 0
            }

            verdict = o.verdicts[index] || o.verdicts.getLast()

            if (o.render) {
                this.txtbox.set("text", "Password strength: " + verdict)
                this.stdbar.setStyles({
                    width:o.width[index] || o.width.getLast(),
                    background:o.colors[index] || o.colors.getLast()
                })
            }

            // events
            this.fireEvent(['fail', 'pass'][+(this.passed = o.verdicts.indexOf(verdict) >= o.passIndex)], [index, verdict])
        },

        checks: [
            /* alphaLower */ {
                re: /[a-z]/,
                score: 1
            },
            /* alphaUpper */ {
                re: /[a-z]/,
                score: 5
            },
            /* mixture of upper and lowercase */ {
                re: /([a-z].*[A-Z])|([A-Z].*[a-z])/,
                score: 2
            },
            /* threeNumbers */ {
                re: /(.*[0-9].*[0-9].*[0-9])/,
                score: 7
            },
            /* special chars */ {
                re: /.[!,@,#,$,%,^,&,*,?,_,~]/,
                score: 5
            },
            /* multiple special chars */ {
                re: /(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/,
                score: 7
            },
            /* all together now, does it look nice? */ {
                re: /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/,
                score: 3
            }
        ],

        checkPassword: function(pass) {
            var score = 0,
                minChar = this.options.minChar,
                len = pass.length,
                diff = len - minChar;

            (diff < 0 && (score -= 100)) || (diff >= 5 && (score += 18)) || (diff >= 3 && (score += 12)) || (diff == 2 && (score += 6))

            Array.each(this.checks, function(check) {
                pass.match(check.re) && (score+= check.score)
            })

            // bonus for length per char
            score && (score += len)
            return score;
        }
    })

}()); // change to any object / ns
