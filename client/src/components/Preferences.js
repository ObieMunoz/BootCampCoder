import React from 'react';
import WhoAmI from './WhoAmI';
import preferencesBanner from '../assets/bcc-preferences-30-jacks-bar-font.png'

export default function Preferences() {
    return (
        <>
            {/* <h2>Preferences</h2> */}
            <img src={preferencesBanner} alt="preferences banner" style={{ display: 'flex', margin: '0 auto' }} />
            <WhoAmI />
        </>
    );
}