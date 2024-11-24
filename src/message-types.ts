const appName = "DBlinder";
class MessageType {
  private namespace: string;
  readonly GET: string;
  readonly SET: string;
  readonly CALL: string;
  private format(type: string): string {
    return `${this.namespace}:${type}`;
  }
  constructor(namespace: string) {
    this.namespace = `${appName}:${namespace}`;
    this.GET = this.format("GET");
    this.SET = this.format("SET");
    this.CALL = this.format("CALL");
  }
}

class MessageTypes {
  static readonly isActivated = new MessageType("is-activated");
  static readonly isHorizontal = new MessageType("is-horizontal");
  static readonly spaceSize = new MessageType("space-size");
  static readonly maxSpaceSize = new MessageType("max-space-size");
  static readonly opacity = new MessageType("opacity");
  static readonly config = new MessageType("config");
  static readonly updateBlinds = new MessageType("update-blinds");
}

export const messageIsForThisApp = (type: string) => {
  return type.startsWith(appName);
};

export default MessageTypes;
