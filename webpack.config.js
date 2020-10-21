const path = require('path'); // node의 path조작

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development',  // 실서비스: production
  devtool: 'eval',  // 빠르게 하겠다는 의미
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // 입력: 중요
  entry: {
     // WordRelay.jsx는 client.jsx파일에서 불러오므로 webpack에서 알아차리기 때문에 넣을필요없음.
     // 확장자는 resolve라는 옵션에서 extendsions네 적어주면 알아서 찾아줌.
    app: ['./client'],
  },
  // 출력: 중요
  output: {
    path: path.join(__dirname, 'dist'), // 현재폴더경로에 dist에 내보냄.
    filename: 'app.js',
  },
};