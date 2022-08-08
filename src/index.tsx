import { SMM } from '@crankshaft/types';
import {ComponentChild, render} from "preact";
import React from "preact/compat";
import {Section} from "./deck-components/section";

import {Toggle} from "./deck-components/toggle";

const PLUGIN_ID = "spotify-crankshaft";
const TITLE = "Spotify Controller";

export const load = (smm: SMM) => {
    console.info('Spotify Crankshaft loaded!');

    const leadingIcon: ComponentChild = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none"><path d="M5.63636 13L10 7H13V29H10L5.63636 23H2V13H5.63636Z" fill="currentColor"></path><path d="M24.7279 30.7279C31.7573 23.6985 31.7573 12.3015 24.7279 5.27209L27.5563 2.44366C36.1479 11.0352 36.1479 24.9648 27.5563 33.5564L24.7279 30.7279Z" fill="currentColor"></path><path d="M20.4853 9.51471C25.1716 14.201 25.1716 21.799 20.4853 26.4853L23.3137 29.3137C29.5621 23.0653 29.5621 12.9347 23.3137 6.68628L20.4853 9.51471Z" fill="currentColor"></path><path d="M16.2426 13.7574C18.5858 16.1005 18.5858 19.8995 16.2426 22.2426L19.071 25.0711C22.9763 21.1658 22.9763 14.8342 19.071 10.9289L16.2426 13.7574Z" fill="currentColor"></path></svg>);

    smm.InGameMenu.addMenuItem({
        id: PLUGIN_ID,
        title: TITLE,
        render: async (smm: SMM, root: HTMLElement) => {
            render(
                (
                    <Section title="Test">
                        <Toggle label="Test" leadingIcon={leadingIcon} onClick={async (value) => console.info(value)}/>
                    </Section>
                ),
                root
            )
        }
    });
};

export const unload = (smm: SMM) => {
    console.info('Spotify Crankshaft unloaded!');
    smm.InGameMenu.removeMenuItem(PLUGIN_ID);
};
