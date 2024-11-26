import * as Styled from "./styles.ts";
import { gsap } from "gsap";
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import {useEffect} from "react";
import eyeLogo from "../../assets/eyeLogo.png";
import eyeLogoFrame from "../../assets/eyeLogoFrame.png";

gsap.registerPlugin(MotionPathPlugin);

const MainPage = () => {
    useEffect(() => {
        gsap.to(".eye-logo", {
            duration: 1,
            motionPath: {
                path: "#path",
                align: "#path",
                alignOrigin: [0.5, 0.6],
            },
            repeat: -1,
            yoyo: true, // цикличность анимации
            repeatDelay: 1.5, // Задержка перед следующим повторением
            ease: "power3.in" // Плавность анимации
        });
    }, []);

    return (
        <div className="container" style={{position: 'relative', width: '150px', height: '150px'}}>
            <img className="eye-logo-frame" style={{width: '100px', position: 'absolute'}} src={eyeLogoFrame}
                 alt="Frame"/>
            <img className="eye-logo" style={{width: '47px', height: 'auto', position: 'absolute'}} src={eyeLogo}
                 alt="Logo"/>
            <svg width="0" height="0">
                <path id="path" d="M-14,11 L14,-8"/>
            </svg>
        </div>
    )
}

export default MainPage;