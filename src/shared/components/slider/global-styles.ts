import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    .horizontal-slider {
        width: 100%;
        max-width: 500px;
        height: 50px;
    }
    .vertical-slider {
        height: 380px;
        width: 50px;
    }
    .example-thumb {
        font-size: 0.9em;
        text-align: end;
        background-color: #090979;
        color: white;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 3px solid #00d4ff;
    }
    // .example-thumb.active {
    //     background-color: grey;
    // }
    .example-track {
        position: relative;
        background: #ddd;
        background: #090979;
    }
    .example-track.example-track-1 {
        background: blue;
        background: linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%);
    }
    .example-track.example-track-2 {
        background: #0f0;
    }
    .example-mark {
        width: 8px;
        height: 8px;
        border: 2px solid #000;
        background-color: #fff;
        cursor: pointer;
        border-radius: 50%;
        vertical-align: middle;
    }
    .horizontal-slider .example-track {
        top: 5px;
        height: 10px;
    }
    .horizontal-slider {
        top: 1px;
        width: 500px;
        height: 48px;
        line-height: 38px;
    }
    .horizontal-slider .example-mark {
        margin: 0 calc(25px - 6px);
        bottom: calc(50% - 6px);
    }
    .vertical-slider {
        left: 1px;
        width: 48px;
        line-height: 40px;
        height: 50px;
    }
    .vertical-slider .example-track {
        left: 20px;
        width: 10px;
    }
    .vertical-slider .example-mark {
        margin: calc(25px - 6px) 0;
        left: calc(50% - 6px);
    }
`;
