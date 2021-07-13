import { UsersService } from 'api-rest/users/users.service';
import { jwtPayload } from '../dto/jwt-payload';
import { profileResponse } from '../dto/profile-response';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';

export class AuthService {
    /**
     * @type {AuthService}
     */
    static #instance;

    static getSingleton() {
        if (!AuthService.#instance) {
            AuthService.#instance = new AuthService(
                UsersService.getSingleton(),
                BcryptService.getSingleton(),
                JwtService.getSingleton(),
            );
            console.log(`[${AuthService.name}] is bundling`);
        }
        return AuthService.#instance;
    }

    /**
     * @type {UsersService}
     */
    #userService;

    /**
     * @type {BcryptService}
     */
    #bcryptService;

    /**
     * @type {JwtService}
     */
    #jwtService;

    constructor(userService, bcryptService, jwtService) {
        this.#userService = userService;
        this.#bcryptService = bcryptService;
        this.#jwtService = jwtService;
    }

    register(body) {
        body.password = this.#bcryptService.hash(body.password);

        const user = this.#userService.createOneAndReturn(body);

        return profileResponse(
            user,
            this.#jwtService.sign(jwtPayload(user.id, []))
        );
    }
}