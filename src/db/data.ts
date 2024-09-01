import { promises as fs } from 'fs';
//#region TS
export enum Mode {
    Color,
    Gradient,
    Effect
}

export interface IDevice {
    id: number,
    type: number,
    name: string,
    ip: string,
    effects: string[],
    status: number,
    mode: Mode,
    parameter: string,
    brightness: number,
}

export interface IScene {
    id: number,
    name: string,
    fadeTime: number,
    dimmerFadeTime: number,
    devices: IDevice[],
}
