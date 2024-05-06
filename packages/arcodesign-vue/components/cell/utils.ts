import { InjectionKey } from 'vue';

export interface CellGroupContext {
    isFromGroup: boolean;
}

export const cellGroupInjectionKey: InjectionKey<CellGroupContext> = Symbol('ArcoCellGroup');
