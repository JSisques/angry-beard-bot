-- AlterTable
ALTER TABLE "BotConfig" ADD COLUMN     "ignoredExtensions" TEXT[] DEFAULT ARRAY['md', 'txt', 'lock', 'json', 'yml', 'yaml', 'env', 'toml', 'ini', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'webp', 'mp4', 'webm', 'mp3', 'wav', 'd.ts', 'map', 'snap', 'golden', 'wasm', 'woff', 'woff2', 'ttf', 'otf', 'eot', 'scss', 'sass']::TEXT[];
