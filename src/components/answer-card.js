import React from 'react';
import PT from 'prop-types';
import {Entity} from 'aframe-react';

function FlashCard ({pos, img, term, definition, updateCurrentCard, correct}) {


    function mouseEnter (e) {
        console.log('mouse enter', e.detail.intersection)
        e.target.emit('zoomIn');
        updateCurrentCard(e.target);
    }
    
    function mouseLeave (e) {
        console.log('mouse leave', pos, e.detail.intersection)
        e.target.emit('zoomOut')
    }

    return (
        <Entity
            className="answerCard"
            id={correct ? 'correctAnswer' : 'wrongAnswer'}
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
            <a-animation attribute="rotation"
                begin='spin'
                dur="1000"
                from="0 0 0"
                to="0 0 360"></a-animation>
            <Entity
                geometry={{primitive: 'plane', width: 1.4, height: 1.4}}
                material={{src: img ? img : '#cardboard'}}
                position={{x: 0, y: 0, z: -0.01}}
                text={{value: term, align: 'center', color: 'black', wrapCount: '15', font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt'}}>
            </Entity>
            <Entity
                className="answerCard"
                geometry={{primitive: 'plane', width: 1.4, height: 1.4}}
                material={{src: '#paper', color: correct ? 'green' : 'red' }}
                position={{x: 0, y: 0, z: -0.01}}
                rotation="0 180 0"
                text={{value: definition, align: 'center', color: 'black', wrapCount: '15', font: 'https://cdn.aframe.io/fonts/Exo2Bold.fnt'}}>
            </Entity>
        </Entity>
    );
}

FlashCard.propTypes = {
    pos: PT.object.isRequired
}

export default FlashCard;