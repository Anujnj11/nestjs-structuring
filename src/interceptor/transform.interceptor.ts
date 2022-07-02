import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/constants';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((resp: any) => {
        /**
         * To send customer response send "overrideResponse: true",
         * and send customer formatted response in data field, which will be
         * directly sent without formatted
         */
        if (resp && resp.overrideResponse) {
          return resp.data;
        }
        resp = !resp
          ? {}
          : {
              data: resp.data,
            };
        // resp.message = resp.code ? messageCompose.getErrorMsg(resp.code) : '';
        resp.success = resp.message ? false : true;
        return resp;
      }),
    );
  }
}
