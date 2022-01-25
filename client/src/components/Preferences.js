import React from 'react';
import WhoAmI from './WhoAmI';
import preferencesBanner from '../assets/preferences.png'

export default function Preferences() {
    return (
        <>
            {/* <h2>Preferences</h2> */}
            <img src={preferencesBanner} alt="preferences banner" style={{ display: 'flex', margin: '0 auto', width: '60vw' }} />
            <WhoAmI />
        </>
    );
}