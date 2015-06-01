module qxt.util {
  export class Uri {
    public static toParameter(obj: any, isPost: boolean):string {
      let parts: string[] = [];

      for (let key of Object.keys(obj)) {
        let value = obj[key];
        if (value instanceof Array) {
          for (var i = 0; i < value.length; i++) {
            Uri.toParameterPair(key, value[i], parts, isPost);
          }
        } else {
          Uri.toParameterPair(key, value, parts, isPost);
        }
      }
      return parts.join("&");
    }

    private static toParameterPair(key: string, value: any, parts: string[], isPost: boolean): void {
      var encode = encodeURIComponent;
      if (isPost) {
        parts.push(encode(key).replace(/%20/g, "+") + "=" +
          encode(value).replace(/%20/g, "+"));
      } else {
        parts.push(encode(key) + "=" + encode(value));
      }
    }
  }
}