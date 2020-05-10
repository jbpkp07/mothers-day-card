"use strict";
let slideCurrentIndex = 0;
const slideSelectorRoot = "div.slide";
const slideSelectors = [
    `${slideSelectorRoot}.supergirl`,
    `${slideSelectorRoot}.chair`,
    `${slideSelectorRoot}.knjr`,
    `${slideSelectorRoot}.grandma`,
    `${slideSelectorRoot}.grandpa`,
    `${slideSelectorRoot}.park`,
    `${slideSelectorRoot}.burp`,
    `${slideSelectorRoot}.milk`
];
const nextSlideBtnElement = $("#nextBtn");
async function slideFadeIn(slideSelector) {
    return new Promise(async (resolve) => {
        const slideElement = $(slideSelector);
        await slideElement.fadeTo(0, 0).promise();
        await slideElement.fadeTo(1000, 1).promise();
        resolve();
    });
}
async function slideFadeOut(slideSelector) {
    return new Promise(async (resolve) => {
        const slideElement = $(slideSelector);
        await slideElement.fadeTo(500, 0).promise();
        await slideElement.hide().promise();
        resolve();
    });
}
function incrementSlide() {
    if (slideCurrentIndex === slideSelectors.length - 1) {
        slideCurrentIndex = 0;
    }
    else {
        slideCurrentIndex++;
    }
}
function setNextBtnText() {
    if (slideCurrentIndex < slideSelectors.length - 1) {
        nextSlideBtnElement.text("Next >>>");
    }
    else {
        nextSlideBtnElement.text("Start Over >>>");
    }
}
async function listenForNextSlide() {
    return new Promise((resolve) => {
        nextSlideBtnElement.one("click", resolve);
    });
}
async function nextSlide() {
    setNextBtnText();
    const currentSlideSelector = slideSelectors[slideCurrentIndex];
    await slideFadeIn(currentSlideSelector);
    await listenForNextSlide();
    await slideFadeOut(currentSlideSelector);
    incrementSlide();
    nextSlide();
}
jQuery(nextSlide);
