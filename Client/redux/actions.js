import types from './types';
import _ from 'lodash';

export const saveSelectedChannel = params => {
    return {
        type: types.SAVE_SELECTEDCHANNEL,
        payload: params
    }
};

export const savePlayState = params => {
    return {
        type: types.SAVE_PLAYSTATE,
        payload: params
    }
};

export const saveSelectedTrack = params => {
    return {
        type: types.SAVE_SELECTEDTRACK,
        payload: params
    }
};

export const saveSelectedTrackIndex = params => {
    return {
        type: types.SAVE_SELECTEDTRACKINDEX,
        payload: params
    }
};

export const saveSoundObject = params => {
    return {
        type: types.SAVE_SOUNDOBJECT,
        payload: params
    }
};

export const saveMyChannels = params => {
    return {
        type: types.SAVE_MYCHANNELS,
        payload: params
    }
};

export const saveSelectedChannelIndex = params => {
    return {
        type: types.SAVE_SELECTEDCHANNELINDEX,
        payload: params
    }
};

export const saveProfile = params => {
    return {
        type: types.SAVE_PROFILE,
        payload: params
    }
};
