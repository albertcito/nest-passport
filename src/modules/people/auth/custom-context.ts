import express from 'express';
// import { ExpressContext } from '@apollo/server';

export interface UserSession {
  email: string;
  id: number;
  lang: string;
}
export interface CustomRequest extends express.Request {
  user: UserSession;
}
export interface CustomContext {
  req: CustomRequest;
}
