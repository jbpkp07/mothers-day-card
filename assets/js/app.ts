"use strict";

let slideCurrentIndex: number = 0;

const slideSelectorRoot: string = "div.slide";

const slideSelectors: string[] = [

    `${slideSelectorRoot}.supergirl`,
    `${slideSelectorRoot}.chair`,
    `${slideSelectorRoot}.knjr`,
    `${slideSelectorRoot}.grandma`,
    `${slideSelectorRoot}.grandpa`,
    `${slideSelectorRoot}.park`,
    `${slideSelectorRoot}.burp`,
    `${slideSelectorRoot}.milk`
];

const nextSlideBtnElement: JQuery = $("#nextBtn");

async function slideFadeIn(slideSelector: string): Promise<void> {

    return new Promise(async (resolve: () => void): Promise<void> => {

        const slideElement: JQuery = $(slideSelector);

        await slideElement.fadeTo(0, 0).promise();

        await slideElement.fadeTo(1000, 1).promise();

        resolve();
    });
}

async function slideFadeOut(slideSelector: string): Promise<void> {

    return new Promise(async (resolve: () => void): Promise<void> => {

        const slideElement: JQuery = $(slideSelector);

        await slideElement.fadeTo(500, 0).promise();

        await slideElement.hide().promise();

        resolve();
    });
}

function incrementSlide(): void {

    if (slideCurrentIndex === slideSelectors.length - 1) {

        slideCurrentIndex = 0;
    }
    else {

        slideCurrentIndex++;
    }
}

function setNextBtnText(): void {

    if (slideCurrentIndex < slideSelectors.length - 1) {

        nextSlideBtnElement.text("Next >>>");
    }
    else {

        nextSlideBtnElement.text("Start Over >>>");
    }
}

async function listenForNextSlide(): Promise<void> {

    return new Promise((resolve: () => void): void => {

        nextSlideBtnElement.one("click", resolve);
    });
}

async function nextSlide(): Promise<void> {

    setNextBtnText();

    const currentSlideSelector: string = slideSelectors[slideCurrentIndex];

    await slideFadeIn(currentSlideSelector);

    await listenForNextSlide();

    await slideFadeOut(currentSlideSelector);

    incrementSlide();

    nextSlide();
}

jQuery(nextSlide);
