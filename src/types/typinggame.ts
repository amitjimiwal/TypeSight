export type Game='waiting'|'in progress'|'finished';
export type duration=30 | 60 | 0;
export type word=string;
export interface TypingGame {
     gameState:Game;
     duration:duration;
     words:word[];
}
//make a generic type for KEybordEvent
export type KeyboardEventCustom<T> = React.KeyboardEvent<T>;