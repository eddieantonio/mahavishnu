
// Some utility functions


function choiceOf(list) {
    return list[parseInt(Math.random() * list.length, 10)];
}

// A linear congruential generator with state -- works better than
// Javascript's built-in PRNG ಠ_ಠ
rand.today = new Date();
rand.seed = rand.today.getTime();

function rand() {
    rand.seed = (rand.seed * 9301 + 49297) % 233280;
    return rand.seed / (233280.0);
}


// method borrowed from http://individed.com/code/to-title-case/
String.prototype.toTitleCase = function() {
    return this.replace(/([\w&`'‘’"“.@:\/\{\(\[<>_]+-? *)/g,
      function(match, p1, index, title) {
        // match common words AFTER the first character (So "The Beatles"
        // doesn't turn into "the Beatles") V-- Um... that's... specific.
        if (index > 0 && title.charAt(index - 2) !== ":" &&
        	match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1)
            return match.toLowerCase();
        if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1)
            return match.charAt(0) + match.charAt(1).toUpperCase()
                + match.substr(2);
        if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 || 
        	title.substring(index - 1, index + 1).search(/[\])}]/) > -1)
            return match;
        return match.charAt(0).toUpperCase() + match.substr(1);
      });
};

random = rand; // choose my PRNG over Javascript's default...

// the actual code:

function XYGenerator() {
    var adjective1 = choiceOf(adjectives);
    var adjective2 = "";

    var noun = "";
    noun = choiceOf(nouns);

    if (random() >= 0.5) {
        adjective2 = choiceOf(adjectives);
    }

    var the = ""
    if (random() >= 0.9) {
        the = "the"; // amazing line out-of-context and in context!
    }
    
    var ret = [the, adjective1, adjective2, noun];

    return ret.join(' ');
}

function XofYGenerator() {
    var adjective1 = "";
    var adjective2 = "";

    var noun1 = choiceOf(nouns);
    var noun2 = choiceOf(nouns);

    if (random() >= 0.625) {
        // I have no idea why this code is nested like that. I should have
        // been more into comments back when I made this...
        if (random() >= 0.5) {
            adjective1 = choiceOf(adjectives);
            if (random() >= 0.625) {
                adjective2 = choiceOf(adjectives);
            }
        } else {
            adjective2 = choiceOf(adjectives);
            if (random() >= 0.25) {
                adjective1 = choiceOf(adjectives);
            }
        }
    }
    
    var the1, the2;

    if (random() >= 0.80) {
        the1 = "the"; // heh heh
    }
    if (random() >= 0.80) {
        the2 = "the"; // heh heh heh
    }

    var ret = [the1, adjective1, noun1, 'of', the2, adjective2, noun2];

    return ret.join(' ');

}


function OneWordGenerator() {
    return choiceOf(spiritual);
}

var generators = [OneWordGenerator, XYGenerator, XofYGenerator];

function generateSongName() {
    var generator = choiceOf(generators);
    return generator().toTitleCase();

}


