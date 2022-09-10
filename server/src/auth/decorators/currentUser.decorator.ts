import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayloadWithRefreshToken } from './../types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (data) return req.user[data];

    return req.user;
  },
);
