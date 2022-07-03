import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HelperService {
  constructor(
    readonly config: ConfigService,
    readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param key
   * @returns
   */
  encrypt = (key: string) =>
    bcrypt.hashSync(key, bcrypt.genSaltSync(this.config.get('salt')));

  compare = (key: string, by: string) => bcrypt.compareSync(by, key);

  async prepareJWTToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.config.get('secretKey'),
      // algorithm: 'RS512',
      expiresIn: '1d',
    });
  }
}
