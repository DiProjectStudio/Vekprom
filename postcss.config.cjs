const cssnano = require('cssnano');
const postcssSortMediaQueries = require('postcss-sort-media-queries');
const postcssUrl = require('postcss-url');
const postcssPxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');

module.exports = (ctx) => ({
  plugins: [
		postcssSortMediaQueries({
			sort: 'mobile-first', // default value
		}),

    ...(process.env.NODE_ENV === 'production' ? [
      postcssUrl({
        url: function (asset) {
          // Проверяем, содержит ли URL подстроку "/assets"
          if (asset.url.includes('/assets')) {
            // Заменяем "/assets" на ".."
            return asset.url.replace('/assets', '..');
          }
  
          return asset.url;
        }
      }),
      postcssPxtorem({
        rootValue: 10,
        unitPrecision: 5,
        propList: ['top', 'left', 'right', 'bottom', 'font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'margin-top', 'padding', 'height', 'min-height', 'max-height', 'width', 'max-width', 'flex'],
        selectorBlackList: ['.fancybox-button', '.slick-slider', 'slick'],
        replace: true,
        mediaQuery: false,
        minPixelValue: 18
      }),
      autoprefixer(),
      cssnano()
    ] : [])
  ]
});