declare class AppVersion {
  public static version: string;
  public static build: string;
  public static available: boolean;

  // tslint:disable-next-line:ban-types
  public static getInfo(success?: Function, error?: Function);
}
