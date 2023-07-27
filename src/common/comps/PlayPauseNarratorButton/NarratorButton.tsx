import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";
import {  useNarratorContext } from "../../../App";
import { stopNarration } from "../../helpers/VoiceNarrator";
import "./narratorButton.css";

type NarratorButtonType = {
    onUnMute: () => void;
}


const NarratorButton = (props: NarratorButtonType) => {
    const muteIconValue = "bi-volume-mute-fill";
    const playIconValue = "bi-volume-up-fill";
    const {mute, setMute} = useNarratorContext();
    console.log("mute in NarratorButton load = " + mute )
    const [icon, setIcon] = useState(mute ? muteIconValue : playIconValue);
    

    const muteNarratorTooltip = (props:any) => (
        <Tooltip {...props}>Mute narrator</Tooltip>
    );

    const unmuteNarratorTooltip = (props:any) => (
        <Tooltip {...props}>Unmute narrator</Tooltip>
    );

    const onPlayPauseButtonClick = () => {
        if(mute) {
            //unmute action
            setIcon(playIconValue);
            props.onUnMute();
        } else {
            //mute action
            setIcon(muteIconValue);
            stopNarration();
        }
        setMute(!mute);
    }

    return (
        <OverlayTrigger placement='bottom' overlay={!mute && muteNarratorTooltip || unmuteNarratorTooltip}>
            <button className="card-btn card-btn-mute" onClick={onPlayPauseButtonClick}>
                <i className={icon}></i>
            </button>
        </OverlayTrigger>
    );
}

export default NarratorButton;