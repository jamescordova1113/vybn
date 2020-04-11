import types from '../types';

const initState = {
    selectedChannel: null,
    selectedChannelIndex: 0,
    selectedTrack: null,
    selectedTrackIndex: 0,
    soundObject: null,
    myChannels: null,
    playstate: false,
    profile: null
};

export const reducer = (state = initState, action) => {
    const { type, payload } = action;

    switch ( type ) {
        case types.SAVE_SELECTEDCHANNEL: {
            return {
                ...state,
                selectedChannel: payload
            }
        }
        case types.SAVE_PLAYSTATE: {
            return {
                ...state,
                playstate: payload
            }
        }
        case types.SAVE_SELECTEDTRACK: {
            return {
                ...state,
                selectedTrack: payload,
            }
        }
        case types.SAVE_SELECTEDTRACKINDEX: {
            return {
                ...state,
                selectedTrackIndex: payload,
            }
        }
        case types.SAVE_SELECTEDTRACKINDEX: {
            return {
                ...state,
                selectedTrackIndex: payload,
            }
        }
        case types.SAVE_SOUNDOBJECT: {
            return {
                ...state,
                soundObject: payload,
            }
        }
        case types.SAVE_MYCHANNELS: {
            return {
                ...state,
                myChannels: payload,
            }
        }
        case types.SAVE_SELECTEDCHANNELINDEX: {
            return {
                ...state,
                selectedChannelIndex: payload,
            }
        }
        case types.SAVE_PROFILE: {
            return {
                ...state,
                profile: payload,
            }
        }
        default: {
            return state;
        }
    }
}
