import { RosiGameTypes } from '../actions/rosi-game';

const initialState = {
  hasStarted: false,
  lastCrashes: [],
  inGameBets: [],
  cashedOut: [],
  userBet: null,
  timeStarted: null,
  isCashedOut: false,
};

const initializeState = (action, state) => {
  return {
    ...state,
    lastCrashes: action.payload.lastCrashes,
  };
};

const setHasStarted = (action, state) => {
  return {
    ...state,
    hasStarted: true,
    timeStarted: action.payload.timeStarted,
  };
};

const setUserBet = (action, state) => {
  return {
    ...state,
    userBet: action.payload,
  };
};

const addLastCrash = (action, state) => {
  return {
    ...state,
    hasStarted: false,
    userBet: null,
    lastCrashes: [action.payload.crashFactor, ...state.lastCrashes],
    cashedOut: [
      ...state.inGameBets.filter(
        bet => bet.crashFactor <= action.payload.crashFactor
      ),
    ].map(bet => ({ ...bet, amount: bet.amount * bet.crashFactor })),
    inGameBets: [],
    isCashedOut: false,
  };
};

const addInGameBet = (action, state) => {
  return {
    ...state,
    inGameBets: [action.payload, ...state.inGameBets],
  };
};

const resetInGameBets = (action, state) => {
  return {
    ...state,
    inGameBets: [],
  };
};

const addCashedOut = (action, state) => {
  return {
    ...state,
    cashedOut: [action.payload, ...state.cashedOut],
  };
};

const resetCashedOut = (action, state) => {
  return {
    ...state,
    cashedOut: [],
  };
};

const cashedOut = (action, state) => {
  return {
    ...state,
    isCashedOut: true,
    userBet: null,
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RosiGameTypes.INITIALIZE_STATE:
      return initializeState(action, state);
    case RosiGameTypes.SET_HAS_STARTED:
      return setHasStarted(action, state);
    case RosiGameTypes.SET_USER_BET:
      return setUserBet(action, state);
    case RosiGameTypes.ADD_LAST_CRASH:
      return addLastCrash(action, state);
    case RosiGameTypes.ADD_IN_GAME_BET:
      return addInGameBet(action, state);
    case RosiGameTypes.RESET_IN_GAME_BETS:
      return resetInGameBets(action, state);
    case RosiGameTypes.ADD_CASHED_OUT:
      return addCashedOut(action, state);
    case RosiGameTypes.RESET_CASHED_OUT:
      return resetCashedOut(action, state);
    case RosiGameTypes.CASH_OUT:
      return cashedOut(action, state);
    default:
      return state;
  }
}
