import { sign, decode } from 'jsonwebtoken';
import { ConfigService } from 'libs/config/config.service';

export class JwtService {
    /**
     * @type {AuthService}
     */
    static #instance;

    static getSingleton() {
        if (!JwtService.#instance) {
            JwtService.#instance = new JwtService(
                ConfigService.getSingleton().get('JWT_SECRET'),
                ConfigService.getSingleton().get('EXPIRE_INS'),
            );
            console.log(`[${JwtService.name}] is bundling`);
        }
        return JwtService.#instance;
    }

    constructor(secret, expiresIn) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    sign(payload) {
        return sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
    }

    decode(token) {
        return decode(token);
    }
}