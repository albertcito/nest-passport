import express from 'express';

export default class IpAddress {
  private request: express.Request;

  constructor(request: express.Request) {
    this.request = request;
  }

  public ipAddress(): string | undefined {
    const xForwardedFor = this.request?.headers['x-forwarded-for'];
    if (xForwardedFor) {
      return xForwardedFor.toString();
    }
    return this.request?.socket.remoteAddress;
  }

  static getIpAddress(request: express.Request) {
    if (request) {
      return new IpAddress(request).ipAddress();
    }
    return undefined;
  }
}
