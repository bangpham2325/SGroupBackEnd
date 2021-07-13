import { compareSync, hashSync, genSaltSync } from 'bcryptjs';
import { ConfigService } from 'libs/config/config.service';

export class BcryptService {
    /**
     * @type {BcryptService}
     */
    static #instance;

    static getSingleton() {
        if (!BcryptService.#instance) {
            BcryptService.#instance = new BcryptService(
                ConfigService.getSingleton().get('SALT_ROUNDS')
            );
            console.log(`[${BcryptService.name}] is bundling`);
        }
        return BcryptService.#instance;
    }

    saltRounds;

    /**
     * @param {number} saltRounds
     */
    constructor(saltRounds) {
        this.saltRounds = saltRounds;
    }

    /**
     * @param {string} str normal string
     * @param {string} hashed hashed string
     */
    compare(str, hashed) {
        return compareSync(str, hashed);
    }

    /**
     * @param {string} str to be hashed
     */
    hash(str) {
        const salt = genSaltSync(this.saltRounds);
        return hashSync(str, salt);
    }
}