export function join(...argvs) {
    argvs = argvs.map((str) => {
      if (!str) {
        return ''
      }
      if (str[0] === "/") {
        str = str.slice(1);
      }
      if (str[str.length - 1] === "/") {
        str = str.slice(0, str.length - 1);
      }
      return str;
    });
    return `${argvs.filter(item => item).join("/")}`;
  }
  
//   export function resolve(...argvs) {
//     argvs.unshift(useRuntimeConfig().app.baseURL);
//     argvs = argvs.map((str) => {
//       if (str[0] === "/") {
//         str = str.slice(1);
//       }
//       if (str[str.length - 1] === "/") {
//         str = str.slice(0, str.length - 1);
//       }
//       return str;
//     });
//     return `/${argvs.join("/")}`;
//   }