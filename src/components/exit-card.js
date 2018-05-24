import React from 'react';
import PT from 'prop-types';
import {Entity} from 'aframe-react';

function FlashCard ({pos, img, exitCube, updateCurrentCard}) {


    function mouseEnter (e) {
        console.log('mouse enter', e.detail.intersection)
        e.target.emit('zoomIn');
        updateCurrentCard(e.target);
    }
    
    function mouseLeave (e) {
        console.log('mouse leave', pos, e.detail.intersection)
        e.target.emit('zoomOut')
    }

    // let cardFlipped = false;

    // function mouseClick (e) {
    //     console.log('mouse click', e.detail.intersection)
    //     cardFlipped ? e.target.emit('flipBack') : e.target.emit('flipOver')
    //     cardFlipped = !cardFlipped
    // }

    return (
        <Entity
            className="exitCard"
            geometry={{primitive: 'plane', width: 1.4, height: 1.4}}
            material={{opacity: 0}}
            position={pos}
            events={{click: mouseEnter, mouseleave: mouseLeave}}>
            <a-animation attribute="position"
                begin='zoomIn'
                dur="200"
                to={`${pos.x} ${pos.y} ${pos.z +0.18}`}></a-animation>
            <a-animation attribute="position"
                begin='zoomOut'
                dur="200"
                to={`${pos.x} ${pos.y} ${pos.z}`}></a-animation>
            <a-animation attribute="rotation"
                begin='flipOver'
                dur="500"
                from="0 0 0"
                to="0 180 0"></a-animation>
            <a-animation attribute="rotation"
                begin='flipBack'
                dur="500"
                from="0 180 0"
                to="0 360 0"></a-animation>
            <Entity
                geometry={{primitive: 'plane', width: 1.4, height: 1.4}}
                material={{src: '#cardboard'}}
                position={{x: 0, y: 0, z: -0.01}}>
            </Entity>
            <a-text value="EXIT" align="center" font='https://cdn.aframe.io/fonts/Exo2Bold.fnt'></a-text>
            <Entity
                className="exitConfirm"
                geometry={{primitive: 'plane', width: 1.2, height: 0.5}}
                material={{src: '#cardboard', color: 'red'}}
                position={{x: 0, y: -0.35, z: -0.1}}
                rotation="0 180 0"
                events={{mousedown: exitCube}}>
                <a-text value="EXIT" align="center" font='https://cdn.aframe.io/fonts/Exo2Bold.fnt'></a-text>
            </Entity>
            <Entity
                className="exitCard"
                geometry={{primitive: 'plane', width: 1.2, height: 0.5}}
                material={{src: '#cardboard', color: 'green'}}
                position={{x: 0, y: 0.35, z: -0.1}}
                rotation="0 180 0">
                <a-text value="CANCEL" align="center" font='https://cdn.aframe.io/fonts/Exo2Bold.fnt'></a-text>
            </Entity>
            <Entity
                className="exitCard"                
                geometry={{primitive: 'plane', width: 1.4, height: 1.4}}
                material={{src: '#cardboard'}}
                position={{x: 0, y: 0, z: -0.01}}
                rotation="0 180 0">
            </Entity>
        </Entity>
    );
}

FlashCard.propTypes = {
    pos: PT.object.isRequired
}

export default FlashCard;