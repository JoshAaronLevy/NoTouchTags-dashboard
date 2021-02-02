// import { reducers } from './app.state';
import { User } from '../models/user.model';

//reducers
import { authReducer } from '../store/reducers/authentication.reducer';

//effects
import { AuthEffects } from '../store/effects/authentication.effects';

export interface AppState {
    readonly authUser: User;
}

export const AppReducers = {
    authUser: authReducer,

};
export const AppEffects = [AuthEffects]