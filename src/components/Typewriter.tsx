/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useRef, useState } from "react";

enum TypewriterState {
    TYPING,
    DELAYING,
    DELETING,
}


export default function TypewriterIntro(
    { typeSpeed, deleteSpeed, delaySpeed, sentences }
        : { typeSpeed: number, deleteSpeed: number, delaySpeed: number, sentences: string[] }) {

    let currentStentenceIndex = useRef(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [typewriterStatus, setTypewriterStatus] = useState(TypewriterState.TYPING);

    let currentWord = sentences[currentStentenceIndex.current];
    let shownWord = currentWord.substring(0, currentLetterIndex);

    useEffect(() => {
        if (typewriterStatus === TypewriterState.TYPING) {
            if (currentLetterIndex < currentWord.length) {
                setTimeout(() => {
                    setCurrentLetterIndex(currentLetterIndex + 1);
                }, typeSpeed);
            }
            else {
                setTypewriterStatus(TypewriterState.DELAYING);
            }
        }
        else if (typewriterStatus === TypewriterState.DELETING) {
            if (currentLetterIndex > 0) {
                setTimeout(() => {
                    setCurrentLetterIndex(currentLetterIndex - 1);
                }, deleteSpeed);
            }
            else {
                setTypewriterStatus(TypewriterState.TYPING);
                currentStentenceIndex.current = (currentStentenceIndex.current + 1) % sentences.length;
            }
        }
        else if (typewriterStatus === TypewriterState.DELAYING) {
            setTimeout(() => {
                setTypewriterStatus(TypewriterState.DELETING);
            }, delaySpeed);
        }
    }, [currentLetterIndex, typewriterStatus]);

    return (
        <span>
            {shownWord}
            <span className={"relative -left-1 inline-block w-0 animate-blink"}>|</span>
        </span>
    );
}
