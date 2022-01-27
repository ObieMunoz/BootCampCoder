import React from 'react';

export function CreateMailToLink() {
    return RenderMailToLink()

    function RenderMailToLink() {
        return <a style={{ color: 'gray', textDecoration: 'none' }} href="mailto:obiemunozjr@gmail.com">
            BootCampCoder
        </a>;
    }
}
