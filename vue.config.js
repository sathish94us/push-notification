// module.exports = {
//     runtimeCompiler: true,
//     pwa: {
//       workboxPluginMode: "InjectManifest",
//       workboxOptions:{
//         swSrc: "src/service-worker.js"
//     }
//   }
// }

module.exports = {
  runtimeCompiler: true,
  devServer: {
    https: true
  },
  pwa: {
    themeColor: "#0095da"
  }
}