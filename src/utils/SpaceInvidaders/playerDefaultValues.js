const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

export const PLAYER_WIDTH = 50;
export const PLAYER_HEIGHT = 60;

export const initialPlayerPositionX = screenWidth / 2 - PLAYER_WIDTH / 2;
export const initialPlayerPositionY = screenHeight - PLAYER_HEIGHT - 70;

const PLAYER_MAX_LEFT = 10;
const PLAYER_MAX_RIGHT = 95 * window.innerWidth / 100 - PLAYER_WIDTH;

const PLAYER_MAX_LEFT_DESKTOP = 500;
const PLAYER_MAX_RIGHT_DESKTOP = 72 * window.innerWidth / 100 - PLAYER_WIDTH;

export const maxPlayerAllowedPositionRight = screenWidth >= 1023 ? PLAYER_MAX_RIGHT_DESKTOP : PLAYER_MAX_RIGHT;
export const maxPlayerAllowedPositionLeft = screenWidth >= 1023 ? PLAYER_MAX_LEFT_DESKTOP : PLAYER_MAX_LEFT;