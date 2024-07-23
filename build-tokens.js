import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// sd-transforms, 2nd parameter for options can be added
// See docs: https://github.com/tokens-studio/sd-transforms
register(StyleDictionary, {
    expand: {
        composition: true,
        typography: false,
        border: false,
        shadow: false
    },
    excludeParentKeys: true
});

const sd = new StyleDictionary({
    // make sure to have source match your token files!
    // be careful about accidentally matching your package.json or similar files that are not tokens
    source: ['./tokens-vekprom.json'],
    preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
    platforms: {
        css: {
            transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
            transforms: ['name/kebab'], // <-- add a token name transform for generating token names, default is camel
            buildPath: './src/styles/base/',
            files: [
                {
                    destination: '_variables.scss',
                    format: 'css/variables'
                }
            ]
        }
    }
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
