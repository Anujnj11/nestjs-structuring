import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  constructor(readonly config: ConfigService) {}

  /**
   *
   * @param key
   * @returns
   */
  encrypt = (key: string) =>
    bcrypt.hashSync(key, bcrypt.genSaltSync(this.config.get('salt')));

  compare = (key: string, by: string) =>
    bcrypt.compareSync(key, this.encrypt(by));
}
