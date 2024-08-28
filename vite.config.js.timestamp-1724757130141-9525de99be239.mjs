// vite.config.js
import { defineConfig } from "file:///C:/Users/User/Projects/Vekprom/node_modules/vite/dist/node/index.js";
import vituum from "file:///C:/Users/User/Projects/Vekprom/node_modules/vituum/src/index.js";
import pug from "file:///C:/Users/User/Projects/Vekprom/node_modules/@vituum/vite-plugin-pug/index.js";

// rollup.config.js
var rollup_config_default = {
  output: {
    manualChunks(id) {
      if (id.includes("node_modules")) {
        if (id.includes("jquery")) {
          return "jquery";
        }
        return "vendor";
      }
    },
    entryFileNames: "assets/js/[name].js",
    chunkFileNames: "assets/js/[name].min.js",
    assetFileNames: "assets/css/[name].min.[ext]"
  }
};

// vite.config.js
import VitePluginSvgSpritemap from "file:///C:/Users/User/Projects/Vekprom/node_modules/@spiriit/vite-plugin-svg-spritemap/dist/index.js";
import ViteRestart from "file:///C:/Users/User/Projects/Vekprom/node_modules/vite-plugin-restart/dist/index.js";
var noAttribute = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      html = html.replace(/ crossorigin/g, "");
      if (process.env.NODE_ENV === "production") {
        html = html.replace(/="\/assets\//g, '="./assets/');
      }
      return html;
    }
  };
};
var vite_config_default = defineConfig({
  server: {
    cors: false,
    host: "localhost",
    port: 3e3,
    open: true
  },
  plugins: [
    vituum({
      imports: {
        filenamePattern: {
          "+.css": [],
          "+.js": []
        }
      }
    }),
    pug({
      root: "./src",
      options: {
        pretty: true
      }
    }),
    VitePluginSvgSpritemap("./src/icons/*.svg", {
      prefix: "",
      output: {
        filename: "[name].svg",
        name: "spritemap.svg",
        view: false,
        use: true
      },
      svgo: {
        plugins: [
          {
            name: "removeAttrs",
            params: {
              attrs: "(fill|stroke)"
            }
          }
        ]
      },
      injectSVGOnDev: true
    }),
    ViteRestart({
      restart: ["./src/icons/*"]
    }),
    noAttribute()
  ],
  css: {
    devSourcemap: true
  },
  build: {
    // minify: 'terser',
    // terserOptions: {
    //     compress: {
    //         defaults: false
    //     },
    //     mangle: false,
    //     format: {
    //         beautify: true,
    //         comments: 'all'
    //     }
    // },
    modulePreload: {
      polyfill: false
    },
    rollupOptions: rollup_config_default
    // Использование импортированной конфигурации Rollup
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicm9sbHVwLmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcUHJvamVjdHNcXFxcVmVrcHJvbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxQcm9qZWN0c1xcXFxWZWtwcm9tXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9Vc2VyL1Byb2plY3RzL1Zla3Byb20vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHZpdHV1bSBmcm9tICd2aXR1dW0nO1xyXG5pbXBvcnQgcHVnIGZyb20gJ0B2aXR1dW0vdml0ZS1wbHVnaW4tcHVnJztcclxuaW1wb3J0IHJvbGx1cENvbmZpZyBmcm9tICcuL3JvbGx1cC5jb25maWcuanMnOyAvLyBcdTA0MThcdTA0M0NcdTA0M0ZcdTA0M0VcdTA0NDBcdTA0NDIgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDMzXHUwNDQzXHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4IFJvbGx1cFxyXG5pbXBvcnQgVml0ZVBsdWdpblN2Z1Nwcml0ZW1hcCBmcm9tICdAc3BpcmlpdC92aXRlLXBsdWdpbi1zdmctc3ByaXRlbWFwJztcclxuaW1wb3J0IFZpdGVSZXN0YXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLXJlc3RhcnQnO1xyXG5cclxuY29uc3Qgbm9BdHRyaWJ1dGUgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICduby1hdHRyaWJ1dGUnLFxyXG4gICAgICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XHJcbiAgICAgICAgICAgIC8vIFx1MDQyM1x1MDQzNFx1MDQzMFx1MDQzQlx1MDQzNVx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0MzBcdTA0NDJcdTA0NDBcdTA0MzhcdTA0MzFcdTA0NDNcdTA0NDJcdTA0MzAgY3Jvc3NvcmlnaW5cclxuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgvIGNyb3Nzb3JpZ2luL2csICcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBcdTA0MTdcdTA0MzBcdTA0M0NcdTA0MzVcdTA0M0RcdTA0MzAgXHUwNDNGXHUwNDQzXHUwNDQyXHUwNDM4IFx1MDQzMiBcdTA0NDFcdTA0NDFcdTA0NEJcdTA0M0JcdTA0M0FcdTA0MzBcdTA0NDUgPGxpbms+XHJcbiAgICAgICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKC89XCJcXC9hc3NldHNcXC8vZywgJz1cIi4vYXNzZXRzLycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIGNvcnM6IGZhbHNlLFxyXG4gICAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gICAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICAgICAgb3BlbjogdHJ1ZVxyXG4gICAgfSxcclxuXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdml0dXVtKHtcclxuICAgICAgICAgICAgaW1wb3J0czoge1xyXG4gICAgICAgICAgICAgICAgZmlsZW5hbWVQYXR0ZXJuOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJysuY3NzJzogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgJysuanMnOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIHB1Zyh7XHJcbiAgICAgICAgICAgIHJvb3Q6ICcuL3NyYycsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHByZXR0eTogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIFZpdGVQbHVnaW5TdmdTcHJpdGVtYXAoJy4vc3JjL2ljb25zLyouc3ZnJywge1xyXG4gICAgICAgICAgICBwcmVmaXg6ICcnLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIGZpbGVuYW1lOiAnW25hbWVdLnN2ZycsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3ByaXRlbWFwLnN2ZycsXHJcbiAgICAgICAgICAgICAgICB2aWV3OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHVzZTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdmdvOiB7XHJcbiAgICAgICAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncmVtb3ZlQXR0cnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiAnKGZpbGx8c3Ryb2tlKSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5qZWN0U1ZHT25EZXY6IHRydWVcclxuICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgVml0ZVJlc3RhcnQoe1xyXG4gICAgICAgICAgICByZXN0YXJ0OiBbJy4vc3JjL2ljb25zLyonXVxyXG4gICAgICAgIH0pLFxyXG5cclxuICAgICAgICBub0F0dHJpYnV0ZSgpXHJcbiAgICBdLFxyXG5cclxuICAgIGNzczoge1xyXG4gICAgICAgIGRldlNvdXJjZW1hcDogdHJ1ZVxyXG4gICAgfSxcclxuXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAgIC8vIG1pbmlmeTogJ3RlcnNlcicsXHJcblxyXG4gICAgICAgIC8vIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICAvLyAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAvLyAgICAgICAgIGRlZmF1bHRzOiBmYWxzZVxyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBtYW5nbGU6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICBmb3JtYXQ6IHtcclxuICAgICAgICAvLyAgICAgICAgIGJlYXV0aWZ5OiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgY29tbWVudHM6ICdhbGwnXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG5cclxuICAgICAgICBtb2R1bGVQcmVsb2FkOiB7XHJcbiAgICAgICAgICAgIHBvbHlmaWxsOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHJvbGx1cENvbmZpZyAvLyBcdTA0MThcdTA0NDFcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0NENcdTA0MzdcdTA0M0VcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDM4XHUwNDNDXHUwNDNGXHUwNDNFXHUwNDQwXHUwNDQyXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDNFXHUwNDM5IFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0NFx1MDQzOFx1MDQzM1x1MDQ0M1x1MDQ0MFx1MDQzMFx1MDQ0Nlx1MDQzOFx1MDQzOCBSb2xsdXBcclxuICAgIH1cclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxQcm9qZWN0c1xcXFxWZWtwcm9tXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXFByb2plY3RzXFxcXFZla3Byb21cXFxccm9sbHVwLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVXNlci9Qcm9qZWN0cy9WZWtwcm9tL3JvbGx1cC5jb25maWcuanNcIjtleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdqcXVlcnknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnanF1ZXJ5JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAndmVuZG9yJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLmpzJyxcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0ubWluLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9jc3MvW25hbWVdLm1pbi5bZXh0XSdcclxuICAgIH1cclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUixTQUFTLG9CQUFvQjtBQUNuVCxPQUFPLFlBQVk7QUFDbkIsT0FBTyxTQUFTOzs7QUNGMFEsSUFBTyx3QkFBUTtBQUFBLEVBQ3JTLFFBQVE7QUFBQSxJQUNKLGFBQWEsSUFBSTtBQUNiLFVBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUM3QixZQUFJLEdBQUcsU0FBUyxRQUFRLEdBQUc7QUFDdkIsaUJBQU87QUFBQSxRQUNYO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFBQSxJQUNKO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixnQkFBZ0I7QUFBQSxJQUNoQixnQkFBZ0I7QUFBQSxFQUNwQjtBQUNKOzs7QURWQSxPQUFPLDRCQUE0QjtBQUNuQyxPQUFPLGlCQUFpQjtBQUV4QixJQUFNLGNBQWMsTUFBTTtBQUN0QixTQUFPO0FBQUEsSUFDSCxNQUFNO0FBQUEsSUFDTixtQkFBbUIsTUFBTTtBQUVyQixhQUFPLEtBQUssUUFBUSxpQkFBaUIsRUFBRTtBQUV2QyxVQUFJLFFBQVEsSUFBSSxhQUFhLGNBQWM7QUFFdkMsZUFBTyxLQUFLLFFBQVEsaUJBQWlCLGFBQWE7QUFBQSxNQUN0RDtBQUVBLGFBQU87QUFBQSxJQUNYO0FBQUEsRUFDSjtBQUNKO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNMLGlCQUFpQjtBQUFBLFVBQ2IsU0FBUyxDQUFDO0FBQUEsVUFDVixRQUFRLENBQUM7QUFBQSxRQUNiO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLElBRUQsSUFBSTtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLFFBQ0wsUUFBUTtBQUFBLE1BQ1o7QUFBQSxJQUNKLENBQUM7QUFBQSxJQUVELHVCQUF1QixxQkFBcUI7QUFBQSxNQUN4QyxRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsUUFDSixVQUFVO0FBQUEsUUFDVixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixLQUFLO0FBQUEsTUFDVDtBQUFBLE1BQ0EsTUFBTTtBQUFBLFFBQ0YsU0FBUztBQUFBLFVBQ0w7QUFBQSxZQUNJLE1BQU07QUFBQSxZQUNOLFFBQVE7QUFBQSxjQUNKLE9BQU87QUFBQSxZQUNYO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsTUFDQSxnQkFBZ0I7QUFBQSxJQUNwQixDQUFDO0FBQUEsSUFFRCxZQUFZO0FBQUEsTUFDUixTQUFTLENBQUMsZUFBZTtBQUFBLElBQzdCLENBQUM7QUFBQSxJQUVELFlBQVk7QUFBQSxFQUNoQjtBQUFBLEVBRUEsS0FBSztBQUFBLElBQ0QsY0FBYztBQUFBLEVBQ2xCO0FBQUEsRUFFQSxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBY0gsZUFBZTtBQUFBLE1BQ1gsVUFBVTtBQUFBLElBQ2Q7QUFBQSxJQUVBLGVBQWU7QUFBQTtBQUFBLEVBQ25CO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
