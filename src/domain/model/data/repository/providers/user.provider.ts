import { User } from '../../UserModel';
import { USER_REPOSITORY } from '../../../config/constans';

export const usersProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
}];
