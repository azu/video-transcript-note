// LICENSE : MIT
"use strict";
import nlp from "nlp_compromise";
import dict from "./dctionaryCreator";
function transformGeneric(tag, word) {
    switch (tag) {
        //"verb":
        case "VB" :
        case "VBD" :
        case "VBN" :
        case "VBP" :
        case "VBZ" :
        case "VBF" :
        case "CP" :
        case "VBG" :
            return nlp.verb(word).conjugate().infinitive;
        //"adjective":
        case "JJ" :
        case "JJR" :
        case "JJS" :
            return word;
        // "adverb":
        case "RB" :
        case "RBR" :
        case "RBS" :
            return word;
        // "noun":
        case "NN" :
        case "NNP" :
        case "NNPA" :
        case "NNAB" :
        case "NNPS" :
        case "NNS" :
        case "NNO" :
        case "NG" :
        case "PRP" :
        case "PP" :
            return nlp.noun(word).singularize();
        // "glue":
        case "FW" :
        case "IN" :
        case "MD" :
        case "CC" :
        case "DT" :
        case "UH" :
        case "EX" :
        // "value":
        case "CD" :
        case "DA" :
        case "NU" :
            return word;
    }
    return word;
}
function normalize(word) {
    var tag = nlp.pos(word).tags()[0];
    var result = transformGeneric(tag, word);
    // console.log(tag + " : " + word + " => " + result);
    return result;
}
/**
 * translate word => result [translated]
 * @param {string} word
 * @returns {Array}
 */
export function translateWord(word) {
    var dictionary = dict();
    var translated = dictionary[normalize(word)];
    // console.log(word + " => " + translated);
    if (!translated) {
        return [];
    }
    return translated.map(function (text) {
        return text;
    });
}