#!/usr/bin/env python

import os
import sys
import random
import string

# types of names:
# one word name -> often spiritually related
# x of y -> (adjective'd) noun of (adjective'd) noun
# x y -> (adjective'd) adjective noun

nouns = (
    'birds', 'miles', 'fire', 'bullets', 'love', 'funk', 'joy', 'tears',
    'doves',
)

adjectives = (
    'celestial', 'terrestrial', 'sapphire', 'pure', 'divine', 'altruistic',
    'ruby', 'solar', 'Martian', 
)

spiritual = (
    'Hope', 'Sanctuary', 'Meditation', 'Resolution', 'Faith', 'Glory',
    'Devotion',
)

def XYGenerator():
    adjective1 = random.choice(adjectives)
    adjective2 = ""
    noun = random.choice(nouns)

    if random.random() >= 0.5:
        adjective2 = random.choice(adjectives)

    return ' '.join([adjective1, adjective2, noun])

def XofYGenerator():
    """Generates 'X of Y' style song names.
    May implement adjectives. If one adjective is chosen,
    another is highly likely."""
    adjective1 = ""
    adjective2 = ""

    noun1 = random.choice(nouns)
    noun2 = random.choice(nouns)

    # decide if it's going to be adjective-y
    if random.random() >= 0.625:
        if random.random() >= 0.5:
            adjective1 = random.choice(adjectives)
            if random.random() >= 0.25:
                adjective2 = random.choice(adjectives)
        else:
            adjective2 = random.choice(adjectives)
            if random.random() >= 0.25:
                adjective1 = random.choice(adjectives)
    
    return ' '.join([adjective1, noun1, 'of', adjective2, noun2])



def OneWordGenerator():
    return random.choice(spiritual)

# dictionary of various generators
generators = {
    'x of y': XofYGenerator, 'one word': OneWordGenerator, 'x y': XYGenerator
}

def generateSongName(style=None):
    """
    Generates a Mahavishnu John band name.
    Optional style argument can be one of
    'one word', 'x of y', or 'x y'
    """

    if style:
        generator = generators[style]
    else:
        generator = random.choice(generators.values())

    song_title = generator()
    return string.capwords(song_title)

if __name__ == '__main__':
    import optparse

    parser = optparse.OptionParser()
    parser.add_option("-n", "--amount", type="int", dest="amount",
        default=1, help="amount of names to print", metavar="FILE")
    options, args = parser.parse_args()

    amount = options.amount
    for name in xrange(amount):
        print(generateSongName())

