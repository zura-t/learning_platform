import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_APP_ID,
      consumerSecret: process.env.TWITTER_APP_SECRET,
      callbackURL: `${process.env.API_URL}/twitter/redirect`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    try {
      const payload = {
        profile,
        accessToken,
      };
      done(null, payload);
    } catch (err) {
      console.log(`got an error: `, err);
      done(err, false);
    }
  }
}
